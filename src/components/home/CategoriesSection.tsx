
import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      name: 'Headphones',
      image: {
        mobile: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
        tablet: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
        desktop: '/assets/shared/desktop/image-category-thumbnail-headphones.png'
      },
      href: '/category/headphones'
    },
    {
      name: 'Speakers', 
      image: {
        mobile: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
        tablet: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
        desktop: '/assets/shared/desktop/image-category-thumbnail-speakers.png'
      },
      href: '/category/speakers'
    },
    {
      name: 'Earphones',
      image: {
        mobile: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
        tablet: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
        desktop: '/assets/shared/desktop/image-category-thumbnail-earphones.png'
      },
      href: '/category/earphones'
    }
  ];

  return (
    <section className="py-[92px] tablet:py-[96px] desktop:py-[120px]">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[68px] tablet:gap-[10px] desktop:gap-[30px]">
          {categories.map((category) => (
            <div key={category.name} className="text-center group">
              <div className="relative pt-[88px] pb-[22px] bg-audiophile-light-gray rounded-lg mb-[45px] tablet:mb-[32px] desktop:mb-[48px]">
                <img
                  src={category.image.desktop}
                  alt={category.name}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[147px] tablet:w-[123px] desktop:w-[147px] h-[133px] tablet:h-[104px] desktop:h-[133px] object-contain"
                />
              </div>
              <h6 className="mb-[17px] text-[18px] font-bold leading-[24px] tracking-[1.29px] text-audiophile-black uppercase">{category.name}</h6>
              <Link
                to={category.href}
                className="inline-flex items-center text-[13px] font-bold leading-[25px] tracking-[1px] uppercase text-audiophile-black opacity-50 hover:text-audiophile-orange hover:opacity-100 transition-all duration-300"
              >
                Shop
                <img
                  src="/assets/shared/desktop/icon-arrow-right.svg"
                  alt=""
                  className="ml-[13px] w-[5px] h-[10px]"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
