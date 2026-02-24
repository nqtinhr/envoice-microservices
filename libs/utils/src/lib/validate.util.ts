import { z } from 'zod';

export function validateConfig<T extends z.ZodType>(schema: T, env: Record<string, unknown>) {
  const parsed = schema.safeParse(env);

  if (!parsed.success) {
    console.error('❌ Cấu hình không hợp lệ (invalid configuration):');
    parsed.error.issues.forEach((issue) => {
      console.error(` - ${issue.path.join('.')}: ${issue.message}`);
    });
    // Dừng app ngay lập tức để tránh chạy với config sai
    process.exit(1);
  }

  return parsed.data as z.infer<T>;
}
