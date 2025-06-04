
import React from 'react';
import { ResponsiveImage } from '../ui/responsive-image';

const AboutSection: React.FC = () => {
  return (
    <section className="pb-20 tablet:pb-24 desktop:pb-40">
      <div className="max-w-7xl mx-auto px-6 tablet:px-10 desktop:px-40">
        {/* Mobile and Tablet - Image first, then text */}
        <div className="desktop:hidden">
          <div className="mb-8 tablet:mb-12">
            <ResponsiveImage
              mobile="/assets/shared/mobile/image-best-gear.jpg"
              tablet="/assets/shared/tablet/image-best-gear.jpg"
              desktop="/assets/shared/desktop/image-best-gear.jpg"
              alt="Person listening to music"
              className="w-full h-80 tablet:h-96 rounded-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="mb-8 text-audiophile-black">
              Bringing you the <span className="text-audiophile-orange">best</span> audio gear
            </h2>
            <p className="body">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
              earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
              rooms available for you to browse and experience a wide range of our products. Stop by our store 
              to meet some of the fantastic people who make Audiophile the best place to buy your portable 
              audio equipment.
            </p>
          </div>
        </div>

        {/* Desktop - Two column layout matching Figma */}
        <div className="hidden desktop:grid desktop:grid-cols-12 desktop:gap-8 desktop:items-center">
          {/* Left column - Text content */}
          <div className="desktop:col-span-6 text-left pr-8">
            <h2 className="mb-8 text-audiophile-black text-[40px] font-bold leading-[44px] tracking-[1.43px] uppercase">
              Bringing you the <span className="text-audiophile-orange">best</span> audio gear
            </h2>
            <p className="text-audiophile-black opacity-50 text-[15px] font-medium leading-[25px]">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
              earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
              rooms available for you to browse and experience a wide range of our products. Stop by our store 
              to meet some of the fantastic people who make Audiophile the best place to buy your portable 
              audio equipment.
            </p>
          </div>

          {/* Right column - Image */}
          <div className="desktop:col-span-6">
            <img
              src="/assets/shared/desktop/image-best-gear.jpg"
              alt="Person listening to music"
              className="w-full h-[588px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
