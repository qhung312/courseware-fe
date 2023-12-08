import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import './index.css';

const Markdown = ({ children, className, ...rest }: ReactMarkdownOptions) => {
  return (
    <ReactMarkdown
      {...rest}
      className={`markdown ${className}`}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
