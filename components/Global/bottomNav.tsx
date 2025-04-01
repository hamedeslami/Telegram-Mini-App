"use client";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={pathname}
                onChange={(event, newValue) => router.push(newValue)}
            >
                <BottomNavigationAction
                    label="خانه"
                    value="/posts"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="افزودن"
                    value="/create"
                    icon={<PostAddIcon />}
                />
                <BottomNavigationAction
                    label="پروفایل"
                    value="/profile"
                    icon={<PersonIcon />}
                />
            </BottomNavigation>
        </Box>
    );
}
