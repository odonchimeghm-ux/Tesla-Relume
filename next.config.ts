import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Supabase Storage-ийн public bucket-аас зураг харуулах боломж
    remotePatterns: [new URL("https://xqlsyxmpkhdzjpwvnsxb.supabase.co/storage/v1/object/public/**")],
  },
  // Хуучин статик хуудасны холбоосуудыг шинэ замууд руу шилжүүлнэ.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/model3.html", destination: "/model3", permanent: true },
      { source: "/modely.html", destination: "/modely", permanent: true },
    ];
  },
};

export default nextConfig;
