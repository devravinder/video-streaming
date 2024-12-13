import React from 'react';
import { categories } from '../data/categories';
import { Search, Filter } from 'lucide-react';
import { TagChip } from './TagChip';

interface VideoFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: VideoCategory | '';
  setSelectedCategory: (category: VideoCategory | '') => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
}

export const VideoFilters: React.FC<VideoFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
  availableTags,
}) => {
  const handleTagClick = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Filter className="inline-block w-4 h-4 mr-1" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as VideoCategory | '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                active={selectedTags.includes(tag)}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};