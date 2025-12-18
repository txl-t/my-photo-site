'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Photo {
  _id: string;
  title?: string;
  imageUrl: string;
  thumbnailUrl: string;
  likeCount: number;
  commentCount: number;
  userId: {
    _id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  tags?: string[];
}

interface User {
  _id: string;
  username: string;
  avatar?: string;
  stats: {
    photoCount: number;
    followerCount: number;
  };
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // 这里应该调用搜索API
        // 暂时使用模拟数据
        
        if (query) {
          // 搜索照片
          const photoResults = Array.from({ length: 12 }, (_, i) => ({
            _id: `search-photo-${i}`,
            title: i % 2 === 0 ? `搜索结果 ${i + 1}` : undefined,
            imageUrl: `images/photoid/${i + 400}/800/600`,
            thumbnailUrl: `images/photoid/${i + 400}/200/200`,
            likeCount: Math.floor(Math.random() * 500),
            commentCount: Math.floor(Math.random() * 50),
            userId: {
              _id: `user-${i}`,
              username: `用户${i + 1}`,
              avatar: `images/photoid/${i + 100}/40/40`
            },
            createdAt: new Date().toISOString(),
            tags: ['风景', '城市', '摄影', query]
          }));
          setPhotos(photoResults);
          
          // 搜索用户
          const userResults = Array.from({ length: 6 }, (_, i) => ({
            _id: `search-user-${i}`,
            username: `${query}用户${i + 1}`,
            avatar: `images/photoid/${i + 500}/40/40`,
            stats: {
              photoCount: Math.floor(Math.random() * 50),
              followerCount: Math.floor(Math.random() * 1000)
            }
          }));
          setUsers(userResults);
        }
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">搜索中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">搜索结果: "{query}"</h1>
        
        {/* 搜索栏 */}
        <div className="mb-8">
          <form action="/search" className="relative">
            <input
              type="text"
              name="q"
              placeholder="搜索照片、用户、标签..."
              defaultValue={query}
              className="w-full px-6 py-3 rounded-full bg-white dark:bg-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              搜索
            </button>
          </form>
        </div>
        
        {/* 标签页 */}
        <div className="mb-8 flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-2 font-medium transition-colors duration-200 ${activeTab === 'photos' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'}`}
          >
            照片 ({photos.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 font-medium transition-colors duration-200 ${activeTab === 'users' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-500'}`}
          >
            用户 ({users.length})
          </button>
        </div>
        
        {/* 照片结果 */}
        {activeTab === 'photos' && (
          <section>
            {photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <Link key={photo._id} href={`/photos/${photo._id}`} className="group">
                    <div className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title || '照片'}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {photo.title && (
                      <p className="mt-2 text-sm font-medium truncate">{photo.title}</p>
                    )}
                    {photo.tags && photo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {photo.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">没有找到相关照片</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">尝试调整搜索词或使用其他关键词</p>
              </div>
            )}
          </section>
        )}
        
        {/* 用户结果 */}
        {activeTab === 'users' && (
          <section>
            {users.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {users.map((user) => (
                  <Link key={user._id} href={`/users/${user._id}`} className="group">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-4">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.username}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-2xl font-bold">{user.username.charAt(0)}</span>
                          </div>
                        )}
                        <div className="flex-grow">
                          <h3 className="font-bold">{user.username}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.stats.photoCount} 照片 · {user.stats.followerCount} 粉丝
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">没有找到相关用户</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">尝试调整搜索词或使用其他关键词</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
