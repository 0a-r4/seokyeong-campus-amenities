import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import 'github-markdown-css/github-markdown-light.css';
import './markdown-custom.css';

import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

import amenities from './data/amenities.json';

export default function App() {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}
    >
      <Header />

      <div
        className="markdown-body"
        style={{
          padding: '12px',
          margin: '0 auto',
          marginBottom: '1rem',
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {markdownDocument}
        </ReactMarkdown>
      </div>

      <Footer />
    </div>
  );
}