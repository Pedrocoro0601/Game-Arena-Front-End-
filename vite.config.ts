export default defineConfig(({ mode }) => {
  // Carrega variáveis do arquivo .env (se existir)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Tenta pegar do .env OU das variáveis de ambiente do sistema (Vercel)
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // Usa a variável apiKey que definimos acima com a verificação de segurança
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  }
});