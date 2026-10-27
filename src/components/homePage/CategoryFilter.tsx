import { useEffect, useRef, useState } from 'react';
import categories from '../../data/categories.json';

interface CategoryFilterProps {
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const activeCategory = selectedCategory ?? internalCategory;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleSelect = (id: string) => {
    const nextCategory = activeCategory === id ? 'all' : id;
    setInternalCategory(nextCategory);
    if (onSelectCategory) {
      onSelectCategory(nextCategory);
    }
  };

  return (
    <nav aria-label="카테고리 필터" style={{ position: 'relative' }}>
      <style>{`
        .category-filter-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        ref={scrollRef}
        className="category-filter-scroll"
        style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          gap: '0.5rem',
          padding: '0rem 1rem 0.9rem 1rem',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat.id)}
              aria-pressed={isSelected}
              style={{
                flexShrink: 0,
                padding: '0.4rem 0.8rem',
                fontSize: '13px',
                borderRadius: '4px',
                border: isSelected ? '1px solid #333' : '1px solid #ccc',
                backgroundColor: isSelected ? '#333' : '#f5f5f5',
                color: isSelected ? '#fff' : '#333',
                cursor: 'pointer',
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      {canScrollLeft && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: '0.9rem',
            width: '16px',
            background: 'linear-gradient(to right, #fff, rgba(255, 255, 255, 0))',
            pointerEvents: 'none',
          }}
        />
      )}
      {canScrollRight && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: '0.9rem',
            width: '16px',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0), #fff)',
            pointerEvents: 'none',
          }}
        />
      )}
    </nav>
  );
}
