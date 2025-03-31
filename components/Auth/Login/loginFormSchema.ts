import LoginMessage from "@/constant/LoginMessage";
import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: LoginMessage.USERNAME_MIN })
    .max(20, { message: LoginMessage.USERNAME_MAX }),

  password: z
    .string()
    .min(6, { message: LoginMessage.PASSWORD_MIN })
    .max(30, { message: LoginMessage.PASSWORD_MAX })
});