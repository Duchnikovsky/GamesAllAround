import { z } from "zod";

export const newProductValidator = z.object({
  name: z
    .string()
    .min(3, "Product's name is too short")
    .max(50, "Product's name is too long"),
  price: z
    .number()
    .min(0, "Price can't be negative")
    .max(1000, "Price is too high"),
  description: z
    .string()
    .min(10, "Description is too short")
    .max(500, "Description is too long"),
  producent: z.string().min(0, "You must select a producent"),
  category: z.string().min(0, "You must select a category"),
  image: z.string().min(0, "You must upload an image"),
});
