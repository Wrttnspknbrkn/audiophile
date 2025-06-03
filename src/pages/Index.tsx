
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ResponsiveImage } from '../components/ui/responsive-image';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { Product } from '../types/product';

const Index: React.FC = () => {
  const { dispatch } = useCart();
  const products = productsData as Product[];

  // Featured products for homepage
  const featuredProduct = products.find(p => p.slug === 'xx99-mark-two-headphones');
  const zx9Speaker = products.find(p => p.slug === 'zx9-speaker');
  const zx7Speaker = products.find(p => p.slug === 'zx7-speaker');
  const yx1Earphones = products.find(p => p.slug === 'yx1-earphones');

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
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-audiophile-very-dark overflow-hidden">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12 items-center py-20 desktop:py-32">
            <div className="text-center desktop:text-left order-2 desktop:order-1">
              {featuredProduct?.new && (
                <p className="overline mb-6 text-audiophile-white opacity-50">New Product</p>
              )}
              <h1 className="mb-6 text-white">
                {featuredProduct?.name || 'XX99 Mark II Headphones'}
              </h1>
              <p className="text-white opacity-75 text-body mb-10 max-w-md mx-auto desktop:mx-0">
                {featuredProduct?.description || 'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'}
              </p>
              <Link
                to={`/product/${featuredProduct?.slug || 'xx99-mark-two-headphones'}`}
                className="btn-primary inline-block"
              >
                See Product
              </Link>
            </div>
            <div className="text-center order-1 desktop:order-2">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-header.jpg"
                tablet="/assets/home/tablet/image-header.jpg"
                desktop="/assets/home/desktop/image-hero.jpg"
                alt={featuredProduct?.name || 'XX99 Mark II Headphones'}
                className="w-full max-w-md mx-auto desktop:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 tablet:gap-10 desktop:gap-8">
            {categories.map((category) => (
              <div key={category.name} className="text-center group">
                <div className="category-thumbnail mb-8 relative pt-20 pb-8">
                  <ResponsiveImage
                    mobile={category.image.mobile}
                    tablet={category.image.tablet}
                    desktop={category.image.desktop}
                    alt={category.name}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 object-contain"
                  />
                </div>
                <h6 className="mb-4">{category.name}</h6>
                <Link
                  to={category.href}
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

      {/* Featured Products */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto container-padding space-y-12 desktop:space-y-20">
          {/* ZX9 Speaker */}
          {zx9Speaker && (
            <div className="bg-audiophile-orange rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 opacity-20">
                <img
                  src="/assets/home/desktop/pattern-circles.svg"
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative grid grid-cols-1 desktop:grid-cols-2 gap-12 items-end p-12 desktop:p-24">
                <div className="text-center desktop:text-left">
                  <ResponsiveImage
                    mobile="/assets/home/mobile/image-speaker-zx9.png"
                    tablet="/assets/home/tablet/image-speaker-zx9.png"
                    desktop="/assets/home/desktop/image-speaker-zx9.png"
                    alt={zx9Speaker.name}
                    className="w-full max-w-xs mx-auto desktop:mx-0"
                  />
                </div>
                <div className="text-center desktop:text-left">
                  <h2 className="text-white mb-6">{zx9Speaker.name}</h2>
                  <p className="text-white text-body mb-10 opacity-75">
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                  </p>
                  <Link
                    to={`/product/${zx9Speaker.slug}`}
                    className="bg-audiophile-black text-white px-8 py-4 text-subtitle uppercase tracking-wider hover:bg-audiophile-dark-gray transition-all duration-300 inline-block"
                  >
                    See Product
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ZX7 Speaker */}
          {zx7Speaker && (
            <div className="rounded-lg overflow-hidden relative">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-speaker-zx7.jpg"
                tablet="/assets/home/tablet/image-speaker-zx7.jpg"
                desktop="/assets/home/desktop/image-speaker-zx7.jpg"
                alt={zx7Speaker.name}
                className="w-full h-80 desktop:h-96"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container-padding w-full">
                  <div className="max-w-md">
                    <h4 className="mb-8">{zx7Speaker.name}</h4>
                    <Link
                      to={`/product/${zx7Speaker.slug}`}
                      className="btn-secondary"
                    >
                      See Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* YX1 Earphones */}
          {yx1Earphones && (
            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-12">
              <div className="rounded-lg overflow-hidden">
                <ResponsiveImage
                  mobile="/assets/home/mobile/image-earphones-yx1.jpg"
                  tablet="/assets/home/tablet/image-earphones-yx1.jpg"
                  desktop="/assets/home/desktop/image-earphones-yx1.jpg"
                  alt={yx1Earphones.name}
                  className="w-full h-80"
                />
              </div>
              <div className="bg-audiophile-light-gray rounded-lg p-12 desktop:p-24 flex flex-col justify-center">
                <h4 className="mb-8">{yx1Earphones.name}</h4>
                <Link
                  to={`/product/${yx1Earphones.slug}`}
                  className="btn-secondary w-fit"
                >
                  See Product
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-12 desktop:gap-20 items-center">
            <div className="desktop:order-2">
              <ResponsiveImage
                mobile="/assets/shared/mobile/image-best-gear.jpg"
                tablet="/assets/shared/tablet/image-best-gear.jpg"
                desktop="/assets/shared/desktop/image-best-gear.jpg"
                alt="Person listening to music"
                className="w-full rounded-lg"
              />
            </div>
            <div className="desktop:order-1 text-center desktop:text-left">
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
