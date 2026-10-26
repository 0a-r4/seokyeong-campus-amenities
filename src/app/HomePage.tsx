import { useState } from 'react';
import NoticeBanner from '../components/homePage/NoticeBanner.tsx';
import SearchBar from '../components/homePage/SearchBar.tsx';
import CategoryFilter from '../components/homePage/CategoryFilter.tsx';
import OpenOnlyFilter from '../components/homePage/OpenOnlyFilter.tsx';
import AmenityList from '../components/homePage/AmenityList.tsx';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOpenOnly, setIsOpenOnly] = useState<boolean>(false);

  return (
    <>
      <NoticeBanner />
      <SearchBar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <OpenOnlyFilter
        isOpenOnly={isOpenOnly}
        onToggle={setIsOpenOnly}
      />
      <AmenityList
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        isOpenOnly={isOpenOnly}
      />
    </>
  );
}
