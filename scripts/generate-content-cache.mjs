import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../content');
const OUTPUT_DIR = path.join(__dirname, '../src/lib/generated');

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function parseMDXFiles(dir, type) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'));
  
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(dir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const post = {
      slug,
      frontmatter: data,
      content,
    };

    if (type === 'diary') {
      post.readingTime = calculateReadingTime(content);
    }

    if (type === 'lab' && data.deadline) {
      const now = new Date();
      const deadline = new Date(data.deadline);
      const diffTime = deadline.getTime() - now.getTime();
      post.frontmatter.daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return post;
  });
}

function generateContentCache() {
  console.log('🔨 Generating content cache for Cloudflare Pages...');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate diary posts cache
  const diaryPosts = parseMDXFiles(path.join(CONTENT_DIR, 'diary'), 'diary');
  diaryPosts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'diary.json'),
    JSON.stringify(diaryPosts, null, 2)
  );
  console.log(`✅ Generated ${diaryPosts.length} diary posts`);

  // Generate lab posts cache
  const labPosts = parseMDXFiles(path.join(CONTENT_DIR, 'lab'), 'lab');
  labPosts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'lab.json'),
    JSON.stringify(labPosts, null, 2)
  );
  console.log(`✅ Generated ${labPosts.length} lab posts`);

  // Generate wisdom posts cache
  const wisdomPosts = parseMDXFiles(path.join(CONTENT_DIR, 'wisdom'), 'wisdom');
  wisdomPosts.sort((a, b) => 
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'wisdom.json'),
    JSON.stringify(wisdomPosts, null, 2)
  );
  console.log(`✅ Generated ${wisdomPosts.length} wisdom posts`);

  console.log('✨ Content cache generation complete!');
}

generateContentCache();
