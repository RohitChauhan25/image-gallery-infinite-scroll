import { Camera, Grid3X3, Grid2X2 } from 'lucide-react';

interface HeaderProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  layoutMode: 'masonry' | 'grid';
  onLayoutChange: (mode: 'masonry' | 'grid') => void;
}

export default function Header({
  categories,
  activeCategory,
  onCategoryChange,
  layoutMode,
  onLayoutChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Camera size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Infinite Gallery</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onLayoutChange('masonry')}
                className={`p-2 rounded-md transition-colors ${
                  layoutMode === 'masonry'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Masonry"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => onLayoutChange('grid')}
                className={`p-2 rounded-md transition-colors ${
                  layoutMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Grid"
              >
                <Grid2X2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
