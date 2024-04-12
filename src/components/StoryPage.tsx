import { useEffect, useState } from 'react';
import { Image, Paper, Text } from '@mantine/core';

export interface PageProps {
    pageNum: number;
    caption: string;
}

export default function Page(props: PageProps) {
    const [image, setImage] = useState<string | null>(null)

    // useEffect(() => {
    //     fetch("https://picsum.photos/1024/1024")
    //         .then(res => res.arrayBuffer())
    //         .then(res => setImage(res))
    // }, [])

    useEffect(() => {
        // generate image
        fetch("/api/create_page", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: props.caption }),
        })
            .then(res => res.arrayBuffer())
            .then(res => setImage(URL.createObjectURL(new Blob([res]))))
    }, [])

    if (!image) {
        return <p>Loading...</p>
    }

    return (
        <Paper shadow='md' p='xl' radius='md' withBorder>
            <Image h={400} src={image} />
            <Text mt="md">{props.caption}</Text>
        </Paper>
    )
}
