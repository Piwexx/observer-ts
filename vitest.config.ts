import { coverageConfigDefaults, defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      setupFiles: './test/setup',
      environment: 'jsdom',
      coverage: {
        exclude: [...coverageConfigDefaults.exclude],
      },
    },
  }),
);
