import Link from 'next/link';

// 暂时使用静态数据，避免依赖 MDX 文件
const posts = [
  {
    slug: 'getting-started-with-nextjs-14',
    frontmatter: {
      title: 'Next.js 14 入门指南',
      date: '2025-12-01',
      summary: '学习 Next.js 14 的基础知识和新功能，包括 App Router 和 Server Components。'
    }
  },
  {
    slug: 'tailwind-css-guide',
    frontmatter: {
      title: 'Tailwind CSS 全面指南',
      date: '2025-11-15',
      summary: '掌握 Tailwind CSS，这个实用优先的 CSS 框架可以帮助你快速构建美观、响应式的网站。'
    }
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          博客
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
          关于 Web 开发的思考、教程和见解。
        </p>
      </div>
      
      {/* 博客列表 */}
      <div className="space-y-12">
        {posts.map((post, index) => (
          <article key={index} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="pb-8 border-b border-gray-200 dark:border-gray-700 group-hover:border-pink-500/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-0 group-hover:text-pink-500 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.frontmatter.date}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.frontmatter.summary}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
