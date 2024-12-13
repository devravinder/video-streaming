import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Loader2, Tag } from 'lucide-react';
import { categories } from '../data/categories';

interface VideoUploadProps {
  onUpload: (video: {
    title: string;
    url: string;
    thumbnail: string;
    source: 'youtube' | 'local' | 'external';
    category: VideoCategory;
    tags: string[];
    privacy: VideoPrivacy;
    description?: string;
  }) => Promise<void>;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<VideoCategory>('other');
  const [tags, setTags] = useState('');
  const [privacy, setPrivacy] = useState<VideoPrivacy>('public');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    setIsLoading(true);
    try {
      const source = url.includes('youtube.com') ? 'youtube' : 'external';
      const thumbnail = `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=400`;
      await onUpload({
        title,
        url,
        thumbnail,
        source,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        privacy,
        description,
      });
      setTitle('');
      setUrl('');
      setDescription('');
      setCategory('other');
      setTags('');
      setPrivacy('public');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Upload Video</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Video Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter video title"
            required
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Video URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video URL or YouTube link"
              required
            />
            <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Enter video description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as VideoCategory)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="privacy" className="block text-sm font-medium text-gray-700 mb-1">
              Privacy
            </label>
            <select
              id="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value as VideoPrivacy)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="relative">
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tags separated by commas"
            />
            <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Upload Video
            </>
          )}
        </button>
      </div>
    </form>
  );
};