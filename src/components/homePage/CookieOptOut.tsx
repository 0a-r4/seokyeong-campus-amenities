import { useState, useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-L6WGWDJ774';
const STORAGE_KEY = 'ga_opt_out';

interface CustomWindow extends Window {
  gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
}

function deleteGaCookies(): void {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
    if (name.startsWith('_ga')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      const hostParts = window.location.hostname.split('.');
      for (let i = 0; i < hostParts.length - 1; i++) {
        const domain = hostParts.slice(i).join('.');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      }
    }
  }
}

export default function CookieOptOut() {
  const [isOptedOut, setIsOptedOut] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setIsOptedOut(saved === 'true');
  }, []);

  const handleSetOptOut = (optOut: boolean) => {
    if (optOut === isOptedOut) return;

    const customWin = window as unknown as CustomWindow;
    const gaKey: `ga-disable-${string}` = `ga-disable-${GA_MEASUREMENT_ID}`;

    if (!optOut) {
      localStorage.removeItem(STORAGE_KEY);
      customWin[gaKey] = false;
      if (customWin.gtag) {
        customWin.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
      }
      setIsOptedOut(false);
    } else {
      localStorage.setItem(STORAGE_KEY, 'true');
      customWin[gaKey] = true;
      if (customWin.gtag) {
        customWin.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
      deleteGaCookies();
      setIsOptedOut(true);
    }
  };

  return (
    <div
      style={{
        margin: '1.5rem 0',
        padding: '1rem',
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '14px', color: 'var(--text-primary)' }}>
        쿠키 수집 및 방문 분석 설정
      </p>
      <p style={{ margin: '0 0 0.75rem 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
        현재 상태:{' '}
        <strong style={{ color: isOptedOut ? '#d9534f' : '#2e7d32' }}>
          {isOptedOut ? '수집 거부됨' : '수집 허용됨'}
        </strong>
      </p>
      <div
        role="group"
        aria-label="쿠키 수집 설정 스위치"
        style={{
          display: 'inline-flex',
          border: '1px solid var(--border-input)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <button
          type="button"
          onClick={() => handleSetOptOut(false)}
          style={{
            padding: '0.4rem 0.9rem',
            fontSize: '13px',
            border: 'none',
            borderRight: '1px solid var(--border-input)',
            backgroundColor: !isOptedOut ? 'var(--button-selected-bg)' : 'var(--button-unselected-bg)',
            color: !isOptedOut ? 'var(--button-selected-text)' : 'var(--button-unselected-text)',
            fontWeight: !isOptedOut ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
        >
          허용
        </button>
        <button
          type="button"
          onClick={() => handleSetOptOut(true)}
          style={{
            padding: '0.4rem 0.9rem',
            fontSize: '13px',
            border: 'none',
            backgroundColor: isOptedOut ? 'var(--button-selected-bg)' : 'var(--button-unselected-bg)',
            color: isOptedOut ? 'var(--button-selected-text)' : 'var(--button-unselected-text)',
            fontWeight: isOptedOut ? 'bold' : 'normal',
            cursor: 'pointer',
          }}
        >
          거부
        </button>
      </div>
    </div>
  );
}
