import { Link } from 'react-router-dom';

const itemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  color: '#444444',
  textDecoration: 'none',
  fontSize: '14px',
};

const arrowStyle: React.CSSProperties = {
  color: '#888888',
  fontSize: '14px',
};

export default function Footer() {
  return (
    <footer
      style={{
        padding: '1.5rem 1rem',
        backgroundColor: '#eeeeee',
        marginTop: 'auto',
        borderTop: '1px solid #d4d4d4',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold', color: '#000000', fontSize: '15px' }}>
          서경대학교 편의시설 가이드
        </p>

        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            border: '1px solid #dcdcdc',
            overflow: 'hidden',
          }}
        >
          <a
            href="https://forms.gle/JE9QnVKGMNgtqiDs9"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...itemStyle, borderBottom: '1px solid #e8e8e8' }}
          >
            <span>피드백 및 설문조사</span>
            <span style={arrowStyle}>›</span>
          </a>
          <a
            href="mailto:psw120407@skuniv.ac.kr"
            style={{ ...itemStyle, borderBottom: '1px solid #e8e8e8' }}
          >
            <span>정보 수정 제안 / 문의하기</span>
            <span style={arrowStyle}>›</span>
          </a>
          <a
            href="https://github.com/0a-r4/seokyeong-campus-amenities"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...itemStyle, borderBottom: '1px solid #e8e8e8' }}
          >
            <span>GitHub</span>
            <span style={arrowStyle}>›</span>
          </a>
          <Link to="/privacy" style={itemStyle}>
            <span>개인정보 처리방침</span>
            <span style={arrowStyle}>›</span>
          </Link>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#777777',
            textAlign: 'center',
          }}
        >
          © 2026 서경대 편의시설 가이드. MIT Licensed.
        </p>
      </div>
    </footer>
  );
}

