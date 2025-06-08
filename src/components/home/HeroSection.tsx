
import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../ui/responsive-image';
import { useCMS } from '../cms/CMSProvider';

const HeroSection: React.FC = () => {
  const { content } = useCMS();
  
  return (
    <section className="bg-audiophile-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[600px] lg:min-h-[729px]">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1 py-8 lg:py-0">
            <span className="text-white opacity-50 text-overline uppercase tracking-[10px] mb-4 block">
              {content.hero.subtitle}
            </span>
            <h1 className="text-white text-h1 mb-6">
              {content.hero.title}
            </h1>
            <p className="text-white opacity-75 text-body mb-8 max-w-[349px] mx-auto lg:mx-0">
              {content.hero.description}
            </p>
            <Link
              to="/product/xx99-mark-two-headphones"
              className="inline-block bg-audiophile-orange text-white text-subtitle px-8 py-4 uppercase tracking-wider hover:bg-audiophile-light-orange transition-colors duration-300"
            >
              {content.hero.buttonText}
            </Link>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 relative">
            <ResponsiveImage
              mobile="/assets/home/mobile/image-header.jpg"
              tablet="/assets/home/tablet/image-header.jpg"
              desktop={content.hero.backgroundImage}
              alt="XX99 Mark II Headphones"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
