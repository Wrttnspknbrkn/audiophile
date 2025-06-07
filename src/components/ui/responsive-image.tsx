
import React from 'react';

interface ResponsiveImageProps {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  mobile,
  tablet,
  desktop,
  alt,
  className = ""
}) => {
  // Fallback to a placeholder if images are missing
  const fallbackImage = "/placeholder.svg";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  };

  return (
    <picture className={className}>
      <source 
        media="(min-width: 1440px)" 
        srcSet={desktop || fallbackImage} 
      />
      <source 
        media="(min-width: 768px)" 
        srcSet={tablet || fallbackImage} 
      />
      <img 
        src={mobile || fallbackImage} 
        alt={alt} 
        className="w-full h-full object-cover" 
        onError={handleImageError}
      />
    </picture>
  );
};
