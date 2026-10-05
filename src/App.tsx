import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import 'github-markdown-css/github-markdown-light.css';
import './markdown-custom.css';

import markdownDocument from './data/bodys/seokyeong-sporex.md?raw';

export default function App() {
  return (
    <div
      className="markdown-body"
      style={{
        padding: '12px',
        maxWidth: '800px',
        margin: '0 auto'
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {markdownDocument}
      </ReactMarkdown>
    </div>
  );
}