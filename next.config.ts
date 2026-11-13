import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
