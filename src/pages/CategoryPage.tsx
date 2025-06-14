
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ResponsiveImage } from '../components/ui/responsive-image';
import { useCMS } from '../components/cms/CMSProvider';
import CategoriesSection from '../components/home/CategoriesSection';
import AboutSection from '../components/home/AboutSection';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { products } = useCMS();
  
  const categoryProducts = products.filter(
    product => product.category === category
  ).sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); // New products first

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Category Header */}
      <section className="bg-[#191919] py-24 md:py-[105px] lg:py-[98px]">
        <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 text-center">
          <h1 className="text-[28px] md:text-[40px] font-bold leading-[38px] md:leading-[44px] tracking-[2px] md:tracking-[1.43px] uppercase text-white">
            {categoryName}
          </h1>
        </div>
      </section>

      {/* Products */}      
      <section className="py-16 md:py-[120px] lg:py-[160px]">
        <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
              <Link 
                to="/admin" 
                className="inline-block mt-4 text-[#D87D4A] hover:underline"
              >
                Add products in CMS →
              </Link>
            </div>
          ) : (
            <div className="space-y-[120px] md:space-y-[120px] lg:space-y-[160px]">
              {categoryProducts.map((product, index) => (
                <div key={product.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-[52px] lg:gap-[125px] items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div>
                    <ResponsiveImage
                      mobile={product.categoryImage.mobile || product.image.mobile}
                      tablet={product.categoryImage.tablet || product.image.tablet}
                      desktop={product.categoryImage.desktop || product.image.desktop}
                      alt={product.name}
                      className="w-full h-[352px] md:h-[352px] lg:h-[560px] rounded-lg object-cover"
                    />
                  </div>
                  <div className="text-center lg:text-left lg:max-w-[445px]">
                    {product.new && (
                      <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase text-[#D87D4A] mb-6 md:mb-4 lg:mb-4">New Product</p>
                    )}
                    <h2 className="text-[28px] md:text-[40px] font-bold leading-[32px] md:leading-[44px] tracking-[1px] md:tracking-[1.43px] uppercase text-black mb-6 md:mb-8 lg:mb-8">
                      {product.name}
                    </h2>
                    <p className="text-[15px] font-medium leading-[25px] text-black/50 mb-6 md:mb-10 lg:mb-10">
                      {product.description}
                    </p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="bg-[#D87D4A] text-white px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-all duration-300 inline-block"
                    >
                      See Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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
