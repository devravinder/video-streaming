import { useEffect, useState } from 'react';
import { VideoList } from './components/VideoList';
import { VideoUpload } from './components/VideoUpload';
import { VideoFilters } from './components/VideoFilters';
import { videoService } from './services/videoService';
import { VideoIcon, UploadCloud, LayoutGrid } from 'lucide-react';
import { useVideoFilters } from './hooks/useVideoFilters';

function App() {
  const [upload, setUpload] = useState(false)
  const [videos, setVideos] = useState<Video[]>([]);
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    availableTags,
    filteredVideos,
  } = useVideoFilters(videos);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const fetchedVideos = await videoService.getVideos();
    setVideos(fetchedVideos);
  };

  const handleUpload = async (videoData: Omit<Video, 'id' | 'uploadedAt'>) => {
    await videoService.uploadVideo(videoData);
    await loadVideos();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="relative flex items-center justify-center">
          <VideoIcon className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
          <div onClick={() => setUpload(!upload)} className="cursor-pointer absolute inset-y-0 right-4 flex flex-row items-center gap-4 ">
            {upload ?
              <LayoutGrid className="h-6 w-6 text-blue-600 mr-2" /> : <UploadCloud className="h-6 w-6 text-blue-600 mr-2" />}
          </div>
        </div>

        {upload ? <VideoUpload onUpload={handleUpload} />
          :
          <>
            <VideoFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              availableTags={availableTags}
            />

            <div className="">
              <h2 className="text-2xl font-bold text-gray-800">Your Videos</h2>
              <p className="text-gray-600">
                Showing {filteredVideos.length} of {videos.length} videos
              </p>
            </div>
            <VideoList videos={filteredVideos} />
          </>
        }
      </div>
    </div>
  );
}

export default App;