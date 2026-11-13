"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { revalidateContent } from "@/app/admin/actions";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { cn } from "@/lib/cn";
import { btn, input, label } from "./ui";

export type FieldConfig = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "image";
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

type Row = { id?: number; uid: string; values: Record<string, string> };

type CardEditorProps = {
  table: "model_cards" | "meet_cards";
  /** Жишээ нь { column: "model", value: "model3" } — шинэ мөрөнд мөн оноогдоно */
  filter?: { column: string; value: string };
  fields: FieldConfig[];
  /** Жагсаалтад харагдах картын нэр (гарчиг) болох талбар */
  titleKey: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const STORAGE_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/`;

let uidCounter = 0;
const newUid = () => `new-${++uidCounter}`;

/** next/image зөвхөн /public доторх эсвэл Supabase Storage-ийн зургийг харуулж чадна */
const isAllowedImage = (src: string) => src.startsWith("/") || (SUPABASE_URL !== "" && src.startsWith(STORAGE_PREFIX));

export function CardEditor({ table, filter, fields, titleKey }: CardEditorProps) {
  const supabase = getBrowserSupabase();
  const [rows, setRows] = useState<Row[]>([]);
  const [removed, setRemoved] = useState<number[]>([]);
  const [snapshot, setSnapshot] = useState("");
  const [status, setStatus] = useState<{ tone: "info" | "error" | "ok"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const columns = useMemo(() => fields.map((f) => f.key), [fields]);
  // filter объект render бүрт шинээр үүсдэг тул primitive утгаар нь хамаарал тогтооно
  const filterColumn = filter?.column;
  const filterValue = filter?.value;

  const load = useCallback(async () => {
    setLoading(true);
    let query = supabase.from(table).select(["id", ...columns].join(", ")).order("sort_order", { ascending: true });
    if (filterColumn && filterValue) query = query.eq(filterColumn, filterValue);
    const { data, error } = await query;
    setLoading(false);
    if (error) {
      setStatus({ tone: "error", text: `Ачаалж чадсангүй: ${error.message}` });
      return;
    }
    const loaded: Row[] = (data as unknown as Record<string, unknown>[]).map((r) => ({
      id: r.id as number,
      uid: `db-${r.id}`,
      values: Object.fromEntries(columns.map((c) => [c, (r[c] as string | null) ?? ""])),
    }));
    setRows(loaded);
    setRemoved([]);
    setSnapshot(JSON.stringify(loaded));
  }, [supabase, table, columns, filterColumn, filterValue]);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = !loading && (removed.length > 0 || JSON.stringify(rows) !== snapshot);

  // Хадгалаагүй өөрчлөлттэй хуудсыг хаахад анхааруулна
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const update = (uid: string, key: string, value: string) =>
    setRows((rs) => rs.map((r) => (r.uid === uid ? { ...r, values: { ...r.values, [key]: value } } : r)));

  const move = (index: number, dir: -1 | 1) =>
    setRows((rs) => {
      const next = [...rs];
      const target = index + dir;
      if (target < 0 || target >= next.length) return rs;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const remove = (row: Row) => {
    setRows((rs) => rs.filter((r) => r.uid !== row.uid));
    if (row.id !== undefined) setRemoved((ids) => [...ids, row.id as number]);
  };

  const add = () =>
    setRows((rs) => [...rs, { uid: newUid(), values: Object.fromEntries(columns.map((c) => [c, ""])) }]);

  const validate = () => {
    for (const [i, row] of rows.entries()) {
      for (const f of fields) {
        const v = row.values[f.key].trim();
        if (f.required && !v) return `${i + 1}-р карт: "${f.label}" хоосон байна`;
        if (f.kind === "image" && v && !isAllowedImage(v))
          return `${i + 1}-р карт: "${f.label}" нь /assets/... эсвэл Supabase-д оруулсан зураг байх ёстой`;
      }
    }
    return null;
  };

  const save = async () => {
    const problem = validate();
    if (problem) {
      setStatus({ tone: "error", text: problem });
      return;
    }
    setSaving(true);
    setStatus({ tone: "info", text: "Хадгалж байна…" });

    const toPayload = (row: Row, index: number) => {
      const payload: Record<string, string | number | null> = { sort_order: index + 1 };
      for (const f of fields) {
        const v = row.values[f.key].trim();
        payload[f.key] = v === "" && !f.required ? null : v;
      }
      if (filter) payload[filter.column] = filter.value;
      return payload;
    };

    try {
      if (removed.length) {
        const { error } = await supabase.from(table).delete().in("id", removed);
        if (error) throw error;
      }
      for (const [i, row] of rows.entries()) {
        const payload = toPayload(row, i);
        const { error } =
          row.id === undefined
            ? // Хүснэгтийн generated type ашиглаагүй тул generic-ийг тойрно; бүтцийг fields тодорхойлно
              await supabase.from(table).insert(payload as never)
            : await supabase.from(table).update(payload).eq("id", row.id);
        if (error) throw error;
      }

      const { data } = await supabase.auth.getSession();
      const result = await revalidateContent(data.session?.access_token ?? "");
      await load();
      setStatus({
        tone: "ok",
        text: result.ok ? "Хадгаллаа. Сайт шинэчлэгдлээ." : "Хадгаллаа. Сайт 60 секундийн дотор шинэчлэгдэнэ.",
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String((e as { message?: string })?.message ?? e);
      setStatus({ tone: "error", text: `Хадгалж чадсангүй: ${message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="opacity-60">Ачаалж байна…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <RowCard
            key={row.uid}
            index={i}
            total={rows.length}
            row={row}
            fields={fields}
            title={row.values[titleKey] || "Шинэ карт"}
            table={table}
            onChange={(key, value) => update(row.uid, key, value)}
            onMove={(dir) => move(i, dir)}
            onRemove={() => remove(row)}
            onError={(text) => setStatus({ tone: "error", text })}
          />
        ))}
        {rows.length === 0 && <p className="rounded-lg bg-foreground p-8 opacity-60">Карт алга байна.</p>}
      </div>

      <div className="sticky bottom-4 z-[5] flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-foreground/95 p-4 backdrop-blur">
        <button type="button" onClick={add} className={btn.secondary}>
          + Карт нэмэх
        </button>
        <div className="flex flex-wrap items-center gap-4">
          {status && (
            <p
              role="status"
              className={cn(
                "text-small",
                status.tone === "error" && "text-primary",
                status.tone === "ok" && "font-medium",
              )}
            >
              {status.text}
            </p>
          )}
          {dirty && !status && <p className="text-small opacity-60">Хадгалаагүй өөрчлөлт байна</p>}
          <button type="button" onClick={load} disabled={saving || !dirty} className={btn.secondary}>
            Буцаах
          </button>
          <button type="button" onClick={save} disabled={saving || !dirty} className={btn.primary}>
            {saving ? "Хадгалж байна…" : "Хадгалах"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RowCard({
  index,
  total,
  row,
  fields,
  title,
  table,
  onChange,
  onMove,
  onRemove,
  onError,
}: {
  index: number;
  total: number;
  row: Row;
  fields: FieldConfig[];
  title: string;
  table: string;
  onChange: (key: string, value: string) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onError: (text: string) => void;
}) {
  return (
    <article className="flex flex-col gap-5 rounded-lg bg-foreground p-6 max-md:p-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="font-alt text-small tabular-nums opacity-40">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="truncate text-h6">{title}</h3>
          {row.id === undefined && <span className="rounded-button bg-neutral-5 px-2 py-0.5 text-small">шинэ</span>}
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} className={btn.small} aria-label="Дээш зөөх">
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            className={btn.small}
            aria-label="Доош зөөх"
          >
            ↓
          </button>
          <button type="button" onClick={onRemove} className={btn.danger}>
            Устгах
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {fields.map((f) =>
          f.kind === "image" ? (
            <ImageField
              key={f.key}
              field={f}
              value={row.values[f.key]}
              folder={table}
              onChange={(v) => onChange(f.key, v)}
              onError={onError}
            />
          ) : (
            <label key={f.key} className={cn(label, f.kind === "textarea" && "col-span-2 max-md:col-span-1")}>
              <span>
                {f.label}
                {!f.required && <span className="font-normal opacity-50"> · заавал биш</span>}
              </span>
              {f.kind === "textarea" ? (
                <textarea
                  rows={3}
                  value={row.values[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className={cn(input, "resize-y")}
                />
              ) : (
                <input
                  type="text"
                  value={row.values[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  className={input}
                />
              )}
              {f.hint && <span className="font-normal opacity-50">{f.hint}</span>}
            </label>
          ),
        )}
      </div>
    </article>
  );
}

function ImageField({
  field,
  value,
  folder,
  onChange,
  onError,
}: {
  field: FieldConfig;
  value: string;
  folder: string;
  onChange: (value: string) => void;
  onError: (text: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    const supabase = getBrowserSupabase();
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `${folder}/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage.from("cards").upload(path, file, { cacheControl: "31536000" });
    setUploading(false);
    if (error) {
      onError(`Зураг оруулж чадсангүй: ${error.message}`);
      return;
    }
    onChange(supabase.storage.from("cards").getPublicUrl(path).data.publicUrl);
  };

  return (
    <div className={label}>
      <span>{field.label}</span>
      <div className="flex gap-3">
        <div className="flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-button border border-border bg-variant-img">
          {value && isAllowedImage(value) ? (
            // Админ дээрх урьдчилсан харагдац: ямар ч хэмжээтэй зургийг шууд харуулна
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-contain" />
          ) : (
            <span className="text-small font-normal opacity-40">зураг</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            type="text"
            value={value}
            placeholder="/assets/... эсвэл upload"
            onChange={(e) => onChange(e.target.value)}
            className={input}
          />
          <div>
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className={btn.small}>
              {uploading ? "Оруулж байна…" : "Зураг оруулах"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
