import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {fileURLToPath} from 'url';
import {defineConfig, loadEnv} from 'vite';

const projectDirectory = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
    build: {
      modulePreload: {
        polyfill: false,
      },
    },
    define: {
      process: 'window.process',
    },
    resolve: {
      alias: {
        '@': path.resolve(projectDirectory, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify; file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
