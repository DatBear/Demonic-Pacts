import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';

const inlineCss = (): Plugin => {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const cssFileName = Object.keys(bundle).find(key => key.endsWith('.css'));
      if (!cssFileName) return;

      const cssAsset = bundle[cssFileName];
      if (cssAsset.type !== 'asset') return;

      const htmlFileName = Object.keys(bundle).find(key => key.endsWith('.html'));
      if (!htmlFileName) return;

      const htmlAsset = bundle[htmlFileName];
      if (htmlAsset.type !== 'asset') return;

      const html = htmlAsset.source as string;
      const cssContent = cssAsset.source;

      const linkRegex = new RegExp(`<link[^>]*href="[^"]*${cssFileName}"[^>]*>`, 'i');

      if (linkRegex.test(html)) {
        htmlAsset.source = html.replace(linkRegex, () => `<style>${cssContent}</style>`);
        delete bundle[cssFileName];
      }
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
