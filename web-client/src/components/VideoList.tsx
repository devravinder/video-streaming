import React from 'react';
import { VideoCard } from './VideoCard';

interface VideoListProps {
  videos: Video[];
}

export const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No videos found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};