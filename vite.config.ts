export default defineConfig(({ mode }) => {
  // Carrega do arquivo .env local
  const env = loadEnv(mode, process.cwd(), '');
  
  // PEGA DO SISTEMA (VERCEL) SE NÃO TIVER NO .ENV
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // Usa a const 'apiKey' que criamos com a segurança do fallback
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
