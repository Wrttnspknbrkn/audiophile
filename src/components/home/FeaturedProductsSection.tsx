
import React from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../ui/responsive-image';

const FeaturedProductsSection: React.FC = () => {
  return (
    <section className="pb-[120px] tablet:pb-[96px] desktop:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0 space-y-6 tablet:space-y-8 desktop:space-y-12">
        {/* ZX9 Speaker */}
        <div className="bg-audiophile-orange rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <img
              src="/assets/home/desktop/pattern-circles.svg"
              alt=""
              className="absolute -top-20 -left-40 w-full h-full object-cover scale-150"
            />
          </div>
          <div className="relative grid grid-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-12 items-end p-8 tablet:p-12 desktop:p-24">
            <div className="text-center desktop:text-left order-2 desktop:order-1">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-speaker-zx9.png"
                tablet="/assets/home/tablet/image-speaker-zx9.png"
                desktop="/assets/home/desktop/image-speaker-zx9.png"
                alt="ZX9 Speaker"
                className="w-48 tablet:w-56 desktop:w-80 mx-auto desktop:mx-0"
              />
            </div>
            <div className="text-center desktop:text-left order-1 desktop:order-2">
              <h2 className="text-white mb-6 max-w-xs mx-auto desktop:mx-0">ZX9 Speaker</h2>
              <p className="text-white text-body mb-8 tablet:mb-10 opacity-75 max-w-sm mx-auto desktop:mx-0">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Link
                to="/product/zx9-speaker"
                className="bg-audiophile-black text-white px-8 py-4 text-subtitle uppercase tracking-wider hover:bg-audiophile-dark-gray transition-all duration-300 inline-block"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="rounded-lg overflow-hidden relative">
          <ResponsiveImage
            mobile="/assets/home/mobile/image-speaker-zx7.jpg"
            tablet="/assets/home/tablet/image-speaker-zx7.jpg"
            desktop="/assets/home/desktop/image-speaker-zx7.jpg"
            alt="ZX7 Speaker"
            className="w-full h-80 desktop:h-96"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 tablet:px-10 desktop:px-24 w-full">
              <div className="max-w-md">
                <h4 className="mb-8 text-audiophile-black">ZX7 Speaker</h4>
                <Link
                  to="/product/zx7-speaker"
                  className="btn-secondary"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-8 desktop:gap-12">
          <div className="rounded-lg overflow-hidden">
            <ResponsiveImage
              mobile="/assets/home/mobile/image-earphones-yx1.jpg"
              tablet="/assets/home/tablet/image-earphones-yx1.jpg"
              desktop="/assets/home/desktop/image-earphones-yx1.jpg"
              alt="YX1 Earphones"
              className="w-full h-80"
            />
          </div>
          <div className="bg-audiophile-light-gray rounded-lg p-8 tablet:p-12 desktop:p-24 flex flex-col justify-center">
            <h4 className="mb-8 text-audiophile-black">YX1 Earphones</h4>
            <Link
              to="/product/yx1-earphones"
              className="btn-secondary w-fit"
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
