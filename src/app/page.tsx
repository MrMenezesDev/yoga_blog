import Link from "next/link";
import fs from "fs";
import path from "path";

interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

async function getPosts(): Promise<PostMetadata[]> {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter((file) => file.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      
      // Extract frontmatter
      const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
      const match = frontmatterRegex.exec(fileContents);
      const frontmatter = match ? match[1] : "";
      
      const title = frontmatter.match(/title:\s*["'](.+)["']/)?.[1] || slug;
      const date = frontmatter.match(/date:\s*["'](.+)["']/)?.[1] || "";
      const excerpt = frontmatter.match(/excerpt:\s*["'](.+)["']/)?.[1] || "";
      
      return { title, date, excerpt, slug };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-600">योग</span> Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Integrando Yoga, Sânscrito, Psicanálise e Tecnologia na busca por{" "}
            <em className="text-orange-700">Sthira</em> (estabilidade) e{" "}
            <em className="text-blue-700">Sukha</em> (fluidez)
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b-2 border-orange-300 pb-2">
            Posts Recentes
          </h2>
          
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-orange-500"
                >
                  <Link href={`/posts/${post.slug}`}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <time className="text-sm text-gray-500 mb-3 block">
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    Ler mais →
                  </Link>
                </article>
              ))
            ) : (
              <p className="text-gray-600 text-center py-12">
                Nenhum post publicado ainda. Comece escrevendo em{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  /content/posts
                </code>
              </p>
            )}
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Blog construído com Next.js, TypeScript, Tailwind CSS e MDX
          </p>
        </footer>
      </main>
    </div>
  );
}
