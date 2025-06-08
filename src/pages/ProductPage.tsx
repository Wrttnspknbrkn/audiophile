import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ResponsiveImage } from '../components/ui/responsive-image';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { Product } from '../types/product';
import CategoriesSection from '../components/home/CategoriesSection';
import AboutSection from '../components/home/AboutSection';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const products = productsData as Product[];
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image.mobile,
        quantity,
        slug: product.slug
      }
    });
  };

  const otherProducts = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Go Back Button */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 py-4 md:py-8 lg:py-20">
        <Link
          to={`/category/${product.category}`}
          className="inline-flex items-center text-[15px] font-medium leading-[25px] text-black/50 hover:text-[#D87D4A] transition-colors mb-6 md:mb-14 lg:mb-14"
        >
          Go Back
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[125px] items-center mb-20 md:mb-24 lg:mb-40">
          <div>
            <ResponsiveImage
              mobile={product.image.mobile}
              tablet={product.image.tablet}
              desktop={product.image.desktop}
              alt={product.name}
              className="w-full h-80 md:h-96 lg:h-[560px] rounded-lg object-cover"
            />
          </div>
          <div className="lg:max-w-[445px]">
            {product.new && (
              <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase text-[#D87D4A] mb-4 lg:mb-4">New Product</p>
            )}
            <h1 className="text-[28px] md:text-[40px] font-bold leading-[32px] md:leading-[44px] tracking-[1px] md:tracking-[1.43px] uppercase text-black mb-6 md:mb-8">
              {product.name}
            </h1>
            <p className="text-[15px] font-medium leading-[25px] text-black/50 mb-6 md:mb-8">
              {product.description}
            </p>
            <p className="text-[18px] font-bold leading-[25px] tracking-[1.29px] text-black mb-8 md:mb-12">
              ${product.price.toLocaleString()}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-[#F1F1F1]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-[13px] font-bold text-black/25 hover:text-[#D87D4A] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-3 text-[13px] font-bold text-black min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-[13px] font-bold text-black/25 hover:text-[#D87D4A] transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#D87D4A] text-white px-8 py-3 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Features and In the Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-[125px] mb-20 md:mb-24 lg:mb-40">
          <div className="lg:col-span-2">
            <h3 className="text-[24px] md:text-[32px] font-bold leading-[36px] tracking-[0.86px] md:tracking-[1.14px] uppercase text-black mb-6 md:mb-8">
              Features
            </h3>
            <div className="text-[15px] font-medium leading-[25px] text-black/50 space-y-6">
              {product.features.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[24px] md:text-[32px] font-bold leading-[36px] tracking-[0.86px] md:tracking-[1.14px] uppercase text-black mb-6 md:mb-8">
              In the Box
            </h3>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[15px] font-bold leading-[25px] text-[#D87D4A] mr-6 min-w-[20px]">
                    {item.quantity}x
                  </span>
                  <span className="text-[15px] font-medium leading-[25px] text-black/50">
                    {item.item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery - Fixed responsive layout and image sizing */}
        <div className="mb-20 md:mb-24 lg:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-8">
            {/* Left column with two stacked images */}
            <div className="md:col-span-1 lg:col-span-2 space-y-4 md:space-y-5 lg:space-y-8">
              <div className="w-full">
                <ResponsiveImage
                  mobile={product.gallery.first.mobile}
                  tablet={product.gallery.first.tablet}
                  desktop={product.gallery.first.desktop}
                  alt="Product gallery"
                  className="w-full h-[180px] sm:h-[200px] md:h-[174px] lg:h-[280px] rounded-lg object-cover"
                />
              </div>
              <div className="w-full">
                <ResponsiveImage
                  mobile={product.gallery.second.mobile}
                  tablet={product.gallery.second.tablet}
                  desktop={product.gallery.second.desktop}
                  alt="Product gallery"
                  className="w-full h-[180px] sm:h-[200px] md:h-[174px] lg:h-[280px] rounded-lg object-cover"
                />
              </div>
            </div>
            {/* Right column with single large image */}
            <div className="md:col-span-1 lg:col-span-3">
              <ResponsiveImage
                mobile={product.gallery.third.mobile}
                tablet={product.gallery.third.tablet}
                desktop={product.gallery.third.desktop}
                alt="Product gallery"
                className="w-full h-[300px] sm:h-[350px] md:h-[368px] lg:h-[592px] rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* You May Also Like - Fixed image sizing and responsiveness */}
        <div className="text-center mb-16 md:mb-20 lg:mb-40">
          <h3 className="text-[24px] md:text-[32px] font-bold leading-[36px] tracking-[0.86px] md:tracking-[1.14px] uppercase text-black mb-10 md:mb-16">
            You may also like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-8">
            {product.others.map((item, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className="w-full mb-8 md:mb-10">
                  <ResponsiveImage
                    mobile={item.image.mobile}
                    tablet={item.image.tablet}
                    desktop={item.image.desktop}
                    alt={item.name}
                    className="w-full h-[200px] sm:h-[250px] md:h-[318px] lg:h-[318px] rounded-lg object-cover"
                  />
                </div>
                <h4 className="text-[24px] font-bold leading-[33px] tracking-[1.71px] uppercase text-black mb-8">
                  {item.name}
                </h4>
                <Link
                  to={`/product/${item.slug}`}
                  className="bg-[#D87D4A] text-white px-8 py-3 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-all duration-300 inline-block"
                >
                  See Product
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <CategoriesSection />

      {/* About Section */}
      <AboutSection />

      <Footer />
    </div>
  );
};

export default ProductPage;
