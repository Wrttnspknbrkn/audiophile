
import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../ui/responsive-image';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-audiophile-dark overflow-hidden">
      {/* Mobile and Tablet Hero - Image with overlay */}
      <div className="lg:hidden">
        <div className="relative">
          <ResponsiveImage
            mobile="/assets/home/mobile/image-header.jpg"
            tablet="/assets/home/tablet/image-header.jpg"
            desktop="/assets/home/desktop/image-hero.jpg"
            alt="XX99 Mark II Headphones"
            className="w-full h-[600px] tablet:h-[729px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 tablet:px-[197px] mt-8 tablet:mt-12">
              <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase mb-4 tablet:mb-6 text-audiophile-white opacity-50">New Product</p>
              <h1 className="text-[36px] tablet:text-[56px] font-bold leading-[40px] tablet:leading-[58px] tracking-[1.29px] tablet:tracking-[2px] uppercase text-white mb-6 max-w-[328px] tablet:max-w-[400px] mx-auto">
                XX99 Mark II<br />Headphones
              </h1>
              <p className="text-white opacity-75 text-[15px] font-medium leading-[25px] mb-[28px] tablet:mb-10 max-w-[328px] tablet:max-w-[349px] mx-auto">
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </p>
              <Link
                to="/product/xx99-mark-two-headphones"
                className="inline-block bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Hero - Matching Figma exactly */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-12 items-center min-h-[632px]">
            {/* Left column - Text content */}
            <div className="col-span-5 text-left pr-8">
              <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase mb-6 text-audiophile-white opacity-50">New Product</p>
              <h1 className="text-[56px] font-bold leading-[58px] tracking-[2px] uppercase text-white mb-6">
                XX99 Mark II<br />Headphones
              </h1>
              <p className="text-white opacity-75 text-[15px] font-medium leading-[25px] mb-10 max-w-[350px]">
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </p>
              <Link
                to="/product/xx99-mark-two-headphones"
                className="inline-block bg-audiophile-orange text-audiophile-white px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
              >
                See Product
              </Link>
            </div>
            
            {/* Right column - Large headphones image matching Figma */}
            <div className="col-span-7 relative h-[632px] flex items-center justify-start pl-8">
              <div className="relative w-full h-full">
                <img
                  src="/assets/home/desktop/image-hero.jpg"
                  alt="XX99 Mark II Headphones"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-auto object-contain scale-150 origin-center"
                  style={{ maxWidth: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
