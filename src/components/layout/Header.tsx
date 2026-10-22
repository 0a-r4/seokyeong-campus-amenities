import { Link } from 'react-router-dom';
import homeIcon from '../assets/homeIcon.svg';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem',
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
      <nav>
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={homeIcon}
                alt="홈"
                style={{ width: '2rem', height: '2rem', display: 'block' }}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}