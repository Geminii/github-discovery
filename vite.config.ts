import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [vue(), Components(), svgLoader()]
});
