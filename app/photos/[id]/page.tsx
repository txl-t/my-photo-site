'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Photo {
  _id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  likeCount: number;
  commentCount: number;
  userId: {
    _id: string;
    username: string;
    avatar?: string;
  };
  exif?: {
    device: string;
    aperture: string;
    shutterSpeed: string;
    iso: number;
    focalLength: string;
  };
  tags?: string[];
  createdAt: string;
}

interface Comment {
  _id: string;
  userId: {
    _id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  likeCount: number;
  createdAt: string;
  parentId?: string;
}

export default function PhotoDetail({ params }: { params: { id: string } }) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/photos/${params.id}`);
        const data = await res.json();
        setPhoto(data);
      } catch (error) {
        console.error('Failed to fetch photo:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        // 调用获取评论的API
        const res = await fetch(`http://localhost:5000/api/comments/photos/${params.id}`);
        const data = await res.json();
        
        if (data.comments) {
          setComments(data.comments);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchPhoto();
    fetchComments();
  }, [params.id]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    
    try {
      if (isLiked) {
        // 取消点赞
        await fetch(`http://localhost:5000/api/likes/${params.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      } else {
        // 点赞
        await fetch(`http://localhost:5000/api/likes/${params.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
      }
      
      setIsLiked(!isLiked);
      if (photo) {
        setPhoto(prev => prev ? {
          ...prev,
          likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1
        } : null);
      }
    } catch (error) {
      console.error('Failed to like/unlike photo:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    const token = localStorage.getItem('token');
    
    try {
      // 调用发表评论的API
      const res = await fetch(`http://localhost:5000/api/comments/photos/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: commentContent.trim()
        })
      });
      
      const data = await res.json();
      
      if (data.comment) {
        setComments(prev => [data.comment, ...prev]);
        setCommentContent('');
        if (photo) {
          setPhoto(prev => prev ? {
            ...prev,
            commentCount: prev.commentCount + 1
          } : null);
        }
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  if (!photo) {
    return <div className="flex justify-center items-center h-screen">照片不存在</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 照片详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：照片展示 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Image
              src={photo.imageUrl}
              alt={photo.title || '照片'}
              width={800}
              height={600}
              className="w-full object-contain"
            />
          </div>
        </div>
        
        {/* 右侧：照片信息和互动 */}
        <div className="space-y-6">
          {/* 照片基本信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-2">{photo.title || '无标题'}</h1>
            {photo.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">{photo.description}</p>
            )}
            
            {/* 用户信息 */}
            <div className="flex items-center space-x-3 mb-6">
              <Link href={`/users/${photo.userId._id}`} className="flex items-center space-x-3">
                {photo.userId.avatar ? (
                  <Image
                    src={photo.userId.avatar}
                    alt={photo.userId.username}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-lg font-medium">{photo.userId.username.charAt(0)}</span>
                  </div>
                )}
                <span className="font-medium">{photo.userId.username}</span>
              </Link>
            </div>
            
            {/* 互动按钮 */}
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${isLiked ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{photo.likeCount}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{photo.commentCount}</span>
              </button>
            </div>
          </div>
          
          {/* EXIF信息 */}
          {photo.exif && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">拍摄参数</h2>
              <div className="grid grid-cols-2 gap-4">
                {photo.exif.device && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">设备</span>
                    <span className="font-medium">{photo.exif.device}</span>
                  </div>
                )}
                {photo.exif.aperture && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">光圈</span>
                    <span className="font-medium">{photo.exif.aperture}</span>
                  </div>
                )}
                {photo.exif.shutterSpeed && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">快门</span>
                    <span className="font-medium">{photo.exif.shutterSpeed}</span>
                  </div>
                )}
                {photo.exif.iso && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">ISO</span>
                    <span className="font-medium">{photo.exif.iso}</span>
                  </div>
                )}
                {photo.exif.focalLength && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">焦距</span>
                    <span className="font-medium">{photo.exif.focalLength}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* 标签 */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">标签</h2>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 评论区 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">评论 ({photo.commentCount})</h2>
        
        {/* 发表评论 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleCommentSubmit} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-sm font-medium">我</span>
              </div>
            </div>
            <div className="flex-grow">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="写下你的评论..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={3}
              ></textarea>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                disabled={!commentContent.trim()}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                发布
              </button>
            </div>
          </form>
        </div>
        
        {/* 评论列表 */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {comment.userId.avatar ? (
                    <Image
                      src={comment.userId.avatar}
                      alt={comment.userId.username}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-sm font-medium">{comment.userId.username.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{comment.userId.username}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mb-3">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{comment.likeCount}</span>
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      回复
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
