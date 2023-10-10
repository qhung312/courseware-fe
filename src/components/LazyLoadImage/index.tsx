import { useState } from 'react';

interface LazyLoadImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
  placeHolderSrc: string;
}

const LazyLoadImage = ({
  src,
  alt,
  containerClassName,
  className,
  placeHolderSrc,
}: LazyLoadImageProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={containerClassName}>
      <img
        src={placeHolderSrc}
        alt={`${alt} placeholder`}
        className={`absolute top-0 left-0 z-[1] ${className}`}
        style={{
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
        alt={`${alt} placeholder`}
        className={className}
      />
    </div>
  );
};

export default LazyLoadImage;
