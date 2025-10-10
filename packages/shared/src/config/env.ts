import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(0).default(4000),
  MONGO_URL: z.string().min(1).optional(),
  REDIS_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_API_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters').optional(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

export type EnvConfig = z.infer<typeof EnvSchema>;

let cachedEnv: EnvConfig | null = null;

export function loadEnv(overrides: Record<string, unknown> = {}): EnvConfig {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = EnvSchema.parse({
    ...process.env,
    ...overrides,
  });

  cachedEnv = parsed;
  return parsed;
}

export function resetEnvCache(): void {
  cachedEnv = null;
}
