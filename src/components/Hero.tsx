import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import image from '~/assets/hero.svg';
import classes from './Hero.module.css';

// source: https://ui.mantine.dev/category/hero/

export default function HeroBullets() {
    return (
        <Container size="md">
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        A <span className={classes.highlight}>story book</span> <br /> powered by AI
                    </Title>
                    <Text c="dimmed" mt="md">
                        Build simple story book using LLM and diffucion models, powered by CloudFlare AI.
                    </Text>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl">
                                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            <b>Mistral 7b</b> - to write the stories
                        </List.Item>
                        <List.Item>
                            <b>Stable Diffusion XL</b> - to create the illustrations
                        </List.Item>
                        <List.Item>
                            <b>Serverless</b> - everything is serverless, running on CloudFlare Pages
                        </List.Item>
                    </List>

                    <Group mt={30}>
                        <Button radius="xl" size="md" className={classes.control} onClick={() => window.open("https://github.com/fahminlb33/storyflare", "_blank")}>
                            Source Code
                        </Button>
                    </Group>
                </div>
                <Image src={image} className={classes.image} />
            </div>
        </Container>
    );
}
