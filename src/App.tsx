import { useState } from 'react';
import Header from './components/layout/Header.tsx';
import NoticeBanner from './components/homePage/NoticeBanner.tsx';
import SearchBar from './components/homePage/SearchBar.tsx';
import CategoryFilter from './components/homePage/CategoryFilter.tsx';
import OpenOnlyFilter from './components/homePage/OpenOnlyFilter.tsx';
import AmenityList from './components/homePage/AmenityList.tsx';
import Footer from './components/layout/Footer.tsx';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Header />
      <NoticeBanner />
      <SearchBar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <OpenOnlyFilter />
      <AmenityList
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
      <Footer />
    </div>
  );
}






