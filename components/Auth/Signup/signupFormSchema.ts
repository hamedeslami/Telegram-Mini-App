import SignupMessage from "@/constant/SignupMessage";
import { z } from "zod";

export const SignupSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: SignupMessage.FIRSTNAME_MIN })
    .max(20, { message: SignupMessage.FIRSTNAME_MAX }),

  lastname: z
    .string()
    .min(3, { message: SignupMessage.LASTNAME_MIN })
    .max(20, { message: SignupMessage.LASTNAME_MAX }),

  username: z
    .string()
    .min(3, { message: SignupMessage.USERNAME_MIN })
    .max(20, { message: SignupMessage.USERNAME_MAX })
    .regex(/^[a-zA-Z0-9]+$/, { message: SignupMessage.USERNAME_VALIDATION }),

  password: z
    .string()
    .min(6, { message: SignupMessage.PASSWORD_MIN })
    .max(30, { message: SignupMessage.PASSWORD_MAX })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
      { message: SignupMessage.PASSWORD_VALIDATION }
    ),

  repassword: z
    .string()
    .min(6, { message: SignupMessage.REPASSWORD_MIN })
    .max(20, { message: SignupMessage.REPASSWORD_MAX }),
});

export const SignupFormSchema = SignupSchema.refine(
  (data) => data.password === data.repassword,
  {
    message: SignupMessage.REPASSWORD_VALIDATION,
    path: ["repassword"]
  }
);