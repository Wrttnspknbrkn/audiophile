import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../ui/responsive-image';

const FeaturedProductsSection: React.FC = () => {
  return (
    <section className="pb-[120px] tablet:pb-[96px] desktop:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0 space-y-6 tablet:space-y-8 desktop:space-y-12">
        {/* ZX9 Speaker */}
        <div className="bg-audiophile-orange rounded-lg overflow-hidden relative min-h-[600px] tablet:min-h-[720px] desktop:min-h-[560px]">
          {/* Background Pattern - Visible circular pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.1]">
              <svg width="944" height="944" className="absolute -top-[20px] left-1/2 transform -translate-x-1/2 tablet:-top-[100px] desktop:-top-[50px] desktop:left-[100px] desktop:transform-none">
                <g stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd" opacity="0.2">
                  <circle cx="472" cy="472" r="235.5"/>
                  <circle cx="472" cy="472" r="270.5"/>
                  <circle cx="472" cy="472" r="471.5"/>
                  <circle cx="472" cy="472" r="504.5"/>
                  <circle cx="472" cy="472" r="672.5"/>
                  <circle cx="472" cy="472" r="705.5"/>
                  <circle cx="472" cy="472" r="471.5"/>
                </g>
              </svg>
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="relative h-full grid grid-cols-1 desktop:grid-cols-2 items-center">
            {/* Speaker Image - First on mobile/tablet/desktop */}
            <div className="flex justify-center items-end pt-[55px] tablet:pt-[52px] desktop:pt-0 desktop:pb-[116px] desktop:pl-[117px] order-1">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-speaker-zx9.png"
                tablet="/assets/home/tablet/image-speaker-zx9.png"
                desktop="/assets/home/desktop/image-speaker-zx9.png"
                alt="ZX9 Speaker"
                className="w-[172px] h-[207px] tablet:w-[172px] tablet:h-[207px] desktop:w-[410px] desktop:h-[493px] object-contain"
              />
            </div>
            
            {/* Text Content - Second on mobile/tablet/desktop */}
            <div className="text-center desktop:text-left px-6 tablet:px-16 desktop:px-0 pb-[55px] tablet:pb-[64px] desktop:pb-0 desktop:pr-[95px] order-2">
              <h1 className="text-white text-[36px] tablet:text-[56px] desktop:text-[56px] font-bold leading-[40px] tablet:leading-[58px] desktop:leading-[58px] tracking-[1.29px] tablet:tracking-[2px] desktop:tracking-[2px] uppercase mb-6 tablet:mb-6 desktop:mb-6">
                ZX9<br />SPEAKER
              </h1>
              <p className="text-white text-[15px] leading-[25px] opacity-75 mb-6 tablet:mb-10 desktop:mb-10 max-w-[349px] mx-auto desktop:mx-0">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Link
                to="/product/zx9-speaker"
                className="bg-audiophile-black text-white px-[31px] py-[15px] text-[13px] font-bold uppercase tracking-[1px] hover:bg-audiophile-dark-gray transition-all duration-300 inline-block"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="rounded-lg overflow-hidden relative min-h-[320px] desktop:min-h-[320px]">
          <ResponsiveImage
            mobile="/assets/home/mobile/image-speaker-zx7.jpg"
            tablet="/assets/home/tablet/image-speaker-zx7.jpg"
            desktop="/assets/home/desktop/image-speaker-zx7.jpg"
            alt="ZX7 Speaker"
            className="w-full h-[320px] desktop:h-[320px] object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 tablet:px-[62px] desktop:px-[95px] w-full">
              <div className="max-w-md">
                <h4 className="text-audiophile-black text-[28px] font-bold leading-[33px] tracking-[2px] uppercase mb-8">
                  ZX7 Speaker
                </h4>
                <Link
                  to="/product/zx7-speaker"
                  className="border-2 border-audiophile-black text-audiophile-black px-[31px] py-[15px] text-[13px] font-bold uppercase tracking-[1px] hover:bg-audiophile-black hover:text-white transition-all duration-300 inline-block"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-[11px] desktop:gap-[30px]">
          {/* Earphones Image */}
          <div className="rounded-lg overflow-hidden">
            <ResponsiveImage
              mobile="/assets/home/mobile/image-earphones-yx1.jpg"
              tablet="/assets/home/tablet/image-earphones-yx1.jpg"
              desktop="/assets/home/desktop/image-earphones-yx1.jpg"
              alt="YX1 Earphones"
              className="w-full h-[200px] tablet:h-[320px] desktop:h-[320px] object-cover"
            />
          </div>
          
          {/* Earphones Content */}
          <div className="bg-audiophile-light-gray rounded-lg px-6 py-[41px] tablet:px-[41px] tablet:py-[101px] desktop:px-[95px] desktop:py-[101px] flex flex-col justify-center">
            <h4 className="text-audiophile-black text-[28px] font-bold leading-[33px] tracking-[2px] uppercase mb-8">
              YX1 Earphones
            </h4>
            <Link
              to="/product/yx1-earphones"
              className="border-2 border-audiophile-black text-audiophile-black px-[31px] py-[15px] text-[13px] font-bold uppercase tracking-[1px] hover:bg-audiophile-black hover:text-white transition-all duration-300 inline-block w-fit"
            >
              See Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
