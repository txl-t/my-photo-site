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
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  avatar?: string;
  bio?: string;
  location?: string;
  stats: {
    photoCount: number;
    likeCount: number;
    followerCount: number;
    followingCount: number;
  };
  devices?: string[];
}

export default function UserProfile({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        // 这里应该调用获取用户信息的API
        // 暂时使用模拟数据
        const mockUser: User = {
          _id: params.id,
          username: '摄影师小明',
          avatar: 'images/photoid/1005/100/100',
          bio: '热爱摄影，记录生活中的美好瞬间',
          location: '北京',
          stats: {
            photoCount: 42,
            likeCount: 1234,
            followerCount: 567,
            followingCount: 123
          },
          devices: ['iPhone 14 Pro', 'Sony A7 IV']
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPhotos = async () => {
      try {
        // 这里应该调用获取用户照片的API
        // 暂时使用模拟数据
        const mockPhotos: Photo[] = Array.from({ length: 12 }, (_, i) => ({
          _id: `photo-${i}`,
          title: i % 2 === 0 ? `照片 ${i + 1}` : undefined,
          imageUrl: `images/photoid/${i + 100}/800/600`,
          thumbnailUrl: `images/photoid/${i + 100}/200/200`,
          likeCount: Math.floor(Math.random() * 100),
          commentCount: Math.floor(Math.random() * 20),
          createdAt: new Date().toISOString()
        }));
        setPhotos(mockPhotos);
      } catch (error) {
        console.error('Failed to fetch user photos:', error);
      }
    };

    fetchUser();
    fetchUserPhotos();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">用户不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 封面图和用户信息 */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        {/* 封面图 */}
        <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
          {/* 这里可以添加封面图 */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        {/* 用户信息 */}
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* 头像 */}
            <div className="relative -top-16">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                  <span className="text-4xl font-bold">{user.username.charAt(0)}</span>
                </div>
              )}
            </div>
            
            {/* 基本信息 */}
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-2 rounded-full transition-colors duration-200 ${isFollowing ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  {isFollowing ? '已关注' : '关注'}
                </button>
              </div>
              
              {user.bio && <p className="mb-4 text-gray-600 dark:text-gray-300">{user.bio}</p>}
              
              <div className="flex items-center gap-6 mb-4">
                {user.location && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
              
              {/* 统计数据 */}
              <div className="flex gap-8">
                <div>
                  <span className="font-semibold">{user.stats.photoCount}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">照片</span>
                </div>
                <div>
                  <span className="font-semibold">{user.stats.likeCount}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">获赞</span>
                </div>
                <div>
                  <span className="font-semibold">{user.stats.followerCount}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">粉丝</span>
                </div>
                <div>
                  <span className="font-semibold">{user.stats.followingCount}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">关注</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 设备信息 */}
      {user.devices && user.devices.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">常用设备</h2>
            <div className="flex flex-wrap gap-3">
              {user.devices.map((device, index) => (
                <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                  {device}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* 照片墙 */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">照片 ({user.stats.photoCount})</h2>
        
        {/* 照片网格 */}
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
            </Link>
          ))}
        </div>
        
        {/* 空状态 */}
        {photos.length === 0 && (
          <div className="mt-16 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium">还没有照片</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">上传第一张照片，开始你的摄影之旅吧</p>
          </div>
        )}
      </div>
    </div>
  );
}
