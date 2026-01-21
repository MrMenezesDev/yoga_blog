import fs from "fs";
import path from "path";
import SadhanaWidget from "@/components/dashboard/SadhanaWidget";
import RecentGarden from "@/components/dashboard/RecentGarden";
import AboutSection from "@/components/dashboard/AboutSection";

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

  // Transform posts into garden updates
  const gardenUpdates = posts.slice(0, 6).map(post => ({
    title: post.title,
    type: 'post' as const,
    date: post.date,
    slug: post.slug,
    excerpt: post.excerpt,
  }));

  // TODO: Add wiki and lab updates when those sections are implemented
  // For now, we'll just show posts

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Sadhana Widget - Destaque */}
        <SadhanaWidget
          title="Sādhana Atual"
          focus="Maṇipūra Chakra"
          day={305}
          totalDays={365}
          description="Ascese de 365 dias: Integração Yoga-Psicanálise"
        />

        {/* About Section */}
        <AboutSection />

        {/* Recent Garden Updates */}
        <RecentGarden updates={gardenUpdates} />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border-2 border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {posts.length}
            </div>
            <div className="text-sm text-gray-600">Reflexões no Diário</div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              47
            </div>
            <div className="text-sm text-gray-600">Termos na Sabedoria</div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              12
            </div>
            <div className="text-sm text-gray-600">Estudos no Laboratório</div>
          </div>
        </div>
      </div>
    </div>
  );
}

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Blog construído com Next.js, TypeScript, Tailwind CSS e MDX
          </p>
        </footer>
