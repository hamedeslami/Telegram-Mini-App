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
  CircularProgress,
} from "@mui/material";
import { BoxStyled } from "./StyledComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignupFormSchema } from "./signupFormSchema";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SignupMessage from "@/constant/SignupMessage";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      repassword: "",
    },
  });

  const clickShowPasswordHandler = () => setShowPassword((show) => !show);

  const clickShowRePasswordHandler = () => setShowRePassword((show) => !show);

  const fetchCreateUserHandler = async (data: z.infer<typeof SignupFormSchema>) => {
    const response = await axios.post('/api/register', data);
    return response.data;
  }

  const onSubmit = (data: z.infer<typeof SignupFormSchema>) => {
    setLoading(true);
    fetchCreateUserHandler(data).then((response) => {
      Cookies.set("AUTH_USER_TOKEN", response.data.accessToken, { expires: 1 / 24, path: "/" });
      router.push("/");
    }).catch((error) => {
      console.error(error);
      toast.error(SignupMessage.SIGNUP_ERROR);
    }).finally(() => setLoading(false));
  };

  return (
    <BoxStyled>
      <Box className="signupPageHeader">
        <Typography variant={"h1"}>{SignupMessage.TITLE}</Typography>
        <Typography component={"p"}>
          {SignupMessage.EXIST_ACCOUNT}
          <Link href="/auth/login" sx={{ marginLeft: "10px" }}>
          {SignupMessage.LOGIN}
          </Link>
        </Typography>
      </Box>

      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} mt={4}>
          <Box>
            <TextField
              id="firstname"
              label={SignupMessage.FIRSTNAME}
              variant="outlined"
              fullWidth
              {...register("firstname")}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
          </Box>
          <Box>
            <TextField
              id="lastname"
              label={SignupMessage.LASTNAME}
              variant="outlined"
              fullWidth
              {...register("lastname")}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Box>
          <Box>
            <TextField
              id="username"
              label={SignupMessage.USERNAME}
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
              label={SignupMessage.PASSWORD}
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
                            ? SignupMessage.HIDE_PASSWORD
                            : SignupMessage.DISPLAY_PASSWORD
                        }
                        onClick={clickShowPasswordHandler}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box>
            <TextField
              id="repassword"
              label={SignupMessage.REPASSWORD}
              variant="outlined"
              fullWidth
              {...register("repassword")}
              type={showRePassword ? "text" : "password"}
              error={!!errors.repassword}
              helperText={errors.repassword?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showRePassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={clickShowRePasswordHandler}
                        edge="end"
                      >
                        {showRePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          <Box>
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? <CircularProgress color="inherit" size="30px" /> : SignupMessage.SUBMIT}
            </Button>
          </Box>
        </Stack>
      </Box>
    </BoxStyled>
  );
}
