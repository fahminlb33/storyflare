import { useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Button, Container, Group, Stack, Text, Textarea, ThemeIcon, rem } from '@mantine/core';
import { IconNumber1, IconNumber2, IconNumber3 } from '@tabler/icons-react';

import Hero from "~/components/Hero";
import Page from "~/components/StoryPage";

type PageDetail = { i: number, caption: string }

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [story, setStory] = useState("Enter excerpt and click Generate Story.")
    const [storyContents, setStoryContents] = useState<PageDetail[]>([])

    function submit() {
        // set loading state
        setStory("Generating...");
        setIsLoading(true);

        // generate story
        fetch("/api/create_story", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        })
            .then(res => res.json())
            .then(res => {
                // get full story
                const fullStory = String((res as any).response);
                setStory(fullStory);

                // generate image per page
                const pages = fullStory.split("\n").filter(x => x.length > 10);
                for (let i = 0; i < pages.length; i++) {
                    setStoryContents(old => [...old, { i, caption: pages[i].trim(), }])
                }

                // set loading state
                setIsLoading(false)
            })
            .catch(() => {
                // set loading state
                setIsLoading(false)
            })
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <Hero />

            <Container size="md" p="xl">
                <Stack>
                    {/* Step 1 - enter excerpt */}
                    <Group>
                        <ThemeIcon size={20} radius="md">
                            <IconNumber1 style={{ width: rem(10), height: rem(10) }} stroke={1.5} />
                        </ThemeIcon>
                        <Text size="xl" mb="2px" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                            Enter story excerpt
                        </Text>
                    </Group>

                    <Textarea
                        label="Story Prompt"
                        placeholder='Input story excerpt to be generated into fully fledged story'
                        value={prompt}
                        onChange={e => setPrompt(e.currentTarget.value)}
                        disabled={isLoading}
                    />
                    <Button onClick={submit} disabled={isLoading}>Generate Story</Button>

                    {/* Step 2 - review story */}
                    <Group mt="30px">
                        <ThemeIcon size={20} radius="md">
                            <IconNumber2 style={{ width: rem(10), height: rem(10) }} stroke={1.5} />
                        </ThemeIcon>
                        <Text size="xl" mb="2px" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                            Review generated story
                        </Text>
                    </Group>

                    <Text style={{ whiteSpace: "pre-line" }}>{story}</Text>

                    {/* Step 3 - full story with image */}
                    <Group mt="30px">
                        <ThemeIcon size={20} radius="md">
                            <IconNumber3 style={{ width: rem(10), height: rem(10) }} stroke={1.5} />
                        </ThemeIcon>
                        <Text size="xl" mb="2px" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                            Review story book
                        </Text>
                    </Group>

                    {storyContents.length === 0 && <Text>Enter excerpt and click Generate Story.</Text>}
                    {storyContents.length > 0 && <Carousel withIndicators>
                        {storyContents.sort((a, b) => a.i - b.i).map((page, i) => (
                            <Carousel.Slide>
                                <Page key={i} pageNum={page.i} caption={page.caption} />
                            </Carousel.Slide>
                        ))}
                    </Carousel>}
                </Stack>
            </Container>
        </div>
    )
}
