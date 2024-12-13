import { mockVideos } from '../data/mockVideos';

let videos = [...mockVideos];

export const videoService = {
  getVideos: async (): Promise<Video[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(videos), 500);
    });
  },

  uploadVideo: async (video: Omit<Video, 'id' | 'uploadedAt'>): Promise<Video> => {
    return new Promise((resolve) => {
      const newVideo: Video = {
        ...video,
        id: Math.random().toString(36).substr(2, 9),
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      videos = [newVideo, ...videos];
      setTimeout(() => resolve(newVideo), 1000);
    });
  }
};