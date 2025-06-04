
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ResponsiveImage } from '../components/ui/responsive-image';
import productsData from '../data/products.json';
import { Product } from '../types/product';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const products = productsData as Product[];
  
  const categoryProducts = products.filter(
    product => product.category === category
  ).sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); // New products first

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

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
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      
      {/* Category Header */}
      <section className="bg-audiophile-dark py-20 tablet:py-25">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-white">{categoryName}</h1>
        </div>
      </section>

      {/* Products */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="space-y-20 tablet:space-y-25 desktop:space-y-40">
            {categoryProducts.map((product, index) => (
              <div key={product.id} className={`grid grid-cols-1 desktop:grid-cols-2 gap-8 tablet:gap-12 desktop:gap-20 items-center ${index % 2 === 1 ? 'desktop:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'desktop:col-start-2' : ''}>
                  <ResponsiveImage
                    mobile={product.categoryImage.mobile}
                    tablet={product.categoryImage.tablet}
                    desktop={product.categoryImage.desktop}
                    alt={product.name}
                    className="w-full h-80 tablet:h-96 rounded-lg"
                  />
                </div>
                <div className={`${index % 2 === 1 ? 'desktop:col-start-1' : ''} text-center desktop:text-left`}>
                  {product.new && (
                    <p className="overline mb-4 tablet:mb-6">New Product</p>
                  )}
                  <h2 className="mb-6 tablet:mb-8 text-audiophile-black max-w-md mx-auto desktop:mx-0">{product.name}</h2>
                  <p className="body mb-8 tablet:mb-10 max-w-lg mx-auto desktop:mx-0">
                    {product.description}
                  </p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="btn-primary"
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
      <section className="section-spacing border-t border-audiophile-light-gray">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 tablet:gap-8 desktop:gap-8">
            {categories.map((cat) => (
              <div key={cat.name} className="text-center group">
                <div className="category-thumbnail mb-8 relative pt-20 pb-8">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 object-contain"
                  />
                </div>
                <h6 className="mb-4 text-audiophile-black">{cat.name}</h6>
                <Link
                  to={cat.href}
                  className="inline-flex items-center text-subtitle uppercase tracking-wider text-audiophile-black opacity-50 hover:text-audiophile-orange hover:opacity-100 transition-all duration-300"
                >
                  Shop
                  <img
                    src="/assets/shared/desktop/icon-arrow-right.svg"
                    alt=""
                    className="ml-3 w-2"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
