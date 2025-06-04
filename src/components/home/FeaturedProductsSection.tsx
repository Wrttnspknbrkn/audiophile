import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../ui/responsive-image';

const FeaturedProductsSection: React.FC = () => {
  return (
    <section className="pb-[120px] tablet:pb-[96px] desktop:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0 space-y-6 tablet:space-y-8 desktop:space-y-12">
        {/* ZX9 Speaker */}
        <div className="bg-audiophile-orange rounded-lg overflow-hidden relative min-h-[600px] tablet:min-h-[720px] desktop:min-h-[560px]">
          {/* Background Pattern - Covers entire left column on desktop */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/home/desktop/pattern-circles.svg"
              alt=""
              className="absolute -top-[20px] left-1/2 transform -translate-x-1/2 w-[558px] h-[558px] opacity-[0.15] tablet:-top-[100px] desktop:-top-[100px] desktop:left-[-150px] desktop:transform-none desktop:w-[944px] desktop:h-[944px] desktop:opacity-[0.3]"
            />
          </div>
          
          {/* Content Grid */}
          <div className="relative h-full">
            {/* Mobile & Tablet Layout - Stacked */}
            <div className="desktop:hidden flex flex-col items-center text-center space-y-8 pt-[55px] pb-[55px] px-6 tablet:px-16 tablet:pt-[52px] tablet:pb-[64px]">
              {/* Speaker Image */}
              <div className="flex justify-center">
                <ResponsiveImage
                  mobile="/assets/home/mobile/image-speaker-zx9.png"
                  tablet="/assets/home/tablet/image-speaker-zx9.png"
                  desktop="/assets/home/desktop/image-speaker-zx9.png"
                  alt="ZX9 Speaker"
                  className="w-[172px] h-[207px] object-contain"
                />
              </div>
              
              {/* Text Content */}
              <div className="space-y-6">
                <h1 className="text-white text-[36px] tablet:text-[56px] font-bold leading-[40px] tablet:leading-[58px] tracking-[1.29px] tablet:tracking-[2px] uppercase">
                  ZX9<br />SPEAKER
                </h1>
                <p className="text-white text-[15px] leading-[25px] opacity-75 max-w-[349px] mx-auto">
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

            {/* Desktop Layout - Side by Side */}
            <div className="hidden desktop:grid desktop:grid-cols-2 desktop:h-full desktop:items-center">
              {/* Left Column - Speaker Image */}
              <div className="flex justify-center items-end pb-[116px] pl-[117px]">
                <ResponsiveImage
                  mobile="/assets/home/mobile/image-speaker-zx9.png"
                  tablet="/assets/home/tablet/image-speaker-zx9.png"
                  desktop="/assets/home/desktop/image-speaker-zx9.png"
                  alt="ZX9 Speaker"
                  className="w-[410px] h-[493px] object-contain"
                />
              </div>

              {/* Right Column - Text Content */}
              <div className="text-left pr-[95px] py-[133px]">
                <h1 className="text-white text-[56px] font-bold leading-[58px] tracking-[2px] uppercase mb-6">
                  ZX9<br />SPEAKER
                </h1>
                <p className="text-white text-[15px] leading-[25px] opacity-75 mb-10 max-w-[349px]">
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
