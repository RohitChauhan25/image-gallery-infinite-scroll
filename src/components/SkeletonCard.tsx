export default function SkeletonCard() {
  return (
    <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-gray-100 animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
