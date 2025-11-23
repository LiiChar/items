import { config } from 'dotenv';
import z from 'zod';

// Загружаем .env до парсинга
config();

export const envSchema = z.object({
  VERSION: z.coerce.string().default('v1'),
  PORT: z.coerce.number().default(3000),
  PROD: z.coerce.boolean().default(false),

  POSTGRES_HOST: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DB: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().default(5432),

  PGADMIN_EMAIL: z.string().email().optional(),
  PGADMIN_PASSWORD: z.string().optional(),
  PGADMIN_PORT: z.coerce.number().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
