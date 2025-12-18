import { motion } from 'framer-motion';
import { getPostBySlug } from '@/lib/posts';

interface BlogPostProps {
  params: { slug: string };
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Post not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {post.frontmatter.title}
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {post.frontmatter.date}
        </div>
      </motion.div>
      
      {/* MDX 内容将通过 @next/mdx 自动渲染 */}
    </div>
  );
}
