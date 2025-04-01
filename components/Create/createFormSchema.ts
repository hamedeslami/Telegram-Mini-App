import CreateMessage from "@/constant/CreateMessage";
import { z } from "zod";

export const CreateFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: CreateMessage.TITLE_MIN })
    .max(100, { message: CreateMessage.TITLE_MAX }),

  description: z
    .string()
    .min(3, { message: CreateMessage.DESCRIPTION_MIN })
    .max(500, { message: CreateMessage.DESCRIPTION_MAX }),

  category: z.string(),

  image_url: z.string().url(CreateMessage.INVALID_IMAGE_URL).optional(),
});