import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';

import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  httpHeaders: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`,
  },
};

interface PDFProps {
  url: string | URL;
  renderMode?: 'canvas' | 'svg' | 'none';
  className?: string;
  pageClassName?: string;
}

const PDF: React.FC<PDFProps> = ({ url, renderMode, className, pageClassName }) => {
  const [numPages, setNumPages] = useState(1);
  const file = useMemo(() => ({ url: typeof url === 'string' ? new URL(url) : url }), [url]);
  const [width, setWidth] = useState<number | undefined>();

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
    setNumPages(nextNumPages);
  };
  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  const setWrapperSize = () => {
    setWidth(pdfWrapperRef.current?.clientWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', debounce(setWrapperSize, 700));

    return () => {
      window.removeEventListener('resize', debounce(setWrapperSize, 700));
    };
  }, []);

  useEffect(() => {
    if (pdfWrapperRef.current) {
      setWrapperSize();
    }
  }, [pdfWrapperRef.current?.clientWidth]);

  return (
    <div id='pdfWrapperRef' className='w-full' ref={pdfWrapperRef}>
      {width && (
        <Document
          className={`${className || ''}`}
          options={options}
          renderMode={renderMode || 'svg'}
          error={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
          loading={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_el, index) => (
            <Page
              width={width}
              className={`${pageClassName}`}
              loading={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={true}
              renderInteractiveForms={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      )}
    </div>
  );
};

export default PDF;
