import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      name: 'HEADPHONES',
      image: {
        mobile: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
        tablet: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
        desktop: '/assets/shared/desktop/image-category-thumbnail-headphones.png'
      },
      href: '/category/headphones'
    },
    {
      name: 'SPEAKERS', 
      image: {
        mobile: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
        tablet: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
        desktop: '/assets/shared/desktop/image-category-thumbnail-speakers.png'
      },
      href: '/category/speakers'
    },
    {
      name: 'EARPHONES',
      image: {
        mobile: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
        tablet: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
        desktop: '/assets/shared/desktop/image-category-thumbnail-earphones.png'
      },
      href: '/category/earphones'
    }
  ];

  return (
    <section className="py-10 tablet:py-24 desktop:py-40">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-10 desktop:px-0">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-16 tablet:gap-[10px] desktop:gap-[30px]">
          {categories.map((category, index) => (
            <div key={category.name} className="group">
              {/* Card Container */}
              <div className="relative bg-gray-100 rounded-lg pt-[88px] pb-6 mb-9 tablet:mb-4 desktop:mb-12 overflow-hidden">
                {/* Product Image */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-15px]">
                  <img
                    src={category.image.desktop}
                    alt={category.name}
                    className="w-[200px] tablet:w-[160px] desktop:w-[200px] h-auto object-contain drop-shadow-lg"
                  />
                </div>
              </div>
              
              {/* Category Info */}
              <div className="text-center">
                <h6 className="text-[15px] tablet:text-[18px] font-bold leading-tight tracking-[1.07px] tablet:tracking-[1.29px] text-black uppercase mb-4">
                  {category.name}
                </h6>
                
                {/* Shop Link */}
                <Link
                  to={category.href}
                  className="inline-flex items-center justify-center text-[13px] font-bold leading-[18px] tracking-[1px] uppercase text-black/50 hover:text-orange-500 transition-colors duration-200 group"
                >
                  SHOP
                  <svg 
                    className="ml-3 w-[5px] h-[10px] group-hover:translate-x-1 transition-transform duration-200" 
                    viewBox="0 0 8 12" 
                    fill="none"
                  >
                    <path 
                      d="M1.322 1L6.156 6L1.322 11" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
