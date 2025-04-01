'use client';

import { Box } from '@mui/material';
import Post from './Post';
import BottomNav from '../Global/bottomNav';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

type PostType = {
    id: string;
    title: string;
    description: string;
    category: string;
    image_url: string;
    author: string;
    created_at: string;
};

export default function Posts() {
    const fetchPostsHandler = async (): Promise<{ data: PostType[] }> => {
        const response = await axios.get("/api/all-post");
        return response.data;
    };


    const { data: posts } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPostsHandler,
        refetchInterval: 10000,
    });

    return (
        <>
            <Box sx={{height: "95vh", overflowY: "scroll"}}>
                {posts?.data?.map((post: PostType) => (
                    <Post key={post.id} data={post} />
                ))}
            </Box>
            <BottomNav />
        </>
    )
};