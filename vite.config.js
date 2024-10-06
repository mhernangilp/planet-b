// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Raíz del proyecto
  publicDir: 'public', // Carpeta estática
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',         // Archivo principal de la raíz
        page: 'public/demo.html'    // Archivo en `public` que necesita el JS
      }
    }
  }
});
