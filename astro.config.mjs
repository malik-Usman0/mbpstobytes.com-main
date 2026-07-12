import { defineConfig } from 'astro/config';

import config from './theme/astro.config.mjs';

// https://astro.build/config
export default defineConfig({
  ...config,
});
