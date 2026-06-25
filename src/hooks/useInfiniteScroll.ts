import { useEffect, useRef, useState, useCallback } from 'react';

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const setTargetRef = useCallback((node: HTMLDivElement | null) => {
    targetRef.current = node;
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && hasMore) {
          callback();
        }
      },
      { rootMargin: '400px' }
    );

    observerRef.current.observe(targetRef.current);
    return () => observerRef.current?.disconnect();
  }, [callback, hasMore]);

  return { setTargetRef, isIntersecting };
}
