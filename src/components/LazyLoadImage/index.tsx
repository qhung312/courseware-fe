import { useState } from 'react';

import './index.css';

interface LazyLoadImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  placeHolderSrc: string;
  objectFit?: 'none' | 'contain' | 'cover' | 'fill' | 'scale-down';
}

const LazyLoadImage = ({
  src,
  alt,
  containerClassName,
  className,
  placeHolderSrc,
  objectFit = 'none',
}: LazyLoadImageProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`relative flex h-full flex-row ${containerClassName}`}>
      <img
        src={placeHolderSrc}
        alt={`${alt} placeholder`}
        className={`full ${loading ? 'z-1' : '-z-10'} ${className}`}
        style={{
          objectFit,
          opacity: loading ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: loading ? 1 : -1,
        }}
      />
      <img
        onLoad={() => {
          setLoading(false);
        }}
        src={src}
        alt={alt}
        className={`full relative -ml-[100%] ${loading ? '-z-10' : 'z-1'} ${className}`}
        loading='lazy'
        style={{
          objectFit,
          opacity: loading ? 0 : 1,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
};

export default LazyLoadImage;
