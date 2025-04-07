import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: ['www.notion.so', 'notion.so'],
  },
};

export default nextConfig;
