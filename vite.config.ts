//import { resolve } from 'path';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import viteConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'observer-ts',
    },
  },
  plugins: [
    dts({ outDir: 'dist', exclude: ['**/*.(test|spec).ts?', '**/__test__/**', '/test'] }),
    viteConfigPaths(),
  ],
});
