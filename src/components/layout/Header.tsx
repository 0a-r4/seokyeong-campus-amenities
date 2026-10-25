export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.9rem',
        borderBottom: '1px solid #949494',
      }}
    >
      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bolder',
          margin: 0,
          lineHeight: 'normal',
        }}
      >
        서경대학교 편의시설 가이드
      </p>
    </header>
  );
}

