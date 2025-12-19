export interface Project {
  title: string;
  desc: string;
  img: string;
  url: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: '时区同步转换器',
    desc: '一个基于Next.js和Tailwind CSS构建的全球时区转换工具，支持200+时区，实时时差计算。',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop&crop=entropy',
    url: 'https://timesync.example.com',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript']
  },
  {
    title: '3D数据可视化平台',
    desc: '使用Three.js构建的交互式3D数据可视化平台，支持多种图表类型和动画效果。',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=entropy',
    url: 'https://visualization.example.com',
    tags: ['Three.js', 'D3.js', 'React', 'TypeScript']
  },
  {
    title: '个人博客系统',
    desc: '基于MDX和Next.js构建的现代化个人博客系统，支持深色/浅色模式切换。',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300&h=200&fit=crop&crop=entropy',
    url: 'https://blog.example.com',
    tags: ['Next.js', 'MDX', 'Tailwind CSS', 'TypeScript']
  },
  {
    title: '任务管理应用',
    desc: '一个功能齐全的任务管理应用，支持看板、列表和日历视图。',
    img: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=300&h=200&fit=crop&crop=entropy',
    url: 'https://tasks.example.com',
    tags: ['React', 'Redux', 'Tailwind CSS', 'Firebase']
  },
  {
    title: '音乐播放器',
    desc: '一个具有现代UI设计的音乐播放器，支持播放列表和音频可视化。',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=200&fit=crop&crop=entropy',
    url: 'https://music.example.com',
    tags: ['React', 'Framer Motion', 'Web Audio API', 'TypeScript']
  },
  {
    title: '电商网站模板',
    desc: '一个响应式电商网站模板，支持产品展示、购物车和结账功能。',
    img: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=200&fit=crop&crop=entropy',
    url: 'https://ecommerce.example.com',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Stripe']
  }
];
