# Storyflare🌤️

Create storybook from prompt.

This project uses an LLM to generate a story and a diffusion model to generate image illustrations. It's a very simplified use case of AI models to demonstrate how easy it is to integrate CloudFlare AI on apps. This project uses two models,

- `@hf/thebloke/mistral-7b-instruct-v0.1-awq` to generate the story and extracting a suitable illustration description
- `@cf/stabilityai/stable-diffusion-xl-base-1.0` to generate the illustration

Try here: https://storyflare.pages.dev/

Example prompt:

- Story about photosynthesis for high school students
- Story describing renewable energy for kids

## Requirements

- Node v20.12.0
- npm v10.5.0
- Wrangler v3.0.0 or newer

## Tech Stack

- Vite
- React
- Mantine
- CloudFlare services used: Pages, Workers AI

## Deployment

```bash
# clone the repo
git clone https://github.com/fahminlb33/storyflare.git

# install dependencies
npm install

# build repo
npm run build

# deploy to CloudFlare Pages
npm run deploy
```

After the site has been deployed, add Worker AI binding to the Pages instance.

1. Login to CloudFlare Dashboard.
2. Workers & Pages > storyflare > Settings > Functions
3. On **Workers AI Bindings**, click `Add Binding`
4. Set the `Variable name` as "AI"
5. Save and test your app
