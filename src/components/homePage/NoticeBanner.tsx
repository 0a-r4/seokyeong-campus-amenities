import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

export default function NoticeBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('dismiss_notice_banner');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('dismiss_notice_banner', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff3cd',
        color: '#664d03',
        borderBottom: '1px solid #ffe69c',
        padding: '0.625rem 1rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        lineHeight: 1.4,
      }}
    >
      <span style={{ wordBreak: 'keep-all', marginRight: '0.5rem' }}>
        본 사이트는 비공식 가이드입니다. 최신 정보를 반영하려 노력하고 있으나, 오차가 있을 수 있으니 참고용으로 활용해 주세요.
      </span>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="안내 배너 닫기"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#664d03',
          flexShrink: 0,
        }}
      >
        <MdClose size={18} />
      </button>
    </aside>
  );
}
