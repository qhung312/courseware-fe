import { throttle } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';

import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
  const [numPages, setNumPages] = useState(1);
  const [width, setWidth] = useState<number | undefined>();

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
    setNumPages(nextNumPages);
  };
  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  const setWrapperSize = () => {
    setWidth(pdfWrapperRef.current?.offsetWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', throttle(setWrapperSize, 300));

    return () => {
      window.removeEventListener('resize', throttle(setWrapperSize, 300));
    };
  }, []);

  useLayoutEffect(() => {
    if (pdfWrapperRef.current) {
      setWidth(pdfWrapperRef?.current.offsetWidth);
    }
  }, []);

  return (
    <div className='w-full' ref={pdfWrapperRef}>
      {width && (
        <Document
          className={`${className || ''}`}
          options={options}
          renderMode={renderMode || 'svg'}
          error={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
          loading={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
          file={{
            url: typeof url === 'string' ? new URL(url) : url,
            // httpHeaders: {
            //   authorization: `Bearer ${JSON.parse(token || '""')}`,
            // },
          }}
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
