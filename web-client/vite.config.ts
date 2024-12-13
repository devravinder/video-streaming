import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ReactCompilerConfig = {}; // Add any specific configurations here if needed


// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", ReactCompilerConfig],
          ],
        },
      }),
    ],
    server:{
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: false,
        },
      }
    }
  };
});