import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

async function getPosts(): Promise<PostMetadata[]> {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((file) => file.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');

      const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
      const match = frontmatterRegex.exec(fileContents);
      const frontmatter = match ? match[1] : '';

      const title = frontmatter.match(/title:\s*["'](.+)["']/)?.[1] || slug;
      const date = frontmatter.match(/date:\s*["'](.+)["']/)?.[1] || '';
      const excerpt = frontmatter.match(/excerpt:\s*["'](.+)["']/)?.[1] || '';

      return { title, date, excerpt, slug };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export default async function DiarioPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📖 Diário de Sādhana
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Reflexões diárias sobre a prática de Yoga, leituras da Bhagavad Gītā, 
            e insights da jornada de 365 dias de ascese.
          </p>
        </header>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg border-2 border-gray-100 hover:border-orange-300 transition-all p-6 shadow-sm hover:shadow-md"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <time className="text-sm text-gray-500 mb-3 block">
                  {new Date(post.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-orange-600 font-medium hover:text-orange-700 transition-colors inline-flex items-center gap-2"
                >
                  Ler reflexão completa →
                </Link>
              </article>
            ))
          ) : (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-gray-600">
                Nenhuma reflexão publicada ainda. Comece sua jornada em{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  /content/posts
                </code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
