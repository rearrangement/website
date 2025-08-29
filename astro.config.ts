// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://shxrk.dev',
    trailingSlash: 'ignore',
    integrations: [sitemap()],

    output: 'server',
    adapter: vercel({ webAnalytics: { enabled: true } }),
});
