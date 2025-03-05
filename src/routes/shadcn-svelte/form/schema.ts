import { z } from 'zod';

export const accountSchema = z.object({
  username: z.string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username too long"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500).optional(),
  notifications: z.enum(["all", "mentions", "none"]),
  twoFactor: z.boolean().default(false)
});

export type AccountSchema = typeof accountSchema;
export type AccountFormValues = z.infer<typeof accountSchema>;