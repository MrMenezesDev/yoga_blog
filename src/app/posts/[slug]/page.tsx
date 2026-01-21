import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import TableOfContents from "@/components/layout/TableOfContents";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

interface PostMetadata {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  excerpt?: string;
}

async function getPostContent(slug: string) {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Read frontmatter
  const fileContents = fs.readFileSync(filePath, "utf8");
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContents);
  const frontmatter = match ? match[1] : "";

  const title = frontmatter.match(/title:\s*["'](.+)["']/)?.[1] || slug;
  const date = frontmatter.match(/date:\s*["'](.+)["']/)?.[1] || "";
  const author = frontmatter.match(/author:\s*["'](.+)["']/)?.[1];
  const excerpt = frontmatter.match(/excerpt:\s*["'](.+)["']/)?.[1];
  
  // Parse tags
  const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/);
  const tags = tagsMatch
    ? tagsMatch[1].split(",").map((tag) => tag.trim().replace(/['"]/g, ""))
    : [];

  const metadata: PostMetadata = { title, date, author, tags, excerpt };

  // Import the MDX component
  const { default: Post } = await import(
    `../../../../content/posts/${slug}.mdx`
  );

  return { Post, metadata };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((file) => file.endsWith(".mdx"))
    .map((filename) => ({
      slug: filename.replace(/\.mdx$/, ""),
    }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postData = await getPostContent(slug);

  if (!postData) {
    notFound();
  }

  const { Post, metadata } = postData;

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 mr-64">
        <Link
          href="/"
          className="text-orange-600 hover:text-orange-700 font-medium mb-8 inline-block"
        >
          ← Voltar ao Início
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {metadata.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <time>
              {new Date(metadata.date).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {metadata.author && <span>Por {metadata.author}</span>}
          </div>
          {metadata.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {metadata.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg prose-orange max-w-none">
          <Post />
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Voltar ao Início
          </Link>
        </footer>
      </article>

      {/* Table of Contents - Right Sidebar */}
      <TableOfContents />
    </div>
  );
}
