import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
  const placeholderRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const mergedContainerClassName = twMerge('relative h-full', containerClassName);
  const mergedClassName = twMerge('h-full', className);

  const [loading, setLoading] = useState(true);
  return (
    <div className={`flex flex-row ${mergedContainerClassName}`}>
      <img
        ref={placeholderRef}
        src={placeHolderSrc}
        alt={`${alt} placeholder`}
        className={`${loading ? 'z-1' : '-z-10'} ${mergedClassName}`}
        style={{
          objectFit,
          opacity: loading ? 1 : 0,
          transition: 'opacity 0.5s ease',
          zIndex: loading ? 1 : -1,
        }}
      />
      <img
        ref={imageRef}
        onLoad={() => {
          setLoading(false);
        }}
        src={src}
        alt={alt}
        className={`absolute w-full ${loading ? '-z-10' : 'z-1'} ${mergedClassName}`}
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
