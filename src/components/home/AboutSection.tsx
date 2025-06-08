
import React from 'react';
import { useCMS } from '../cms/CMSProvider';
import { ResponsiveImage } from '../ui/responsive-image';

const AboutSection: React.FC = () => {
  const { content } = useCMS();

  return (
    <section className="pb-20 md:pb-24 lg:pb-48">
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
        {/* Mobile and Tablet - Image first, then text */}
        <div className="lg:hidden">
          <div className="mb-8 md:mb-12">
            <ResponsiveImage
              mobile="/assets/shared/mobile/image-best-gear.jpg"
              tablet="/assets/shared/tablet/image-best-gear.jpg"
              desktop="/assets/shared/desktop/image-best-gear.jpg"
              alt="Person listening to music"
              className="w-full h-80 md:h-96 rounded-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="mb-8 text-audiophile-black">
              {content.about.title.split(' ').map((word, index) => 
                word.toLowerCase() === 'best' ? (
                  <span key={index} className="text-audiophile-orange">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="body">
              {content.about.description}
            </p>
          </div>
        </div>

        {/* Desktop - Two column layout: text left, image right */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-32 lg:items-center">
          {/* Left column - Text content */}
          <div className="text-left">
            <h2 className="text-[40px] font-bold leading-[44px] tracking-[1.43px] uppercase text-audiophile-black mb-8">
              {content.about.title.split(' ').map((word, index) => 
                word.toLowerCase() === 'best' ? (
                  <span key={index} className="text-audiophile-orange">{word} </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-audiophile-black opacity-50 text-[15px] font-medium leading-[25px]">
              {content.about.description}
            </p>
          </div>
          
          {/* Right column - Image */}
          <div className="flex justify-center">
            <img
              src="/assets/shared/desktop/image-best-gear.jpg"
              alt="Person listening to music"
              className="w-[540px] h-[588px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
