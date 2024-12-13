 type VideoCategory = 'education' | 'entertainment' | 'gaming' | 'music' | 'sports' | 'technology' | 'other';

 type VideoPrivacy = 'public' | 'private';

 interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  uploadedAt: string;
  source: 'youtube' | 'local' | 'external';
  category: VideoCategory;
  tags: string[];
  privacy: VideoPrivacy;
  description?: string;
}