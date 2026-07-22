import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcWebp?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage = ({
  src,
  srcWebp,
  alt,
  className,
  priority = false,
  width,
  height,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);

  return (
    <picture>
      {srcWebp && (
        <source 
          srcSet={srcWebp} 
          type="image/webp"
          media="(min-width: 0px)"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100',
          className
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        {...props}
      />
    </picture>
  );
};
