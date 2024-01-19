import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import unoCSS from 'unocss/vite';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unoCSS(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    vitePluginFaviconsInject('./public/nf.svg', {
      appName:
        'DX Events Visualizer: Visual explorer of Nearform DX events from 2023',
      appShortName: 'DX Events Visualizer',
      appDescription:
        "Provides an interactive map of all of the Nearform DX Team's events from the year 2023",
      // Extra options...
    }),
  ],
});
