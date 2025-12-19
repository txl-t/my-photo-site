import { readdirSync, readFileSync } from 'fs';
import path from 'path';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    summary: string;
  };
}

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPosts(): Post[] {
  const filenames = readdirSync(postsDirectory);
  
  return filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(postsDirectory, filename);
      const fileContent = readFileSync(filePath, 'utf8');
      
      // 解析 frontmatter
      const frontmatterMatch = fileContent.match(/---[\s\S]*?---/);
      if (!frontmatterMatch) {
        return {
          slug,
          frontmatter: {
            title: slug,
            date: '',
            summary: '',
          },
        };
      }
      
      const frontmatter = frontmatterMatch[0];
      const titleMatch = frontmatter.match(/title:\s*['"](.*?)['"]/);
      const dateMatch = frontmatter.match(/date:\s*['"](.*?)['"]/);
      const summaryMatch = frontmatter.match(/summary:\s*['"](.*?)['"]/);
      
      return {
        slug,
        frontmatter: {
          title: titleMatch?.[1] || slug,
          date: dateMatch?.[1] || '',
          summary: summaryMatch?.[1] || '',
        },
      };
    })
    .sort((a, b) => {
      // 按日期降序排序
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getPosts();
  return posts.find(post => post.slug === slug) || null;
}