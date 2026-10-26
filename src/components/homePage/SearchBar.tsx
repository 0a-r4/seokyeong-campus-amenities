import { useState, useRef } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearch }: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchQuery !== undefined ? searchQuery : internalQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = e.target.value;
    if (searchQuery === undefined) {
      setInternalQuery(nextQuery);
    }
    if (onSearch) {
      onSearch(nextQuery);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.focus();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.focus();
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
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
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
        onClick={handleButtonClick}
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
