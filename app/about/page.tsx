'use client';

import { motion } from 'framer-motion';
import TimelineItem from '@/components/TimelineItem';
import { timeline } from '@/lib/timeline';

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'HTML & CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'React & Next.js', level: 90 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'Framer Motion', level: 80 },
  { name: 'UI/UX 设计', level: 75 },
  { name: 'Web 可访问性', level: 80 },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          关于我
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
          一名充满激情的前端开发者，拥有多年构建现代 Web 应用的经验。
        </p>
      </motion.div>
      
      {/* 时间轴 */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-12">
          工作经历
        </h2>
        <div className="max-w-3xl">
          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              date={item.date}
              title={item.title}
              content={item.content}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>
      </section>
      
      {/* 技能条 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-12">
          技能
        </h2>
        <div className="max-w-3xl space-y-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {skill.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.1 * index }}
                  className="bg-pink-500 h-2.5 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}