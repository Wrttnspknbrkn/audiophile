
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { Product } from '../types/product';

const Index: React.FC = () => {
  const { dispatch } = useCart();
  const products = productsData as Product[];

  // Featured products for homepage
  const featuredProduct = products.find(p => p.slug === 'xx99-mark-two-headphones');
  const secondaryProduct = products.find(p => p.slug === 'zx9-speaker');
  const tertiaryProduct = products.find(p => p.slug === 'yx1-earphones');

  const addToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image.desktop,
        slug: product.slug,
      }
    });
  };

  const categories = [
    {
      name: 'Headphones',
      image: '/placeholder.svg',
      href: '/category/headphones'
    },
    {
      name: 'Speakers', 
      image: '/placeholder.svg',
      href: '/category/speakers'
    },
    {
      name: 'Earphones',
      image: '/placeholder.svg', 
      href: '/category/earphones'
    }
  ];

  return (
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-audiophile-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            <div className="text-center lg:text-left">
              {featuredProduct?.new && (
                <p className="overline mb-4">New Product</p>
              )}
              <h1 className="mb-6">
                {featuredProduct?.name || 'XX99 Mark II Headphones'}
              </h1>
              <p className="text-white opacity-75 text-body mb-8 max-w-md mx-auto lg:mx-0">
                {featuredProduct?.description || 'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'}
              </p>
              <Link
                to={`/product/${featuredProduct?.slug || 'xx99-mark-two-headphones'}`}
                className="btn-primary inline-block"
              >
                See Product
              </Link>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg"
                alt={featuredProduct?.name || 'XX99 Mark II Headphones'}
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="text-center group">
                <div className="bg-audiophile-light-gray rounded-lg pt-20 pb-6 mb-4 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-32 h-32 mx-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <h3 className="text-h6 mb-4">{category.name}</h3>
                <Link
                  to={category.href}
                  className="btn-tertiary group-hover:text-audiophile-orange transition-colors duration-300"
                >
                  Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {/* ZX9 Speaker */}
          {secondaryProduct && (
            <div className="bg-audiophile-orange rounded-lg p-12 lg:p-20 text-center lg:text-left">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/placeholder.svg"
                    alt={secondaryProduct.name}
                    className="w-full max-w-xs mx-auto"
                  />
                </div>
                <div>
                  <h2 className="text-white mb-6">{secondaryProduct.name}</h2>
                  <p className="text-white text-body mb-8">
                    {secondaryProduct.description}
                  </p>
                  <Link
                    to={`/product/${secondaryProduct.slug}`}
                    className="bg-audiophile-black text-white px-8 py-4 text-subtitle uppercase tracking-wider hover:bg-audiophile-dark-gray transition-all duration-300 inline-block"
                  >
                    See Product
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ZX7 Speaker */}
          <div className="bg-audiophile-light-gray rounded-lg p-12 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="mb-6">ZX7 Speaker</h3>
                <Link
                  to="/product/zx7-speaker"
                  className="btn-secondary"
                >
                  See Product
                </Link>
              </div>
              <div>
                <img
                  src="/placeholder.svg"
                  alt="ZX7 Speaker"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* YX1 Earphones */}
          {tertiaryProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-audiophile-light-gray rounded-lg p-12">
                <img
                  src="/placeholder.svg"
                  alt={tertiaryProduct.name}
                  className="w-full"
                />
              </div>
              <div className="bg-audiophile-light-gray rounded-lg p-12 flex flex-col justify-center">
                <h3 className="mb-6">{tertiaryProduct.name}</h3>
                <Link
                  to={`/product/${tertiaryProduct.slug}`}
                  className="btn-secondary"
                >
                  See Product
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <img
                src="/placeholder.svg"
                alt="Person listening to music"
                className="w-full rounded-lg"
              />
            </div>
            <div className="lg:order-1">
              <h2 className="mb-8">
                Bringing you the <span className="text-audiophile-orange">best</span> audio gear
              </h2>
              <p className="body">
                Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
                earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
                rooms available for you to browse and experience a wide range of our products. Stop by our store 
                to meet some of the fantastic people who make Audiophile the best place to buy your portable 
                audio equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
