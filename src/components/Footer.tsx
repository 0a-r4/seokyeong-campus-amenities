const linkStyle = {
  color: '#555',
  textDecoration: 'none',
};

export default function Footer() {
  return (
    <footer
      style={{
        padding: '1.2rem',
        backgroundColor: '#e4e4e4',
        fontSize: '14px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold', color: '#000000' }}>
          서경대학교 편의시설 가이드
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <a
            href="https://forms.gle/JE9QnVKGMNgtqiDs9"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            피드백 및 설문조사
          </a>
          <a href="mailto:psw120407@skuniv.ac.kr" style={linkStyle}>
            문의하기
          </a>
          <a
            href="https://github.com/0a-r4/seokyeong-campus-amenities"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}