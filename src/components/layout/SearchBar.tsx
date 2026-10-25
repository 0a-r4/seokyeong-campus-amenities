import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '0.8rem 1rem',
        padding: '0.4rem 0.6rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="편의시설 검색..."
        aria-label="편의시설 검색"
        style={{
          flex: 1,
          padding: '0.3rem 0.5rem',
          fontSize: '14px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
        }}
      />

      <button
        type="submit"
        aria-label="검색"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.3rem',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        }}
      >
        <MdSearch size="1.4rem" />
      </button>
    </form>
  );
}


