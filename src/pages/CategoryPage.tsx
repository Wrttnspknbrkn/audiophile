
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ResponsiveImage } from '../components/ui/responsive-image';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import CategoriesSection from '../components/home/CategoriesSection';
import AboutSection from '../components/home/AboutSection';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const products = productsData as Product[];
  
  const categoryProducts = products.filter(
    product => product.category === category
  ).sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); // New products first

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      
      {/* Category Header */}
      <section className="bg-audiophile-black py-[97px] tablet:py-[105px] desktop:py-[98px]">
        <div className="max-w-[1110px] mx-auto px-6 tablet:px-[40px] desktop:px-0 text-center">
          <h1 className="text-[28px] tablet:text-[40px] desktop:text-[40px] font-bold leading-[38px] tablet:leading-[44px] desktop:leading-[44px] tracking-[2px] tablet:tracking-[1.43px] desktop:tracking-[1.43px] uppercase text-white">{categoryName}</h1>
        </div>
      </section>

      {/* Products */}      
      <section className="py-16 tablet:py-[120px] desktop:py-[160px]">
        <div className="max-w-[1110px] mx-auto px-6 tablet:px-[40px] desktop:px-0">
          <div className="space-y-[120px] tablet:space-y-[120px] desktop:space-y-[160px]">
            {categoryProducts.map((product, index) => (
              <div key={product.id} className={`grid grid-cols-1 desktop:grid-cols-2 gap-8 tablet:gap-[52px] desktop:gap-[125px] items-center ${index % 2 === 1 ? 'desktop:[&>*:first-child]:order-2' : ''}`}>
                <div>
                  <ResponsiveImage
                    mobile={product.categoryImage.mobile}
                    tablet={product.categoryImage.tablet}
                    desktop={product.categoryImage.desktop}
                    alt={product.name}
                    className="w-full h-[352px] tablet:h-[352px] desktop:h-[560px] rounded-lg object-cover"
                  />
                </div>
                <div className="text-center desktop:text-left desktop:max-w-[445px]">
                  {product.new && (
                    <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase text-audiophile-orange mb-6 tablet:mb-4 desktop:mb-4">New Product</p>
                  )}
                  <h2 className="text-[28px] tablet:text-[40px] desktop:text-[40px] font-bold leading-[32px] tablet:leading-[44px] desktop:leading-[44px] tracking-[1px] tablet:tracking-[1.43px] desktop:tracking-[1.43px] uppercase text-audiophile-black mb-6 tablet:mb-8 desktop:mb-8">{product.name}</h2>
                  <p className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 mb-6 tablet:mb-10 desktop:mb-10">
                    {product.description}
                  </p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300 inline-block"
                  >
                    See Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* About Section */}
      <AboutSection />

      <Footer />
    </div>
  );
};

export default CategoryPage;
