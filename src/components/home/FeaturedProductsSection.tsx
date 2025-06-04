import type React from "react"
import { Link } from "react-router-dom"
import { ResponsiveImage } from "../ui/responsive-image"

const FeaturedProductsSection: React.FC = () => {
  return (
    <section className="pb-[120px] md:pb-[96px] lg:pb-[200px]">
      <div className="max-w-[1110px] mx-auto px-6 md:px-[39px] lg:px-0 space-y-6 md:space-y-8 lg:space-y-12">
        {/* ZX9 Speaker */}
        <div className="bg-audiophile-orange rounded-lg overflow-hidden relative min-h-[600px] md:min-h-[720px] lg:min-h-[560px]">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/home/desktop/pattern-circles.svg"
              alt=""
              className="absolute -top-[40px] -left-[150px] w-[944px] h-[944px] opacity-90 hidden lg:block"
            />
          </div>

          {/* Mobile & Tablet Layout - Stacked */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8 pt-[55px] pb-[55px] px-6 md:px-16 md:pt-[52px] md:pb-[64px] relative z-10">
            <div className="flex justify-center">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-speaker-zx9.png"
                tablet="/assets/home/tablet/image-speaker-zx9.png"
                desktop="/assets/home/desktop/image-speaker-zx9.png"
                alt="ZX9 Speaker"
                className="w-[172px] h-[207px] object-contain"
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-white text-[36px] md:text-[56px] font-bold leading-[40px] md:leading-[58px] tracking-[1.29px] md:tracking-[2px] uppercase">
                ZX9
                <br />
                SPEAKER
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

          {/* Desktop Layout - Side by Side: Image Left, Text Right */}
          <div className="hidden lg:flex lg:items-center lg:h-[560px] lg:relative">
            {/* Left Side - Speaker Image */}
            <div className="flex-1 flex items-end justify-center h-full relative z-10">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-speaker-zx9.png"
                tablet="/assets/home/tablet/image-speaker-zx9.png"
                desktop="/assets/home/desktop/image-speaker-zx9.png"
                alt="ZX9 Speaker"
                className="w-[410px] h-[493px] object-contain mb-[-16px]"
              />
            </div>

            {/* Right Side - Text Content */}
            <div className="flex-1 flex flex-col justify-center pr-[95px] pl-[140px] relative z-10">
              <h1 className="text-white text-[56px] font-bold leading-[58px] tracking-[2px] uppercase mb-6">
                ZX9
                <br />
                SPEAKER
              </h1>
              <p className="text-white text-[15px] leading-[25px] opacity-75 mb-10 max-w-[349px]">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Link
                to="/product/zx9-speaker"
                className="bg-audiophile-black text-white px-[31px] py-[15px] text-[13px] font-bold uppercase tracking-[1px] hover:bg-audiophile-dark-gray transition-all duration-300 inline-block no-underline w-fit"
              >
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="rounded-lg overflow-hidden relative min-h-[320px] lg:min-h-[320px]">
          <ResponsiveImage
            mobile="/assets/home/mobile/image-speaker-zx7.jpg"
            tablet="/assets/home/tablet/image-speaker-zx7.jpg"
            desktop="/assets/home/desktop/image-speaker-zx7.jpg"
            alt="ZX7 Speaker"
            className="w-full h-[320px] lg:h-[320px] object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 md:px-[62px] lg:px-[95px] w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[11px] lg:gap-[30px]">
          <div className="rounded-lg overflow-hidden">
            <ResponsiveImage
              mobile="/assets/home/mobile/image-earphones-yx1.jpg"
              tablet="/assets/home/tablet/image-earphones-yx1.jpg"
              desktop="/assets/home/desktop/image-earphones-yx1.jpg"
              alt="YX1 Earphones"
              className="w-full h-[200px] md:h-[320px] lg:h-[320px] object-cover"
            />
          </div>

          <div className="bg-audiophile-light-gray rounded-lg px-6 py-[41px] md:px-[41px] md:py-[101px] lg:px-[95px] lg:py-[101px] flex flex-col justify-center">
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
  )
}

export default FeaturedProductsSection
