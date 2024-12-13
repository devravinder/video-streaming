import {  X } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, onClose }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-full max-w-5xl bg-black rounded-lg overflow-hidden">
        <div className="relative rounded-lg p-10">
          <video
            src={url}
            className="w-full rounded-lg aspect-video"
            controls={true}
            autoPlay={false}
          />
          <div className="absolute bottom-4 inset-x-0 flex flex-row items-center justify-center text-white">
            <div className="">{title}</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-blue-400"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};