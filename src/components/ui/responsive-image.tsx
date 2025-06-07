
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
  return (
    <picture className={className}>
      <source media="(min-width: 1440px)" srcSet={desktop} />
      <source media="(min-width: 768px)" srcSet={tablet} />
      <img src={mobile} alt={alt} className="w-full h-full object-cover" />
    </picture>
  );
};
