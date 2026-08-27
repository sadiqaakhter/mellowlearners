import react from '@vitejs/plugin-react';
import {sites} from '@openai/sites-vite-plugin';
import {defineConfig} from 'vite';
import {mkdir, writeFile} from 'node:fs/promises';

const workerEntry = () => ({
  name: 'mellow-playground-worker',
  async closeBundle() {
    await mkdir('dist/server', {recursive: true});
    await writeFile('dist/server/index.js', `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== 'GET') return response;
    const home = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(home, request));
  }
};\n`);
  },
});

export default defineConfig({
  plugins: [react(), sites(), workerEntry()],
  server: {host: '0.0.0.0', port: 3000},
});

