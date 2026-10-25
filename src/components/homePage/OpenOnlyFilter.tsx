import { useState } from 'react';

interface OpenOnlyFilterProps {
  isOpenOnly?: boolean;
  onToggle?: (isOpenOnly: boolean) => void;
}

export default function OpenOnlyFilter({
  isOpenOnly,
  onToggle,
}: OpenOnlyFilterProps) {
  const [internalIsOpenOnly, setInternalIsOpenOnly] = useState<boolean>(false);
  const isChecked = isOpenOnly ?? internalIsOpenOnly;

  const handleToggle = () => {
    const nextState = !isChecked;
    setInternalIsOpenOnly(nextState);
    if (onToggle) {
      onToggle(nextState);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0rem 1rem 0.8rem 1rem',
        gap: '0.5rem',
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: '36px',
          height: '20px',
          padding: 0,
          borderRadius: '9999px',
          border: 'none',
          backgroundColor: isChecked ? '#333' : '#e0e0e0',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '2px',
            top: '2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            transform: isChecked ? 'translateX(16px)' : 'translateX(0)',
            transition: 'transform 0.2s',
          }}
        />
      </button>

      <span
        onClick={handleToggle}
        style={{
          fontSize: '13px',
          color: '#333',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        현재 운영 중인 시설만 보기
      </span>
    </div>
  );
}
