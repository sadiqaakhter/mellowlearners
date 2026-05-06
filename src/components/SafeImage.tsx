import React, { useState } from 'react';
import { asset } from '../lib/utils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSeed?: string;
  alt: string;
  className?: string;
}

export default function SafeImage({ src, fallbackSeed, alt, className, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageError = () => {
    if (!error) {
      console.warn(`[SafeImage] Failed to load: ${src}. Using fallback.`);
      setError(true);
    }
  };

  // If it's already an absolute URL, use it directly
  const imageSrc = src.startsWith('http') ? src : asset(src);
  
  // Fallback URL using picsum
  const fallbackUrl = `https://picsum.photos/seed/${fallbackSeed || src.split('/').pop()?.split('.')[0] || 'mellow'}/800/600`;

  return (
    <img
      src={error ? fallbackUrl : imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
