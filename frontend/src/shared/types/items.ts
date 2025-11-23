import z from "zod";

export const itemsSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().nullable(),
});

export type Item = z.infer<typeof itemsSchema>;
export const itemsArraySchema = z.array(itemsSchema);