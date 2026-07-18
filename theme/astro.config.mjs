import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import config from './src/config/config.json';
import { locales, defaultLocale } from './theme/i18n/utils.ts';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default {
  site: config.site.base_url,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/sitemap/') && !page.includes('/blog/') }), mdx()],

  vite: {
    plugins: [tailwindcss()],
  },


  devToolbar: {
    enabled: false,
  },

  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },
};
