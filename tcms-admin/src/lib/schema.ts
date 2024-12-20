import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg"];

export const formDataSchema = z.object({
  name: z.string().trim().min(1, "Name field is required"),
  email: z
    .string()
    .min(1, "Email field is required")
    .email("Please enter a valid email address"),
  phoneNumber: z
    .string()
    .regex(
      /^\+?[0-9]{10,15}$/,
      "Phone number must include country code and be 10-15 digits long",
    ),
  address: z.string().trim().min(8, "Address field is required"),
  logo: z
    .instanceof(File)
    .optional()
    .or(z.null())
    .nullable() // Allow null
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only PNG, JPEG files are allowed",
    }),
  // adminId: z.string().min(1, "An admin must be assigned"),
});
