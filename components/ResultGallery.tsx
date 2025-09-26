
import React from 'react';
import type { GeneratedImage } from '../types';
import { EyeIcon, DownloadIcon, TrashIcon } from './icons';

interface ResultGalleryProps {
  images: GeneratedImage[];
  onPreview: (src: string) => void;
  onDelete: (id: string) => void;
}

const ImageCard: React.FC<{ image: GeneratedImage; onPreview: (src: string) => void; onDelete: (id: string) => void; }> = ({ image, onPreview, onDelete }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `consistent-image-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="relative group aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg">
      <img src={image.src} alt="Generated result" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
        <button onClick={() => onPreview(image.src)} className="p-3 bg-slate-100/20 rounded-full hover:bg-slate-100/30 backdrop-blur-sm transition">
          <EyeIcon className="w-6 h-6 text-white" />
        </button>
        <button onClick={handleDownload} className="p-3 bg-slate-100/20 rounded-full hover:bg-slate-100/30 backdrop-blur-sm transition">
          <DownloadIcon className="w-6 h-6 text-white" />
        </button>
        <button onClick={() => onDelete(image.id)} className="p-3 bg-red-500/50 rounded-full hover:bg-red-500/70 backdrop-blur-sm transition">
          <TrashIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};


export const ResultGallery: React.FC<ResultGalleryProps> = ({ images, onPreview, onDelete }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-5 h-full">
      <h2 className="text-xl font-semibold mb-4 text-sky-300">Kết quả</h2>
      {images.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100%-2rem)] text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
          <p>Hình ảnh được tạo sẽ xuất hiện ở đây.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
          {images.map(img => (
            <ImageCard key={img.id} image={img} onPreview={onPreview} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
