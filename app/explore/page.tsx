'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface Topic {
  id: string;
  title: string;
  coverUrl: string;
  photoCount: number;
}

interface Location {
  id: string;
  name: string;
  coverUrl: string;
  photoCount: number;
}

export default function Explore() {
  const [trendingPhotos, setTrendingPhotos] = useState<Photo[]>([]);
  const [newUsers, setNewUsers] = useState<User[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchExploreData = async () => {
      setLoading(true);
      try {
        // 这里应该调用探索页面的数据API
        // 暂时使用模拟数据
        
        // 热门照片
        const trending = Array.from({ length: 9 }, (_, i) => ({
          _id: `trending-${i}`,
          title: i % 2 === 0 ? `热门照片 ${i + 1}` : undefined,
          imageUrl: `images/photoid/${i + 200}/800/600`,
          thumbnailUrl: `images/photoid/${i + 200}/200/200`,
          likeCount: Math.floor(Math.random() * 1000),
          commentCount: Math.floor(Math.random() * 100),
          userId: {
            _id: `user-${i}`,
            username: `用户${i + 1}`,
            avatar: `images/photoid/${i + 100}/40/40`
          },
          createdAt: new Date().toISOString()
        }));
        setTrendingPhotos(trending);
        
        // 新人推荐
        const newUsersData = Array.from({ length: 6 }, (_, i) => ({
          _id: `new-user-${i}`,
          username: `新用户${i + 1}`,
          avatar: `images/photoid/${i + 300}/40/40`,
          stats: {
            photoCount: Math.floor(Math.random() * 20),
            followerCount: Math.floor(Math.random() * 50)
          }
        }));
        setNewUsers(newUsersData);
        
        // 专题合集
        const topicsData = [
          {
            id: 'topic-1',
            title: '早高峰的光',
            coverUrl: 'images/photoid/101/800/600',
            photoCount: 123
          },
          {
            id: 'topic-2',
            title: '菜市场色系',
            coverUrl: 'images/photoid/102/800/600',
            photoCount: 89
          },
          {
            id: 'topic-3',
            title: '城市夜景',
            coverUrl: 'images/photoid/103/800/600',
            photoCount: 156
          }
        ];
        setTopics(topicsData);
        
        // 地理发现
        const locationsData = [
          {
            id: 'location-1',
            name: '北京',
            coverUrl: 'images/photoid/104/800/600',
            photoCount: 234
          },
          {
            id: 'location-2',
            name: '上海',
            coverUrl: 'images/photoid/105/800/600',
            photoCount: 198
          },
          {
            id: 'location-3',
            name: '广州',
            coverUrl: 'images/photoid/106/800/600',
            photoCount: 156
          },
          {
            id: 'location-4',
            name: '深圳',
            coverUrl: 'images/photoid/107/800/600',
            photoCount: 187
          }
        ];
        setLocations(locationsData);
      } catch (error) {
        console.error('Failed to fetch explore data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里应该处理搜索逻辑
    console.log('Searching for:', searchQuery);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">探索</h1>
        
        {/* 搜索栏 */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="搜索照片、用户、标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        
        {/* 热门排行榜 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">热门排行榜</h2>
            <Link href="/explore/trending" className="text-blue-500 hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {trendingPhotos.map((photo) => (
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
              </Link>
            ))}
          </div>
        </section>
        
        {/* 新人推荐 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">新人推荐</h2>
            <Link href="/explore/new-users" className="text-blue-500 hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-6 gap-4">
            {newUsers.map((user) => (
              <Link key={user._id} href={`/users/${user._id}`} className="group">
                <div className="flex flex-col items-center">
                  <div className="aspect-square overflow-hidden rounded-full w-20 h-20 shadow-md hover:shadow-xl transition-shadow duration-300">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.username}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-2xl font-bold">{user.username.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 font-medium truncate w-full text-center">{user.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.stats.photoCount} 照片 · {user.stats.followerCount} 粉丝
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* 专题合集 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">专题合集</h2>
            <Link href="/explore/topics" className="text-blue-500 hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {topics.map((topic) => (
              <Link key={topic.id} href={`/explore/topics/${topic.id}`} className="group">
                <div className="aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative">
                  <Image
                    src={topic.coverUrl}
                    alt={topic.title}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white font-bold text-lg">{topic.title}</h3>
                    <p className="text-white/80 text-sm">{topic.photoCount} 张照片</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* 地理发现 */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">地理发现</h2>
            <Link href="/explore/locations" className="text-blue-500 hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {locations.map((location) => (
              <Link key={location.id} href={`/explore/locations/${location.id}`} className="group">
                <div className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative">
                  <Image
                    src={location.coverUrl}
                    alt={location.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white font-bold">{location.name}</h3>
                    <p className="text-white/80 text-xs">{location.photoCount} 张照片</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
