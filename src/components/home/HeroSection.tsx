
import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../cms/CMSProvider';

const HeroSection: React.FC = () => {
  const { content } = useCMS();

  return (
    <section className="relative bg-audiophile-dark overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 1024px)" srcSet={content.hero.backgroundImage || "/assets/home/desktop/image-hero.jpg"} />
          <source media="(min-width: 768px)" srcSet="/assets/home/tablet/image-header.jpg" />
          <img 
            src="/assets/home/mobile/image-header.jpg" 
            alt="XX99 Mark II Headphones" 
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-md lg:max-w-lg">
          <p className="text-audiophile-light-gray text-overline mb-4 lg:mb-6">
            {content.hero.subtitle}
          </p>
          
          <h1 className="text-white text-h1 mb-6 lg:mb-8">
            {content.hero.title}
          </h1>
          
          <p className="text-audiophile-light-gray text-body mb-8 lg:mb-10 leading-relaxed">
            {content.hero.description}
          </p>
          
          <Link
            to="/product/xx99-mark-two-headphones"
            className="inline-block bg-audiophile-orange text-white text-subtitle uppercase tracking-wide px-8 py-4 hover:bg-audiophile-light-orange transition-colors duration-300"
          >
            {content.hero.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
