import React, { useState } from 'react';
import { Lock, Play } from 'lucide-react';
import { categories } from '../data/categories';
import { TagChip } from './TagChip';
import { VideoPlayer } from './VideoPlayer';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const categoryLabel = categories.find(cat => cat.value === video.category)?.label;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
          />
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-black bg-opacity-50 rounded-full p-3">
              <Play className="w-8 h-8 text-white" />
            </div>
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {video.title}
            </h3>
            <div className="flex items-center space-x-2">
              {video.privacy === 'private' && (
                <Lock className="w-4 h-4 text-gray-600" />
              )}
            </div>
          </div>
          
          {video.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{video.description}</p>
          )}
          
          <div className="mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {categoryLabel}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {video.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Uploaded on {video.uploadedAt}</p>
            <button
              onClick={() => setIsPlaying(true)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              Watch
              <Play className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {isPlaying && (
        <VideoPlayer
          url={video.url}
          title={video.title}
          onClose={() => setIsPlaying(false)}
        />
      )}
    </>
  );
};