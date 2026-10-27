import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext.tsx';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.9rem',
        borderBottom: '1px solid var(--border-strong)',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bolder',
          margin: 0,
          lineHeight: 'normal',
          color: 'var(--text-primary)',
        }}
      >
        서경대학교 편의시설 가이드
      </p>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: '1px solid var(--border-input)',
          borderRadius: '4px',
          padding: '0.4rem',
          cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
      >
        {isDark ? <MdLightMode size="1.25rem" /> : <MdDarkMode size="1.25rem" />}
      </button>
    </header>
  );
}


