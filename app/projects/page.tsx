'use client';

import { motion, useMotionValueEvent, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { projects } from '../../lib/projects';

// 懒加载Three.js组件
const StarField = dynamic(() => import('../../components/StarField'), { ssr: false });
const AuroraBackground = dynamic(() => import('../../components/AuroraBackground'), { ssr: false });
import BubbleNavigation from '../../components/BubbleNavigation';

// 3D项目卡片组件
const ProjectCard3D = ({ project }: { project: typeof projects[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    
    // 设置最大倾斜角度为±10度
    x.set(xVal * 20);
    y.set(yVal * 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative group"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 overflow-hidden"
        style={{
          transform: `rotateY(${x}deg) rotateX(${-y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 240, 255, 0.2)' }}
      >
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
            <div className="relative w-full h-full">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-medium mb-3 ml-3 flex items-center gap-1"
                >
                  查看项目
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 hover:bg-cyan-400/20 hover:text-cyan-300 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* 星空背景 */}
      <Suspense fallback={null}>
        <StarField starsCount={1000} />
      </Suspense>
      {/* 极光背景 */}
      <Suspense fallback={null}>
        <AuroraBackground />
      </Suspense>

      {/* 气泡导航 */}
      <BubbleNavigation />

      {/* 主要内容 */}
      <main className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            项目展示
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ProjectCard3D project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 py-6 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2024 个人技术展示网站 | 基于 Next.js 和 Tailwind CSS 构建</p>
        </div>
      </footer>
    </div>
  );
}
