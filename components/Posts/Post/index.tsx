import { Card, CardHeader, CardContent, Typography, Avatar, CardMedia } from '@mui/material';

type PostProps = {
    data: {
        id: string;
        title: string;
        description: string;
        category: string;
        image_url: string;
        author: string;
        created_at: string;
    };
};

export default function Post({ data }: PostProps) {
    const { title, author, description, image_url } = data;
    return (
        <Card sx={{padding: 0}}>
            <CardHeader
                avatar={
                    <Avatar aria-label={data.author} />
                }
                title={title}
                subheader={author}
            />
            {image_url && (
                <CardMedia
                    component="img"
                    height="194"
                    image={image_url}
                    alt={title}
                />
            )}

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}