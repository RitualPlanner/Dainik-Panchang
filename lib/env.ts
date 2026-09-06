import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_LOGO_URL: z
    .string()
    .url()
    .default(
      "https://res.cloudinary.com/db6qh4jsv/image/upload/v1788498372/dainik_panchang_vhzo24.png"
    ),
  NEXT_PUBLIC_API_URL: z
    .string()
    .url()
    .optional()
    .default("http://localhost:3000/api"),
});

const _env = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_LOGO_URL:
    process.env.NEXT_PUBLIC_LOGO_URL || process.env.LOGO_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
