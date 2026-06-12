import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/dcx-web-app',
  server: {
    port: 4201,
    host: 'localhost',
  },
  preview: {
    port: 4301,
    host: 'localhost',
  },
  build: {
    outDir: '../dist/dcx-web-app',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});
