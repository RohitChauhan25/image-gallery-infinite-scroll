import { useEffect, useState } from 'react';
import { X, User, Calendar, ArrowUpRight } from 'lucide-react';
import type { Image } from '../lib/supabase';

interface ImageModalProps {
  image: Image | null;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (image) {
      setLoaded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [image]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative bg-gray-100">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={image.url}
            alt={image.title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-auto max-h-[65vh] object-contain transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{image.title}</h2>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <User size={16} />
                  <span>{image.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>{new Date(image.created_at).toLocaleDateString()}</span>
                </div>
                <span className="capitalize bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
            <a
              href={image.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View Original
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            {image.width} x {image.height} px
          </div>
        </div>
      </div>
    </div>
  );
}
