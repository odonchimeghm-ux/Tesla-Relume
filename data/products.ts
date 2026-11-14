/**
 * Захиалж болох хувилбарууд → Byl дахь үнийн lookup key.
 * Дүнг (урьдчилгаа) Byl-ийн удирдлагын буланд бүтээгдэхүүний үнэ дээр тохируулна —
 * сайт хэзээ ч хэрэглэгчээс ирсэн дүнг ашиглахгүй, зөвхөн энэ жагсаалтад байгаа key-г явуулна.
 */
export const bylPriceKeys = {
  model3: {
    standard: "model3_standard",
    premium: "model3_premium",
    performance: "model3_performance",
  },
  modely: {
    standard: "modely_standard",
    premium: "modely_premium",
    yl: "modely_yl",
    performance: "modely_performance",
  },
} as const;

export type OrderableModel = keyof typeof bylPriceKeys;

export const modelNames: Record<OrderableModel, string> = {
  model3: "Model 3",
  modely: "Model Y",
};

export function isOrderableModel(model: string): model is OrderableModel {
  return Object.hasOwn(bylPriceKeys, model);
}

/** Хувилбар байхгүй бол null */
export function getPriceKey(model: string, variant: string): string | null {
  if (!isOrderableModel(model)) return null;
  const variants: Record<string, string> = bylPriceKeys[model];
  return Object.hasOwn(variants, variant) ? variants[variant] : null;
}
