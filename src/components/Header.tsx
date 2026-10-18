import { Link } from 'react-router-dom';
import homeIcon from '../assets/homeIcon.svg';

export default function Header() {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '9px', borderBottom: '1px solid #ccc' }}>
        <p style={{ fontSize: '17px', fontWeight: 'bolder' }}>서경대학교 편의시설 가이드</p>
        <nav>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
            <li>
                <Link to="/">
                    <img
                        src={homeIcon}
                        alt="홈"
                        style={{ width: '24px', height: '24px', display: 'block' }}
                    />
                </Link>
            </li>
            </ul>
        </nav>
        </header>
    );
}