import { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';

const CATEGORIES = ['nature', 'architecture', 'travel', 'people'];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid'>('masonry');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        layoutMode={layoutMode}
        onLayoutChange={setLayoutMode}
      />
      <main>
        <Gallery activeCategory={activeCategory} layoutMode={layoutMode} />
      </main>
    </div>
  );
}
