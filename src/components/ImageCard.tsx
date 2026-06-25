import { useState } from 'react';
import { User } from 'lucide-react';
import type { Image } from '../lib/supabase';

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const aspectRatio = image.height / image.width;
  const minHeight = Math.max(180, Math.round(300 * aspectRatio));

  return (
    <div
      className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden" style={{ minHeight: `${minHeight}px` }}>
        {!loaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
        <img
          src={image?.thumbnail_url}
          alt={image.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 text-white/90 text-sm">
            <User size={14} />
            <span className="truncate">{image.author}</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-gray-900 truncate">{image.title}</p>
        <span className="inline-block mt-1.5 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full capitalize">
          {image.category}
        </span>
      </div>
    </div>
  );
}
