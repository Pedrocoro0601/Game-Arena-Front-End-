import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 1. Carrega variáveis locais (funciona no seu PC)
  const env = loadEnv(mode, process.cwd(), '');
  
  // 2. CRUCIAL: Pega do PC ou da Vercel
  // Sem o 'process.env' aqui, o site fica preto na Vercel!
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // Passa a chave para o React
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  }
});