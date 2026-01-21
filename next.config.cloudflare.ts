/** @type {import('next').NextConfig} */
const nextConfig = {
  // Para Cloudflare Pages
  output: 'export',
  
  // Desabilitar otimização de imagem (Cloudflare usa seu próprio sistema)
  images: {
    unoptimized: true,
  },

  // MDX support
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // Trailing slash para compatibilidade com Cloudflare
  trailingSlash: true,

  // Configurações do compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
