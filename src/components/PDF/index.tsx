import { useState } from 'react';
import { Document, Page } from 'react-pdf';

import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

interface PDFProps {
  url?: string | URL;
  renderMode?: 'canvas' | 'svg' | 'none';
  className?: string;
}

const PDF: React.FC<PDFProps> = ({ url, renderMode, className }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const [numPages, setNumPages] = useState(1);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
    setNumPages(nextNumPages);
  };

  return (
    <Document
      className={`${className}`}
      options={options}
      renderMode={renderMode || 'canvas'}
      file={{
        url: typeof url === 'string' ? new URL(url) : url,
        httpHeaders: {
          authorization: `Bearer ${JSON.parse(token)}`,
        },
      }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (_el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={false}
          renderInteractiveForms={false}
          renderAnnotationLayer={false}
        />
      ))}
    </Document>
  );
};

export default PDF;
