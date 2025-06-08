import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../cms/CMSProvider';
import { ResponsiveImage } from '../ui/responsive-image';

const HeroSection: React.FC = () => {
  const { content } = useCMS();
  
  // Function to render title with smart line breaks for desktop
  const renderTitle = (title: string, isDesktop: boolean = false) => {
    if (!isDesktop) {
      return title;
    }
    
    // Handle the specific case of "XX99 Mark II Headphones"
    if (title.includes('XX99 Mark II Headphones')) {
      return (
        <div className="flex flex-col">
          <span>XX99 Mark II</span>
          <span>Headphones</span>
        </div>
      );
    }
    
    // Generic fallback: split at the last space before "Headphones"
    const headphonesIndex = title.toLowerCase().lastIndexOf('headphones');
    if (headphonesIndex > 0) {
      const beforeHeadphones = title.substring(0, headphonesIndex).trim();
      const headphones = title.substring(headphonesIndex).trim();
      
      return (
        <div className="flex flex-col">
          <span>{beforeHeadphones}</span>
          <span>{headphones}</span>
        </div>
      );
    }
    
    // If no "Headphones" found, return as-is
    return title;
  };

  return (
    <section className="bg-audiophile-dark overflow-hidden">
      <div className="lg:hidden">
        <div className="relative">
          <ResponsiveImage
            mobile="/assets/home/mobile/image-header.jpg"
            tablet="/assets/home/tablet/image-header.jpg"
            desktop="/assets/home/desktop/image-hero.jpg"
            alt={content.hero.title}
            className="w-full h-[600px] tablet:h-[729px] object-cover object-[center_30%] tablet:object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 tablet:px-[197px] mt-12 tablet:mt-12">
              <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase mb-4 tablet:mb-6 text-audiophile-white opacity-50">
                {content.hero.subtitle}
              </p>
              <h1 className="text-[36px] tablet:text-[56px] font-bold leading-[40px] tablet:leading-[58px] tracking-[1.29px] tablet:tracking-[2px] uppercase text-white mb-6 max-w-[328px] tablet:max-w-[400px] mx-auto">
                {content.hero.title}
              </h1>
              <p className="text-white opacity-75 text-[15px] font-medium leading-[25px] mb-[28px] tablet:mb-10 max-w-[328px] tablet:max-w-[349px] mx-auto">
                {content.hero.description}
              </p>
              <Link
                to="/product/xx99-mark-two-headphones"
                className="inline-block bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
              >
                {content.hero.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block">
        <div className="max-w-[1110px] mx-auto px-0 relative">
          <div className="grid grid-cols-12 items-center h-[700px]">
            <div className="col-span-5 text-left pl-0 pr-[95px]">
              <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase mb-6 text-audiophile-white opacity-50">
                {content.hero.subtitle}
              </p>
              <h1 className="text-[56px] font-bold leading-[58px] tracking-[2px] uppercase text-white mb-6 max-w-[400px]">
                {renderTitle(content.hero.title, true)}
              </h1>
              <p className="text-white opacity-75 text-[15px] font-medium leading-[25px] mb-10 max-w-[349px]">
                {content.hero.description}
              </p>
              <Link
                to="/product/xx99-mark-two-headphones"
                className="inline-block bg-audiophile-orange text-audiophile-white px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
              >
                {content.hero.buttonText}
              </Link>
            </div>
            
            <div className="col-span-7 relative h-[700px] overflow-hidden">
              <img
                src="/assets/home/desktop/image-hero.jpg"
                alt={content.hero.title}
                className="absolute right-[-220px] top-[40%] transform -translate-y-1/2 h-[115%] w-auto object-contain"
                style={{ maxWidth: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
