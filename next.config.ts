import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Static export para Cloudflare Pages
  output: 'export',
  
  // Desabilitar otimização de imagem (Cloudflare usa seu próprio sistema)
  images: {
    unoptimized: true,
  },
  
  // Trailing slash para compatibilidade
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
