/** WCAG 2.x харьцангуй гэрэлтэлт (#rrggbb) */
function luminance(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Хоёр өнгөний тодролын харьцаа, нэг оронтой бутархайгаар (жишээ нь 9.3) */
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 10) / 10;
}
