import { useState } from 'react';
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

  const handleSelect = (id: string) => {
    setInternalCategory(id);
    if (onSelectCategory) {
      onSelectCategory(id);
    }
  };

  return (
    <nav aria-label="카테고리 필터">
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          gap: '0.5rem',
          padding: '0rem 1rem 1rem 1rem',
          WebkitOverflowScrolling: 'touch',
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
    </nav>
  );
}
