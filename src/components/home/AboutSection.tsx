
import React from 'react';
import { ResponsiveImage } from '../ui/responsive-image';

const AboutSection: React.FC = () => {
  return (
    <section className="pb-20 tablet:pb-24 desktop:pb-40">
      <div className="max-w-7xl mx-auto px-6 tablet:px-10 desktop:px-40">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 tablet:gap-12 desktop:gap-20 items-center">
          <div className="desktop:order-2">
            <ResponsiveImage
              mobile="/assets/shared/mobile/image-best-gear.jpg"
              tablet="/assets/shared/tablet/image-best-gear.jpg"
              desktop="/assets/shared/desktop/image-best-gear.jpg"
              alt="Person listening to music"
              className="w-full h-80 tablet:h-96 rounded-lg"
            />
          </div>
          <div className="desktop:order-1 text-center desktop:text-left">
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
      </div>
    </section>
  );
};

export default AboutSection;
