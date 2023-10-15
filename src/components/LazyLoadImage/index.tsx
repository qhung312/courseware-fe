import { useState } from 'react';

interface LazyLoadImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  placeHolderSrc: string;
  objectFit?: 'none' | 'contain' | 'cover';
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
    <div className={`${containerClassName} ${className} `}>
      <img
        src={placeHolderSrc}
        alt={`${alt} placeholder`}
        className={`absolute top-0 left-0 z-[8] ${className}`}
        style={{
          objectFit,
          opacity: loading ? 1 : 0,
          filter: loading ? 'blur(10px)' : 'blur(0px)',
          transition: 'all 0.5s ease',
        }}
      />
      <img
        onLoad={() => {
          setLoading(false);
        }}
        src={src}
        alt={alt}
        className={className}
        loading='lazy'
        style={{ objectFit }}
      />
    </div>
  );
};

export default LazyLoadImage;
