import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Document, Outline, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';
import './index.css';

import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  httpHeaders: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') || '{}')}`,
  },
};

interface PDFProps {
  url: string | URL;
  renderMode?: 'canvas' | 'svg' | 'none';
  className?: string;
  pageClassName?: string;
  title?: string;
}

const PDF: React.FC<PDFProps> = ({ url, renderMode, className, pageClassName, title }) => {
  const [numPages, setNumPages] = useState(1);
  const file = useMemo(() => ({ url: typeof url === 'string' ? new URL(url) : url }), [url]);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState<number | undefined>();
  const [isShowOutline, setIsShowOutline] = useState(false);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: any) => {
    setNumPages(nextNumPages);
  };
  const pdfWrapperRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<HTMLDivElement[]>([]);

  const onItemClick = ({ pageNumber }: { pageNumber: string }) => {
    pageRefs.current[parseInt(pageNumber)].scrollIntoView();
  };

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
    <div
      id='pdfWrapperRef'
      className='flex w-full flex-col gap-y-1 bg-[#666666] text-xs font-medium text-white lg:text-sm 3xl:text-base'
      ref={pdfWrapperRef}
    >
      <div className='flex w-full flex-1 items-center justify-between bg-[#4D4D4D] p-1 md:p-2 xl:p-3 2xl:p-4'>
        <div className='flex flex-row gap-x-2 text-white lg:p-3 3xl:p-5'>
          <button type='button' onClick={() => setIsShowOutline(!isShowOutline)}>
            Show Outline
          </button>
          <span className='whitespace-nowrap'>{title ? `${title}.pdf` : ''}</span>
        </div>
        <div className='flex flex-row-reverse'>
          <button type='button' onClick={() => setZoom(zoom + 0.1)} className='p-1 lg:p-3 3xl:p-5'>
            Zoom in
          </button>
          <button type='button' onClick={() => setZoom(zoom - 0.1)} className='p-1 lg:p-3 3xl:p-5'>
            Zoom out
          </button>
        </div>
      </div>
      {width && (
        <Document
          className={`flex h-[400px] flex-row justify-between md:h-[600px] lg:h-[800px] 2xl:h-[1000px] ${
            className || ''
          }`}
          options={options}
          renderMode={renderMode || 'svg'}
          error={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
          loading={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onItemClick={onItemClick}
        >
          {isShowOutline && <Outline className='outline' onItemClick={onItemClick} />}
          <div className='flex h-full w-full flex-col items-center gap-y-1 overflow-auto lg:gap-y-2 2xl:h-[1000px] 2xl:gap-y-3 '>
            {Array.from(new Array(numPages), (_el, index) => (
              <Page
                width={width * 0.8}
                className={pageClassName}
                loading={<Skeleton baseColor='#9DCCFF' borderRadius={0} height='100vh' />}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={true}
                renderInteractiveForms={false}
                renderAnnotationLayer={false}
                scale={zoom}
              />
            ))}
          </div>
        </Document>
      )}
    </div>
  );
};

export default PDF;
