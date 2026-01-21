import {
  DiaryPost,
  LabPost,
  WisdomPost,
  DiaryFrontmatter,
  LabFrontmatter,
  WisdomFrontmatter,
} from '@/types/content';

// Import generated JSON files (created at build time)
import diaryData from './generated/diary.json';
import labData from './generated/lab.json';
import wisdomData from './generated/wisdom.json';

// ============================================
// DIARY (Diário)
// ============================================

export function getAllDiaryPosts(): DiaryPost[] {
  return diaryData as DiaryPost[];
}

export function getDiaryPostBySlug(slug: string): DiaryPost | null {
  const post = diaryData.find((p: any) => p.slug === slug);
  return (post as DiaryPost) || null;
}

export function getFeaturedDiaryPosts(limit = 3): DiaryPost[] {
  const allPosts = getAllDiaryPosts();
  return allPosts.filter((post: any) => post.frontmatter.featured).slice(0, limit);
}

// ============================================
// LAB (Laboratório)
// ============================================

export function getAllLabPosts(): LabPost[] {
  return labData as LabPost[];
}

export function getLabPostBySlug(slug: string): LabPost | null {
  const post = labData.find((p: any) => p.slug === slug);
  return (post as LabPost) || null;
}

export function getLabPostsByStatus(status: 'todo' | 'doing' | 'done'): LabPost[] {
  const allPosts = getAllLabPosts();
  return allPosts.filter((post: any) => post.frontmatter.status === status);
}

export function getCurrentFocus(): LabPost | null {
  const allPosts = getAllLabPosts();
  const featured = allPosts.find((post: any) => post.frontmatter.featured);
  return (featured as LabPost) || null;
}

// ============================================
// WISDOM (Sabedoria)
// ============================================

export function getAllWisdomPosts(): WisdomPost[] {
  return wisdomData as WisdomPost[];
}

export function getWisdomPostBySlug(slug: string): WisdomPost | null {
  const post = wisdomData.find((p: any) => p.slug === slug);
  return (post as WisdomPost) || null;
}

export function getWisdomByCategory(category: string): WisdomPost[] {
  const allPosts = getAllWisdomPosts();
  return allPosts.filter((post: any) => post.frontmatter.category === category);
}

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
