'use client';

import { motion } from 'framer-motion';
import WorkCard from '@/components/WorkCard';
import { works } from '@/lib/works';

export default function Works() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          我的作品
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
          我最近的项目和作品集合。
        </p>
      </motion.div>
      
      {/* 作品网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <WorkCard
              title={work.title}
              desc={work.desc}
              img={work.img}
              url={work.url}
              tags={work.tags}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}