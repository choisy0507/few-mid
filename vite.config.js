import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        original: resolve(import.meta.dirname, 'index.html'),
        editorial: resolve(import.meta.dirname, 'prototype-editorial/index.html'),
      },
    },
  },
});
