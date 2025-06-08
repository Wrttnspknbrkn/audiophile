
import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../cms/CMSProvider';

const CategoriesSection: React.FC = () => {
  const { content } = useCMS();
  
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-[30px]">
          {content.categories.map((category) => (
            <div key={category.id} className="group text-center">
              {/* Category Image */}
              <div className="relative bg-audiophile-light-gray rounded-lg h-[165px] lg:h-[204px] mb-4 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[122px] lg:w-[147px] h-auto transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Category Name */}
              <h6 className="text-h6 text-audiophile-black mb-4 uppercase tracking-wider">
                {category.name}
              </h6>
              
              {/* Shop Link */}
              <Link
                to={category.href}
                className="inline-flex items-center text-subtitle text-audiophile-black opacity-50 uppercase tracking-wider hover:text-audiophile-orange hover:opacity-100 transition-all duration-300 group"
              >
                Shop
                <img
                  src="/assets/shared/desktop/icon-arrow-right.svg"
                  alt=""
                  className="ml-[13px] w-[5px] h-[10px] transition-transform duration-300 group-hover:translate-x-1"
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
