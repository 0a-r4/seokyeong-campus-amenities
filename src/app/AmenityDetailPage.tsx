import { Link, Navigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import amenitiesData from '../data/amenities.json';
import CookieOptOut from '../components/homePage/CookieOptOut.tsx';
import '../markdown-custom.css';

const markdownModules = import.meta.glob<string>('../data/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export default function AmenityDetailPage() {
  const { amenitiesId } = useParams<{ amenitiesId: string }>();

  const isAmenityExist = amenitiesData.some(
    (item) => item.id.toLowerCase() === amenitiesId?.toLowerCase()
  );

  const targetEntry = Object.entries(markdownModules).find(([path]) => {
    const filename = path.split('/').pop()?.replace(/\.md$/, '');
    return filename?.toLowerCase() === amenitiesId?.toLowerCase();
  });

  if (!isAmenityExist && !targetEntry) {
    return <Navigate to="/" replace />;
  }

  const markdownContent = targetEntry ? targetEntry[1] : null;
  const isPrivacyPage = amenitiesId?.toLowerCase() === 'privacy';

  return (
    <div>
      <div style={{ padding: '0.7rem 0.9rem 0' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1rem',
            border: '1px solid var(--link-border)',
            borderRadius: '4px',
            backgroundColor: 'var(--link-bg)',
            textDecoration: 'none',
            color: 'var(--link-color)',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          <MdArrowBack size="1.3rem" />
          <span>홈으로 돌아가기</span>
        </Link>
      </div>

      {!markdownContent ? (
        <div
          style={{
            padding: '2rem 1rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '14px',
          }}
        >
          <p>
            {isPrivacyPage
              ? '개인정보 처리방침을 찾을 수 없습니다.'
              : '편의시설 정보를 찾을 수 없습니다.'}
          </p>
        </div>
      ) : (
        <div
          className="markdown-body"
          style={{
            padding: '0.9rem',
            backgroundColor: 'transparent',
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdownContent}
          </ReactMarkdown>

          {isPrivacyPage && <CookieOptOut />}
        </div>
      )}
    </div>
  );
}



