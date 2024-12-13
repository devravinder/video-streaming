import { useState, useMemo } from 'react';

export const useVideoFilters = (videos: Video[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | ''>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    videos.forEach(video => {
      video.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        video.title.toLowerCase().includes(searchLower) ||
        video.description?.toLowerCase().includes(searchLower) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchLower));

      // Category filter
      const matchesCategory = !selectedCategory || video.category === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => video.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [videos, searchQuery, selectedCategory, selectedTags]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    availableTags,
    filteredVideos,
  };
};