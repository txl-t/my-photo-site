'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 懒加载Three.js组件
const StarField = dynamic(() => import('../../components/StarField'), { ssr: false });
const AuroraBackground = dynamic(() => import('../../components/AuroraBackground'), { ssr: false });
import BubbleNavigation from '../../components/BubbleNavigation';

// 模拟GitHub Issue留言数据
const mockIssues = [
  {
    id: 1,
    title: '非常棒的网站设计！',
    author: 'user1',
    date: '2024-01-10',
    body: '我喜欢你的网站设计，尤其是极光背景和打字机效果，非常酷！'
  },
  {
    id: 2,
    title: '关于项目展示的问题',
    author: 'user2',
    date: '2024-01-05',
    body: '请问你的3D项目卡片是如何实现的？使用了什么技术栈？'
  },
  {
    id: 3,
    title: '感谢分享技术文章',
    author: 'user3',
    date: '2024-01-01',
    body: '你的Next.js 14入门指南非常有帮助，谢谢分享！'
  }
];

export default function GuestbookPage() {
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
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            留言板
          </motion.h1>

          <div className="mb-12">
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-cyan-400">GitHub Issue 留言系统</h2>
              <p className="text-gray-300 mb-6">
                本留言板使用 GitHub Issue 作为后端系统。要添加留言，请访问下面的链接在 GitHub 上创建一个新 Issue。
              </p>
              <a
                href="https://github.com/yourusername/yourrepository/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                创建新留言
              </a>
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">最新留言</h2>

          <div className="space-y-6">
            {mockIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-400/50 transition-colors"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-cyan-400">{issue.title}</h3>
                  <span className="text-sm text-gray-400">{issue.date}</span>
                </div>
                <div className="flex items-center mb-4">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                  <span className="text-sm text-gray-400">{issue.author}</span>
                </div>
                <p className="text-gray-300">{issue.body}</p>
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
