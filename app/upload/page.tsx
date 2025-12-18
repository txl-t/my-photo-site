'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  title?: string;
  description?: string;
  tags?: string[];
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).slice(0, 9 - files.length).map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        tags: []
      }));
      
      setFiles([...files, ...newFiles]);
    }
  };

  // 处理拖拽
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).slice(0, 9 - files.length).map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        tags: []
      }));
      
      setFiles([...files, ...newFiles]);
    }
  };

  // 删除文件
  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  // 更新文件信息
  const handleFileInfoChange = (id: string, field: keyof UploadedFile, value: any) => {
    setFiles(files.map(file => {
      if (file.id === id) {
        return { ...file, [field]: value };
      }
      return file;
    }));
  };

  // 添加标签
  const handleAddTag = (id: string, tag: string) => {
    if (tag.trim() && tag.length <= 20) {
      setFiles(files.map(file => {
        if (file.id === id) {
          const tags = [...(file.tags || [])];
          if (!tags.includes(tag.trim())) {
            tags.push(tag.trim());
          }
          return { ...file, tags };
        }
        return file;
      }));
    }
  };

  // 删除标签
  const handleDeleteTag = (fileId: string, tag: string) => {
    setFiles(files.map(file => {
      if (file.id === fileId) {
        return { 
          ...file, 
          tags: file.tags?.filter(t => t !== tag) || [] 
        };
      }
      return file;
    }));
  };

  // 提交上传
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 调用上传API
      const token = localStorage.getItem('token');
      
      for (const file of files) {
        const formData = new FormData();
        formData.append('title', file.title || '');
        formData.append('description', file.description || '');
        formData.append('tags', JSON.stringify(file.tags || []));
        formData.append('image', file.file);
        
        await fetch('http://localhost:5000/api/photos', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });
      }
      
      // 重置表单
      setFiles([]);
      setStep(1);
      
      // 显示成功消息或跳转到其他页面
      alert('照片上传成功！');
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">上传照片</h1>
      
      {/* 上传步骤指示器 */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {step >= 1 ? <FontAwesomeIcon icon={faCheck} /> : '1'}
          </div>
          <div className={`flex-grow h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {step >= 2 ? <FontAwesomeIcon icon={faCheck} /> : '2'}
          </div>
          <div className={`flex-grow h-1 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {step >= 3 ? <FontAwesomeIcon icon={faCheck} /> : '3'}
          </div>
        </div>
      </div>
      
      {/* 第一步：选择照片 */}
      {step === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">选择照片（最多9张）</h2>
          
          {/* 拖拽区域 */}
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <FontAwesomeIcon icon={faCamera} size="3x" className="text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">拖拽照片到这里或点击选择</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">支持JPG、PNG、WebP格式，每张不超过50MB</p>
          </div>
          
          {/* 已选择的照片 */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">已选择 {files.length}/9 张</h3>
              <div className="grid grid-cols-3 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="relative group">
                    <Image
                      src={file.preview}
                      alt={file.file.name}
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <FontAwesomeIcon icon={faTimes} size="xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 下一步按钮 */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setStep(2)}
              disabled={files.length === 0}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              下一步
            </button>
          </div>
        </div>
      )}
      
      {/* 第二步：填写信息 */}
      {step === 2 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">填写照片信息</h2>
          
          {/* 照片信息表单 */}
          <div className="space-y-6">
            {files.map((file) => (
              <div key={file.id} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* 照片预览 */}
                  <div className="md:w-1/4">
                    <Image
                      src={file.preview}
                      alt={file.file.name}
                      width={150}
                      height={150}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* 信息填写 */}
                  <div className="md:w-3/4 space-y-4">
                    {/* 标题 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标题</label>
                      <input
                        type="text"
                        placeholder="限30字"
                        maxLength={30}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        onChange={(e) => handleFileInfoChange(file.id, 'title', e.target.value)}
                      />
                    </div>
                    
                    {/* 描述 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label>
                      <textarea
                        placeholder="限300字"
                        maxLength={300}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        onChange={(e) => handleFileInfoChange(file.id, 'description', e.target.value)}
                      ></textarea>
                    </div>
                    
                    {/* 标签 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">标签</label>
                      <div className="flex space-x-2 mb-2">
                        {file.tags?.map((tag, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                            <span className="text-sm">{tag}</span>
                            <button
                              onClick={() => handleDeleteTag(file.id, tag)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              <FontAwesomeIcon icon={faTimes} size="xs" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="添加标签（回车确认）"
                          maxLength={20}
                          className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag(file.id, (e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 步骤导航按钮 */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              返回
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            >
              下一步
            </button>
          </div>
        </div>
      )}
      
      {/* 第三步：确认并上传 */}
      {step === 3 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">确认并上传</h2>
          
          {/* 上传前预览 */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">照片预览</h3>
              <div className="grid grid-cols-3 gap-4">
                {files.map((file) => (
                  <div key={file.id}>
                    <Image
                      src={file.preview}
                      alt={file.file.name}
                      width={150}
                      height={150}
                      className="w-full aspect-square object-cover rounded-lg mb-2"
                    />
                    {file.title && (
                      <p className="text-sm font-medium truncate">{file.title}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
              <h3 className="text-lg font-medium mb-4">上传设置</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" value="public" name="visibility" className="sr-only peer" defaultChecked />
                    <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded-full peer peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors duration-200"></div>
                    <span className="ml-2 text-sm font-medium">公开</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" value="private" name="visibility" className="sr-only peer" />
                    <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded-full peer peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors duration-200"></div>
                    <span className="ml-2 text-sm font-medium">私密</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* 上传按钮 */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              返回
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? '上传中...' : '确认上传'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
