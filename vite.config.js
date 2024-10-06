import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Define la raíz del proyecto
  publicDir: 'public', // Especifica la carpeta `public` como directorio estático
  build: {
    outDir: 'dist', // Carpeta de salida para los archivos compilados
    rollupOptions: {
      input: {
        // Aquí defines ambos HTML si quieres usarlos en la compilación
        main: 'index.html',       // HTML principal fuera de `public`
        page: 'public/demo.html'  // El HTML dentro de `public` que usa el JS
      }
    }
  }
});