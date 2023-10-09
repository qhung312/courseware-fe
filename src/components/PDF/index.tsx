import { throttle } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';

import 'react-pdf/dist/esm/Page/TextLayer.css';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

interface PDFProps {
  url: string | URL;
  renderMode?: 'canvas' | 'svg' | 'none';
  className?: string;
  pageClassName?: string;
}

const PDF: React.FC<PDFProps> = ({ url, renderMode, className, pageClassName }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);

  const [numPages, setNumPages] = useState(1);
  const [width, setWidth] = useState<number | undefined>();

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
    setNumPages(nextNumPages);
  };
  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  const setWrapperSize = () => {
    setWidth(document.getElementById('pdfWrapper')?.clientWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', throttle(setWrapperSize, 300));

    return window.removeEventListener('resize', throttle(setWrapperSize, 300));
  }, []);

  return (
    <div className='w-full' id='pdfWrapper' ref={pdfWrapperRef}>
      <Document
        className={`${className || ''}`}
        options={options}
        renderMode={renderMode || 'svg'}
        error={<Skeleton borderRadius={0} height='100vh' />}
        loading={<Skeleton borderRadius={0} height='100vh' />}
        file={{
          url: typeof url === 'string' ? new URL(url) : url,
          httpHeaders: {
            authorization: `Bearer ${JSON.parse(token || '""')}`,
          },
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_el, index) => (
          <Page
            width={width}
            className={`${pageClassName}`}
            loading={<Skeleton borderRadius={0} height='100vh' />}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={true}
            renderInteractiveForms={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};

export default PDF;
