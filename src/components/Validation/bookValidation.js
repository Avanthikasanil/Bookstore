import { object, string, number, transform, minLength, email as valEmail, any } from "valibot";

// Register form
export const registerSchema = object({
  name: string([minLength(1, "Name is required")]),
  email: string([valEmail("Invalid email address")]),
  gender: string([minLength(1, "Gender is required")]),
  password: string([minLength(6, "Password must be at least 6 characters")]),
  role: string([minLength(1, "Role is required")]),
});

// Login form
export const loginSchema = object({
  email: string([valEmail("Invalid email address")]),
  password: string([minLength(6, "Password must be at least 6 characters")]),
});

// Add & Edit Book (all fields required)
export const productSchema = object({
  title: string([minLength(1, "Title is required")]),
  author: string([minLength(1, "Author is required")]),
  price: transform(string([minLength(1, "Price is required")]), (val) => {
    const num = Number(val);
    return isNaN(num) ? null : num;
  }),
  description: string([minLength(1, "Description is required")]),// filename as string
});
