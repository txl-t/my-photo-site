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

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/photos?page=${page}&limit=20`);
        const data = await res.json();
        
        if (page === 1) {
          setPhotos(data.photos);
        } else {
          setPhotos(prev => [...prev, ...data.photos]);
        }
        
        setHasMore(data.photos.length > 0);
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">隔壁的日常光</h1>
      
      {/* 瀑布流布局 */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {photos.map((photo) => (
          <div key={photo._id} className="break-inside-avoid mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link href={`/photos/${photo._id}`} className="block">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title || '照片'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4">
                {/* 照片标题 */}
                {photo.title && (
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{photo.title}</h3>
                )}
                
                {/* 用户信息 */}
                <div className="flex items-center space-x-2 mb-3">
                  {photo.userId.avatar ? (
                    <Image
                      src={photo.userId.avatar}
                      alt={photo.userId.username}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-sm font-medium">{photo.userId.username.charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium">{photo.userId.username}</span>
                </div>
                
                {/* 互动统计 */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{photo.likeCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>{photo.commentCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* 加载更多按钮 */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            {loading ? '加载中...' : '加载更多'}
          </button>
        </div>
      )}
      
      {/* 没有更多照片提示 */}
      {!hasMore && photos.length > 0 && (
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          没有更多照片了
        </div>
      )}
      
      {/* 空状态 */}
      {photos.length === 0 && !loading && (
        <div className="mt-16 text-center">
          <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium">还没有照片</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">成为第一个上传照片的人吧</p>
          <Link href="/upload">
            <button className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200">
              上传照片
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
