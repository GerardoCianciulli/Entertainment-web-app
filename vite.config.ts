import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const root = import.meta.dirname;

// Each page of the site is its own HTML entry point (multi-page app).
const pages = ['index', 'login', 'sign-up', 'movies', 'tv-series', 'bookmarked'];

/**
 * GitHub Pages can't run JSON-Server, so the build ships a read-only copy of
 * the video catalogue. Only `videos` is copied: member records never leave
 * the local data.json.
 */
function staticCatalogue(): Plugin {
  return {
    name: 'static-catalogue',
    apply: 'build',
    generateBundle() {
      const { videos } = JSON.parse(readFileSync(resolve(root, 'data.json'), 'utf8'));
      this.emitFile({ type: 'asset', fileName: 'data.json', source: JSON.stringify({ videos }) });
    },
  };
}

export default defineConfig({
  // GitHub Pages serves the project from https://<user>.github.io/<repository>/
  base: '/Entertainment-web-app/',
  plugins: [
    react(),
    svgr({
      // Let CSS drive icon colours (idle / hover / active states) through `color`.
      svgrOptions: { replaceAttrValues: { '#5A698F': 'currentColor', '#FFF': 'currentColor' } },
    }),
    staticCatalogue(),
  ],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(root, `${page}.html`)])),
    },
  },
});
