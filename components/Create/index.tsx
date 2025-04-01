'use client';

import { useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { CreateFormSchema } from "./createFormSchema";
import CreateMessage from "@/constant/CreateMessage";
import BottomNav from "../Global/bottomNav";
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof CreateFormSchema>>({
        resolver: zodResolver(CreateFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            image_url: ""
        }
    });

    const fetchCreatePostHandler = async (data: z.infer<typeof CreateFormSchema>) => {
        const response = await axios.post('/api/create-post', data);
        return response.data;
    }

    const onSubmit = (data: z.infer<typeof CreateFormSchema>) => {
        console.log(data)
        setLoading(true);
        fetchCreatePostHandler(data).then((response) => {
            console.log(response);
            router.push('/posts');
        }).catch((error) => {
            console.error(error);
            toast.error(CreateMessage.LOGIN_ERROR);
        }).finally(() => setLoading(false))
    };

    return (
        <>
            <Box sx={{ height: "80vh" }}>
                <Card sx={{padding: "16px"}}>
                    <CardContent sx={{padding: 0}}>
                        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                            <Stack gap={2} mt={4}>
                                <Box>
                                    <TextField
                                        id="title"
                                        label={CreateMessage.TITLE}
                                        variant="outlined"
                                        fullWidth
                                        {...register("title")}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                    />
                                </Box>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="categoryLabel">{CreateMessage.CATEGORY}</InputLabel>
                                        <Select id="category" labelId="categoryLabel" {...register("category")} defaultValue="">
                                            <MenuItem value="option1">گزینه ۱</MenuItem>
                                            <MenuItem value="option2">گزینه ۲</MenuItem>
                                            <MenuItem value="option3">گزینه ۳</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <TextField
                                        id="image_url"
                                        label={CreateMessage.IMAGE_URL}
                                        variant="outlined"
                                        fullWidth
                                        {...register("image_url")}
                                        error={!!errors.image_url}
                                        helperText={errors.image_url?.message}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        id="description"
                                        label={CreateMessage.DESCRIPTION}
                                        variant="outlined"
                                        multiline
                                        rows={6}
                                        fullWidth
                                        {...register("description")}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                </Box>
                                <Box>
                                    <Button type="submit" fullWidth disabled={loading}>{loading ? <CircularProgress color="inherit" size="30px" /> : CreateMessage.SUBMIT}</Button>
                                </Box>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <BottomNav />
        </>
    )
};