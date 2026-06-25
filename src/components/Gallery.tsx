import { useState, useEffect, useCallback } from 'react';
import { supabase, type Image } from '../lib/supabase';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import SkeletonCard from './SkeletonCard';
import { Loader2 } from 'lucide-react';

const PAGE_SIZE = 12;

interface GalleryProps {
  activeCategory: string | null;
  layoutMode: 'masonry' | 'grid';
}

export default function Gallery({ activeCategory, layoutMode }: GalleryProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchImages = useCallback(async (currentPage: number, category: string | null) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false })
        .range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error: err } = await query;

      if (err) throw err;

      if (currentPage === 0) {
        setImages(data || []);
      } else {
        setImages((prev) => [...prev, ...(data || [])]);
      }

      setHasMore((data || []).length === PAGE_SIZE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, activeCategory);
  }, [loading, hasMore, page, activeCategory, fetchImages]);

  const { setTargetRef } = useInfiniteScroll(loadMore, hasMore);

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setImages([]);
    fetchImages(0, activeCategory);
  }, [activeCategory, fetchImages]);

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => {
              setPage(0);
              fetchImages(0, activeCategory);
            }}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0 && !loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">No images found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        className={
          layoutMode === 'masonry'
            ? 'columns-1 sm:columns-2 lg:columns-3 gap-4'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
        }
      >
        {images.map((image) => {
          return image && <ImageCard key={image.id} image={image} onClick={setSelectedImage} />;
        })}
        {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
      </div>

      <div ref={setTargetRef} className="h-20 flex items-center justify-center">
        {loading && hasMore && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading more...</span>
          </div>
        )}
        {!hasMore && images.length > 0 && <p className="text-sm text-gray-400">No more images</p>}
      </div>

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
