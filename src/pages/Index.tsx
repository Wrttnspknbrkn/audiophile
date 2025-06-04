
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
      <section className="bg-audiophile-dark overflow-hidden">
        {/* Mobile Hero */}
        <div className="desktop:hidden">
          <div className="relative">
            <ResponsiveImage
              mobile="/assets/home/mobile/image-header.jpg"
              tablet="/assets/home/tablet/image-header.jpg"
              desktop="/assets/home/desktop/image-hero.jpg"
              alt="XX99 Mark II Headphones"
              className="w-full h-[600px] tablet:h-[729px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6 tablet:px-[197px]">
                <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase mb-4 tablet:mb-6 text-audiophile-white opacity-50">New Product</p>
                <h1 className="text-[36px] tablet:text-[56px] font-bold leading-[40px] tablet:leading-[58px] tracking-[1.29px] tablet:tracking-[2px] uppercase text-white mb-6 max-w-[328px] tablet:max-w-[400px] mx-auto">
                  XX99 Mark II<br />Headphones
                </h1>
                <p className="text-white opacity-75 text-[15px] font-medium leading-[25px] mb-[28px] tablet:mb-10 max-w-[328px] tablet:max-w-[349px] mx-auto">
                  Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                </p>
                <Link
                  to="/product/xx99-mark-two-headphones"
                  className="inline-block bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden desktop:block">
          <div className="max-w-[1110px] mx-auto">
            <div className="grid grid-cols-2 items-center min-h-[729px]">
              {/* Text Content */}
              <div>
                <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase mb-6 text-audiophile-white opacity-50">New Product</p>
                <h1 className="text-[56px] font-bold leading-[58px] tracking-[2px] uppercase text-white mb-6 max-w-[400px]">
                  XX99 Mark II<br />Headphones
                </h1>
                <p className="text-white opacity-75 text-[15px] font-medium leading-[25px] mb-10 max-w-[349px]">
                  Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
                </p>
                <Link
                  to="/product/xx99-mark-two-headphones"
                  className="inline-block bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
                >
                  See Product
                </Link>
              </div>

              {/* Hero Image */}
              <div className="flex justify-end">
                <img
                  src="/assets/home/desktop/image-hero.jpg"
                  alt="XX99 Mark II Headphones"
                  className="w-[410px] h-[729px] object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* Featured Products */}
      <section className="pb-[120px] tablet:pb-[96px] desktop:pb-[200px]">
        <div className="max-w-[1110px] mx-auto px-6 tablet:px-[39px] desktop:px-0 space-y-6 tablet:space-y-8 desktop:space-y-12">
          {/* ZX9 Speaker */}
          <div className="bg-audiophile-orange rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <img
                src="/assets/home/desktop/pattern-circles.svg"
                alt=""
                className="absolute -top-20 -left-40 w-full h-full object-cover scale-150"
              />
            </div>
            <div className="relative grid grid-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-12 items-end p-8 tablet:p-12 desktop:p-24">
              <div className="text-center desktop:text-left order-2 desktop:order-1">
                <ResponsiveImage
                  mobile="/assets/home/mobile/image-speaker-zx9.png"
                  tablet="/assets/home/tablet/image-speaker-zx9.png"
                  desktop="/assets/home/desktop/image-speaker-zx9.png"
                  alt="ZX9 Speaker"
                  className="w-48 tablet:w-56 desktop:w-80 mx-auto desktop:mx-0"
                />
              </div>
              <div className="text-center desktop:text-left order-1 desktop:order-2">
                <h2 className="text-white mb-6 max-w-xs mx-auto desktop:mx-0">ZX9 Speaker</h2>
                <p className="text-white text-body mb-8 tablet:mb-10 opacity-75 max-w-sm mx-auto desktop:mx-0">
                  Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                </p>
                <Link
                  to="/product/zx9-speaker"
                  className="bg-audiophile-black text-white px-8 py-4 text-subtitle uppercase tracking-wider hover:bg-audiophile-dark-gray transition-all duration-300 inline-block"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>

          {/* ZX7 Speaker */}
          <div className="rounded-lg overflow-hidden relative">
            <ResponsiveImage
              mobile="/assets/home/mobile/image-speaker-zx7.jpg"
              tablet="/assets/home/tablet/image-speaker-zx7.jpg"
              desktop="/assets/home/desktop/image-speaker-zx7.jpg"
              alt="ZX7 Speaker"
              className="w-full h-80 desktop:h-96"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 tablet:px-10 desktop:px-24 w-full">
                <div className="max-w-md">
                  <h4 className="mb-8 text-audiophile-black">ZX7 Speaker</h4>
                  <Link
                    to="/product/zx7-speaker"
                    className="btn-secondary"
                  >
                    See Product
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* YX1 Earphones */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 tablet:gap-8 desktop:gap-12">
            <div className="rounded-lg overflow-hidden">
              <ResponsiveImage
                mobile="/assets/home/mobile/image-earphones-yx1.jpg"
                tablet="/assets/home/tablet/image-earphones-yx1.jpg"
                desktop="/assets/home/desktop/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                className="w-full h-80"
              />
            </div>
            <div className="bg-audiophile-light-gray rounded-lg p-8 tablet:p-12 desktop:p-24 flex flex-col justify-center">
              <h4 className="mb-8 text-audiophile-black">YX1 Earphones</h4>
              <Link
                to="/product/yx1-earphones"
                className="btn-secondary w-fit"
              >
                See Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="pb-20 tablet:pb-24 desktop:pb-40">
        <div className="max-w-7xl mx-auto px-6 tablet:px-10 desktop:px-40">
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 tablet:gap-12 desktop:gap-20 items-center">
            <div className="desktop:order-2">
              <ResponsiveImage
                mobile="/assets/shared/mobile/image-best-gear.jpg"
                tablet="/assets/shared/tablet/image-best-gear.jpg"
                desktop="/assets/shared/desktop/image-best-gear.jpg"
                alt="Person listening to music"
                className="w-full h-80 tablet:h-96 rounded-lg"
              />
            </div>
            <div className="desktop:order-1 text-center desktop:text-left">
              <h2 className="mb-8 text-audiophile-black">
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
