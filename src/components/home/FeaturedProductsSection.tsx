import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../ui/responsive-image';

const FeaturedProductsSection: React.FC = () => {
  return (
    <section className="pb-[120px] tablet:pb-[96px] desktop:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0 space-y-6 tablet:space-y-8 desktop:space-y-12">
        {/* ZX9 Speaker - Perfect desktop layout */}
        <div className="bg-audiophile-orange rounded-lg overflow-hidden relative h-[560px]">
          {/* Background pattern */}
          <div className="absolute inset-0">
            <img
              src="/assets/home/desktop/pattern-circles.svg"
              alt=""
              className="absolute -top-[40px] -left-[150px] w-[944px] h-[944px] opacity-20"
            />
          </div>
          
          <div className="relative grid grid-cols-1 desktop:grid-cols-2 h-full items-end p-8 tablet:p-12 desktop:px-[95px] desktop:py-[133px]">
            {/* Speaker image column */}
            <div className="text-center desktop:text-left order-2 desktop:order-1 flex items-end justify-center desktop:justify-start">
              <img
                src="/assets/home/desktop/image-speaker-zx9.png"
                alt="ZX9 Speaker"
                className="w-48 tablet:w-56 desktop:w-[410px] desktop:h-[493px] object-contain"
              />
            </div>
            
            {/* Text content column */}
            <div className="text-center desktop:text-left order-1 desktop:order-2 flex flex-col justify-center desktop:items-start">
              <h2 className="text-[36px] desktop:text-[56px] font-bold leading-[40px] desktop:leading-[58px] tracking-[1.29px] desktop:tracking-[2px] uppercase text-white mb-6 max-w-xs mx-auto desktop:mx-0">
                ZX9<br />Speaker
              </h2>
              <p className="text-white text-[15px] font-medium leading-[25px] mb-8 tablet:mb-10 opacity-75 max-w-sm mx-auto desktop:mx-0">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Link
                to="/product/zx9-speaker"
                className="bg-audiophile-black text-white px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-dark-gray transition-all duration-300 inline-block"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker - Perfect desktop layout */}
        <div className="rounded-lg overflow-hidden relative h-[320px]">
          <img
            src="/assets/home/desktop/image-speaker-zx7.jpg"
            alt="ZX7 Speaker"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 tablet:px-10 desktop:px-[95px] w-full">
              <div className="max-w-md">
                <h4 className="text-[28px] font-bold leading-[38px] tracking-[2px] uppercase mb-8 text-audiophile-black">
                  ZX7 Speaker
                </h4>
                <Link
                  to="/product/zx7-speaker"
                  className="inline-block border-2 border-audiophile-black text-audiophile-black px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-black hover:text-white transition-all duration-300"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* YX1 Earphones - Perfect desktop layout */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-8 desktop:gap-[30px]">
          <div className="rounded-lg overflow-hidden h-[320px]">
            <img
              src="/assets/home/desktop/image-earphones-yx1.jpg"
              alt="YX1 Earphones"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-audiophile-light-gray rounded-lg p-8 tablet:p-12 desktop:px-[95px] desktop:py-[101px] flex flex-col justify-center h-[320px]">
            <h4 className="text-[28px] font-bold leading-[38px] tracking-[2px] uppercase mb-8 text-audiophile-black">
              YX1 Earphones
            </h4>
            <Link
              to="/product/yx1-earphones"
              className="inline-block border-2 border-audiophile-black text-audiophile-black px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-black hover:text-white transition-all duration-300 w-fit"
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
