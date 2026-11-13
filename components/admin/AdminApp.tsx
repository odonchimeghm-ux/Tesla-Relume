"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState, type FormEvent } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { CardEditor, type FieldConfig } from "./CardEditor";
import { btn, input, label } from "./ui";

const modelCardFields: FieldConfig[] = [
  { key: "quote", label: "Гол бичвэр", kind: "textarea", required: true, placeholder: "Model 3 эсвэл ишлэл" },
  { key: "name", label: "Нэр / үнэ", kind: "text", required: true, placeholder: "$61,990-оос эхэлнэ" },
  { key: "meta", label: "Нэмэлт мэдээлэл", kind: "text" },
  { key: "href", label: "Холбоос", kind: "text", placeholder: "/model3", hint: "Өгвөл бүх карт энэ хаяг руу дарагдана" },
  { key: "image", label: "Дэвсгэр зураг", kind: "image", required: true },
  { key: "logo", label: "Лого", kind: "image", required: true },
];

const meetCardFields: FieldConfig[] = [
  { key: "title", label: "Гарчиг", kind: "text", required: true },
  { key: "image", label: "Зураг", kind: "image", required: true },
];

type AuthState = { status: "loading" } | { status: "signedOut" } | { status: "signedIn"; session: Session; isAdmin: boolean };

export function AdminApp() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const supabase = getBrowserSupabase();

    const resolve = async (session: Session | null) => {
      if (!session) {
        setAuth({ status: "signedOut" });
        return;
      }
      const { data } = await supabase.rpc("is_admin");
      setAuth({ status: "signedIn", session, isAdmin: data === true });
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // Token шинэчлэгдэх бүрт дахин шалгах шаардлагагүй
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") resolve(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (auth.status === "loading") return <p className="opacity-60">Ачаалж байна…</p>;
  if (auth.status === "signedOut") return <LoginForm />;

  const signOut = () => getBrowserSupabase().auth.signOut();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Админ</p>
          <h1 className="text-h2">Картын өгөгдөл</h1>
        </div>
        <div className="flex items-center gap-4 text-small">
          <span className="opacity-60">{auth.session.user.email}</span>
          <button type="button" onClick={signOut} className={btn.secondary}>
            Гарах
          </button>
        </div>
      </header>

      {auth.isAdmin ? (
        <Tabs
          idPrefix="admin"
          ariaLabel="Засах өгөгдөл"
          className="flex flex-col gap-8"
          items={[
            {
              id: "home",
              label: "Нүүр · Загварууд",
              content: <CardEditor table="model_cards" fields={modelCardFields} titleKey="quote" />,
            },
            {
              id: "model3",
              label: "Model 3 · Танилцах",
              content: (
                <CardEditor
                  table="meet_cards"
                  filter={{ column: "model", value: "model3" }}
                  fields={meetCardFields}
                  titleKey="title"
                />
              ),
            },
            {
              id: "modely",
              label: "Model Y · Танилцах",
              content: (
                <CardEditor
                  table="meet_cards"
                  filter={{ column: "model", value: "modely" }}
                  fields={meetCardFields}
                  titleKey="title"
                />
              ),
            },
          ]}
        />
      ) : (
        <div className="flex max-w-[640px] flex-col gap-3 rounded-lg bg-foreground p-8">
          <h2 className="text-h6">Энэ бүртгэлд админ эрх алга</h2>
          <p>
            Нэвтэрсэн боловч админ жагсаалтад ороогүй байна. Supabase-ийн <code>admins</code> хүснэгтэд энэ хэрэглэгчийн
            ID-г нэмнэ үү:
          </p>
          <code className="rounded bg-neutral-5 px-2 py-1 text-small break-all">{auth.session.user.id}</code>
        </div>
      )}
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const { error } = await getBrowserSupabase().auth.signInWithPassword({ email, password });
    setPending(false);
    if (error) setError(error.message === "Invalid login credentials" ? "Имэйл эсвэл нууц үг буруу байна" : error.message);
  };

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-[400px] flex-col gap-5 rounded-lg bg-foreground p-8 max-md:p-6">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Админ</p>
        <h1 className="text-h6">Нэвтрэх</h1>
      </div>
      <label className={label}>
        Имэйл
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      </label>
      <label className={label}>
        Нууц үг
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={input}
        />
      </label>
      {error && (
        <p role="alert" className="text-small text-primary">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className={btn.primary}>
        {pending ? "Нэвтэрч байна…" : "Нэвтрэх"}
      </button>
    </form>
  );
}
