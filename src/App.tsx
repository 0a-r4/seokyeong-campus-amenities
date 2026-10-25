import Header from './components/layout/Header.tsx';
import SearchBar from './components/layout/SearchBar.tsx';
import CategoryFilter from './components/layout/CategoryFilter.tsx';
import Footer from './components/layout/Footer.tsx';

export default function App() {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Header />
      <SearchBar />
      <CategoryFilter />
      <Footer />
    </div>
  );
}


