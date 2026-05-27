import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Import CSS wajib dari KaTeX agar rumusnya rapi
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
}

export default function MathRenderer({ content }: MathRendererProps) {
  return (
    // Pengaturan styling dasar agar teks dan spasi antar paragrafnya rapi
    <div className="text-slate-200 leading-relaxed space-y-4 text-[15px]">
      <ReactMarkdown 
        remarkPlugins={[remarkMath]} 
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}