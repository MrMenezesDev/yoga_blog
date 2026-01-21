import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  DiaryPost,
  LabPost,
  WisdomPost,
  DiaryFrontmatter,
  LabFrontmatter,
  WisdomFrontmatter,
} from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Calcula tempo de leitura estimado
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Parse genérico de arquivo MDX
 */
function parseMDX<T>(filePath: string, slug: string): { frontmatter: T; content: string } {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: data as T,
    content,
  };
}

// ============================================
// DIARY (Diário)
// ============================================

export function getAllDiaryPosts(): DiaryPost[] {
  const diaryDir = path.join(CONTENT_DIR, 'diary');
  
  if (!fs.existsSync(diaryDir)) {
    return [];
  }
  
  const files = fs.readdirSync(diaryDir).filter((file) => file.endsWith('.mdx'));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(diaryDir, filename);
    const { frontmatter, content } = parseMDX<DiaryFrontmatter>(filePath, slug);
    
    return {
      slug,
      frontmatter,
      content,
      readingTime: calculateReadingTime(content),
    };
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getDiaryPostBySlug(slug: string): DiaryPost | null {
  const filePath = path.join(CONTENT_DIR, 'diary', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const { frontmatter, content } = parseMDX<DiaryFrontmatter>(filePath, slug);
  
  return {
    slug,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content),
  };
}

/**
 * Get featured diary posts for dashboard
 */
export function getFeaturedDiaryPosts(limit = 3): DiaryPost[] {
  const allPosts = getAllDiaryPosts();
  return allPosts.filter((post) => post.frontmatter.featured).slice(0, limit);
}

// ============================================
// LAB (Laboratório)
// ============================================

export function getAllLabPosts(): LabPost[] {
  const labDir = path.join(CONTENT_DIR, 'lab');
  
  if (!fs.existsSync(labDir)) {
    return [];
  }
  
  const files = fs.readdirSync(labDir).filter((file) => file.endsWith('.mdx'));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(labDir, filename);
    const { frontmatter, content } = parseMDX<LabFrontmatter>(filePath, slug);
    
    // Calcular dias restantes se houver deadline
    let daysRemaining: number | undefined;
    if (frontmatter.deadline) {
      const now = new Date();
      const deadline = new Date(frontmatter.deadline);
      const diffTime = deadline.getTime() - now.getTime();
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    return {
      slug,
      frontmatter: {
        ...frontmatter,
        daysRemaining,
      },
      content,
    };
  });
  
  // Sort by date
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getLabPostBySlug(slug: string): LabPost | null {
  const filePath = path.join(CONTENT_DIR, 'lab', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const { frontmatter, content } = parseMDX<LabFrontmatter>(filePath, slug);
  
  return {
    slug,
    frontmatter,
    content,
  };
}

/**
 * Get posts by status (for Kanban)
 */
export function getLabPostsByStatus(status: 'todo' | 'doing' | 'done'): LabPost[] {
  const allPosts = getAllLabPosts();
  return allPosts.filter((post) => post.frontmatter.status === status);
}

/**
 * Get current focus (featured lab item for dashboard)
 */
export function getCurrentFocus(): LabPost | null {
  const allPosts = getAllLabPosts();
  const featured = allPosts.find((post) => post.frontmatter.featured);
  return featured || null;
}

// ============================================
// WISDOM (Sabedoria)
// ============================================

export function getAllWisdomPosts(): WisdomPost[] {
  const wisdomDir = path.join(CONTENT_DIR, 'wisdom');
  
  if (!fs.existsSync(wisdomDir)) {
    return [];
  }
  
  const files = fs.readdirSync(wisdomDir).filter((file) => file.endsWith('.mdx'));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(wisdomDir, filename);
    const { frontmatter, content } = parseMDX<WisdomFrontmatter>(filePath, slug);
    
    return {
      slug,
      frontmatter,
      content,
    };
  });
  
  // Sort alphabetically by title
  return posts.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export function getWisdomPostBySlug(slug: string): WisdomPost | null {
  const filePath = path.join(CONTENT_DIR, 'wisdom', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const { frontmatter, content } = parseMDX<WisdomFrontmatter>(filePath, slug);
  
  return {
    slug,
    frontmatter,
    content,
  };
}

/**
 * Get wisdom by category
 */
export function getWisdomByCategory(category: string): WisdomPost[] {
  const allPosts = getAllWisdomPosts();
  return allPosts.filter((post) => post.frontmatter.category === category);
}

/**
 * Get related concepts for hover card
 * Returns multiple concepts at once for efficiency
 */
export function getConceptsBySlugsBatch(slugs: string[]): Map<string, WisdomPost> {
  const map = new Map<string, WisdomPost>();
  
  slugs.forEach((slug) => {
    const post = getWisdomPostBySlug(slug);
    if (post) {
      map.set(slug, post);
    }
  });
  
  return map;
}
