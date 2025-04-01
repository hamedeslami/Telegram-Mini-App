'use client'

import { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BottomNav from "../Global/bottomNav";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import ProfileMessage from "@/constant/ProfileMessage";

interface UserPayload extends JwtPayload {
    id: string;
    username: string;
    email?: string;
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<UserPayload | null>(null);

    const logOutHandler = () => {
        Cookies.remove("AUTH_USER_TOKEN");
        router.push('/auth/login');
    }

    useEffect(() => {
        const token = Cookies.get("AUTH_USER_TOKEN");
        if (token) {
            const decoded = jwt.decode(token) as UserPayload | null;
            setUser(decoded);
        }
    }, []);



    return (
        <>
            <Box sx={{ height: "80vh", overflowY: "scroll" }}>
                <Stack flexDirection={'column'} alignItems={'center'}>
                    <Avatar sx={{ width: 100, height: 100 }} >
                        <PersonIcon sx={{ width: 80, height: 80 }} />
                    </Avatar>
                </Stack>
                <Box>
                    <Card>
                        <CardContent>
                            <Stack spacing={3}>
                                <TextField label={ProfileMessage.FIRSTNAME} variant="standard" value={user?.firstname || ''} slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }} />

                                <TextField label={ProfileMessage.LASTNAME} variant="standard" value={user?.lastname || ''} slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }} />

                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
                <Button color="error" fullWidth onClick={logOutHandler}>{ProfileMessage.SIGNOUT}</Button>
            </Box>
            <BottomNav />
        </>
    )
}