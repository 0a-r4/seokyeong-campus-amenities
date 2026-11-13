import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isAmenityExist = amenitiesData.some((building) =>
    building.amenities.some(
      (item) => item.id.toLowerCase() === amenitiesId?.toLowerCase()
    )
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

          {isAmenityExist && (
            <div
              style={{
                maxWidth: '320px',
                margin: '1.5rem auto 0',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
              }}
            >
              <a
                href="mailto:psw120407@skuniv.ac.kr"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                <span>정보 수정 제안 / 문의하기</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>›</span>
              </a>
            </div>
          )}
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
            components={{
              img: ({ node: _node, src, alt, ...props }) => {
                const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
                const resolvedSrc =
                  typeof src === 'string' && src.startsWith('/') && !src.startsWith(baseUrl)
                    ? `${baseUrl}${src}`
                    : src;

                return (
                  <img
                    loading="lazy"
                    src={resolvedSrc}
                    alt={alt}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (resolvedSrc) {
                        setSelectedImage(resolvedSrc);
                      }
                    }}
                    {...props}
                  />
                );
              },
            }}
          >
            {markdownContent}
          </ReactMarkdown>

          {isPrivacyPage && <CookieOptOut />}

          <Lightbox
            open={selectedImage !== null}
            close={() => setSelectedImage(null)}
            slides={selectedImage ? [{ src: selectedImage }] : []}
            plugins={[Zoom]}
            controller={{ closeOnBackdropClick: true }}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
          />
        </div>
      )}
    </div>
  );
}



