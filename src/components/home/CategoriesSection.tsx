
import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      name: 'Headphones',
      image: '/assets/shared/desktop/image-category-thumbnail-headphones.png',
      href: '/category/headphones'
    },
    {
      name: 'Speakers', 
      image: '/assets/shared/desktop/image-category-thumbnail-speakers.png',
      href: '/category/speakers'
    },
    {
      name: 'Earphones',
      image: '/assets/shared/desktop/image-category-thumbnail-earphones.png',
      href: '/category/earphones'
    }
  ];

  return (
    <section className="py-[92px] tablet:py-[96px] desktop:py-[120px]">
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[68px] tablet:gap-[10px] desktop:gap-[30px]">
          {categories.map((category) => (
            <div key={category.name} className="text-center group">
              <div className="relative h-[204px] bg-audiophile-light-gray rounded-lg mb-[45px] tablet:mb-[32px] desktop:mb-[48px] flex items-end justify-center pb-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-[147px] tablet:w-[123px] desktop:w-[147px] h-auto object-contain transform translate-y-[15px]"
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
