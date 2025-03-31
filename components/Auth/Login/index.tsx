"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { BoxStyled } from "./StyledComponent";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormSchema } from "./loginFormSchema";
import Cookies from "js-cookie";
import LoginMessage from "@/constant/LoginMessage";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const clickShowPasswordHandler = () => setShowPassword((show) => !show);

  const fetchLoginUserHandler = async (data: z.infer<typeof LoginFormSchema>) => {
    const response = await axios.post('/api/login', data);
    return response.data;
  }

  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    fetchLoginUserHandler(data).then((response) => {
      Cookies.set("AUTH_USER_TOKEN", response.data.accessToken, { expires: 1 / 24, path: "/" });
      router.push("/");
    }).catch((error) => {
      console.error(error);
      toast.error(LoginMessage.LOGIN_ERROR);
    }).finally(() => setLoading(false))
  };

  return (
    <BoxStyled>
      <Box className="loginPageHeader">
        <Typography variant={"h1"}>{LoginMessage.TITLE}</Typography>
        <Typography component={"p"}>
          {LoginMessage.SIGNUP_ACCOUNT}
          <Link href="/auth/signup" sx={{ marginLeft: "10px" }}>
          {LoginMessage.SIGNUP}
          </Link>
        </Typography>
      </Box>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={4}>
          <Box>
            <TextField
              id="username"
              label={LoginMessage.USERNAME}
              variant="outlined"
              fullWidth
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Box>
          <Box>
            <TextField
              id="password"
              label={LoginMessage.PASSWORD}
              variant="outlined"

              fullWidth
              {...register("password")}
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? LoginMessage.HIDE_PASSWORD
                            : LoginMessage.DISPLAY_PASSWORD
                        }
                        onClick={clickShowPasswordHandler}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Box>
          <Box>
            <Button type="submit" fullWidth disabled={loading}>{loading ? <CircularProgress color="inherit" size="30px" /> : LoginMessage.SUBMIT}</Button>
          </Box>
        </Stack>
      </Box>
    </BoxStyled>
  );
}
