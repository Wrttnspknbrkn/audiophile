
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
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
    return (
      <div className="min-h-screen bg-audiophile-white">
        <Header />
        <div className="max-w-7xl mx-auto container-padding py-20 text-center">
          <h1 className="text-audiophile-black">Product not found</h1>
          <Link to="/" className="btn-primary mt-8">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: `/assets/cart/image-${product.slug}.jpg`,
        slug: product.slug,
      }
    });
    setQuantity(1);
  };

  const updateQuantity = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  return (
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[40px] desktop:px-0 py-4 tablet:py-8 desktop:py-[79px]">
        {/* Back Button */}
        <Link
          to={`/category/${product.category}`}
          className="inline-flex items-center text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 hover:text-audiophile-orange transition-colors mb-6 tablet:mb-14 desktop:mb-14"
        >
          Go Back
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 tablet:gap-[69px] desktop:gap-[125px] items-center mb-[88px] tablet:mb-[120px] desktop:mb-[160px]">
          <div>
            <ResponsiveImage
              mobile={product.image.mobile}
              tablet={product.image.tablet}
              desktop={product.image.desktop}
              alt={product.name}
              className="w-full h-[327px] tablet:h-[480px] desktop:h-[560px] rounded-lg object-cover"
            />
          </div>
          <div className="desktop:pl-0">
            {product.new && (
              <p className="text-[14px] font-normal leading-[19px] tracking-[10px] uppercase text-audiophile-orange mb-6 tablet:mb-4 desktop:mb-4">New Product</p>
            )}
            <h1 className="text-[28px] tablet:text-[40px] desktop:text-[40px] font-bold leading-[32px] tablet:leading-[44px] desktop:leading-[44px] tracking-[1px] tablet:tracking-[1.43px] desktop:tracking-[1.43px] uppercase text-audiophile-black mb-6 tablet:mb-8 desktop:mb-6">{product.name}</h1>
            <p className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 mb-6 tablet:mb-8 desktop:mb-10">{product.description}</p>
            <p className="text-[18px] font-bold leading-[25px] tracking-[1.29px] text-audiophile-black mb-[31px] tablet:mb-[47px] desktop:mb-[47px]">${product.price.toLocaleString()}</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-audiophile-light-gray">
                <button
                  onClick={() => updateQuantity(quantity - 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors text-[13px] font-bold tracking-[1px] text-audiophile-black opacity-25 hover:text-audiophile-orange hover:opacity-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-[13px] font-bold tracking-[1px] text-audiophile-black">{quantity}</span>
                <button
                  onClick={() => updateQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors text-[13px] font-bold tracking-[1px] text-audiophile-black opacity-25 hover:text-audiophile-orange hover:opacity-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className="bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Features and In The Box */}
        <div className="grid grid-cols-1 desktop:grid-cols-3 gap-[88px] tablet:gap-[120px] desktop:gap-[125px] mb-[88px] tablet:mb-[120px] desktop:mb-[160px]">
          <div className="desktop:col-span-2">
            <h3 className="text-[24px] tablet:text-[32px] desktop:text-[32px] font-bold leading-[36px] tablet:leading-[36px] desktop:leading-[36px] tracking-[0.86px] tablet:tracking-[1.14px] desktop:tracking-[1.14px] uppercase text-audiophile-black mb-6 tablet:mb-8 desktop:mb-8">Features</h3>
            <div className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 space-y-6">
              {product.features.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[24px] tablet:text-[32px] desktop:text-[32px] font-bold leading-[36px] tablet:leading-[36px] desktop:leading-[36px] tracking-[0.86px] tablet:tracking-[1.14px] desktop:tracking-[1.14px] uppercase text-audiophile-black mb-6 tablet:mb-8 desktop:mb-8">In The Box</h3>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex">
                  <span className="text-audiophile-orange text-[15px] font-bold leading-[25px] mr-6 min-w-[24px]">
                    {item.quantity}x
                  </span>
                  <span className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-5 tablet:gap-[18px] desktop:gap-[30px] mb-[120px] tablet:mb-[120px] desktop:mb-[160px]">
          <div className="space-y-5 tablet:space-y-[18px] desktop:space-y-[30px]">
            <ResponsiveImage
              mobile={product.gallery.first.mobile}
              tablet={product.gallery.first.tablet}
              desktop={product.gallery.first.desktop}
              alt={`${product.name} gallery 1`}
              className="w-full h-[174px] tablet:h-[174px] desktop:h-[280px] rounded-lg object-cover"
            />
            <ResponsiveImage
              mobile={product.gallery.second.mobile}
              tablet={product.gallery.second.tablet}
              desktop={product.gallery.second.desktop}
              alt={`${product.name} gallery 2`}
              className="w-full h-[174px] tablet:h-[174px] desktop:h-[280px] rounded-lg object-cover"
            />
          </div>
          <div className="tablet:col-span-1 desktop:col-span-2">
            <ResponsiveImage
              mobile={product.gallery.third.mobile}
              tablet={product.gallery.third.tablet}
              desktop={product.gallery.third.desktop}
              alt={`${product.name} gallery 3`}
              className="w-full h-[368px] tablet:h-[368px] desktop:h-[592px] rounded-lg object-cover"
            />
          </div>
        </div>

        {/* You May Also Like */}
        <section className="mb-[120px] tablet:mb-[120px] desktop:mb-[160px]">
          <h3 className="text-[24px] tablet:text-[32px] desktop:text-[32px] font-bold leading-[36px] tablet:leading-[36px] desktop:leading-[36px] tracking-[0.86px] tablet:tracking-[1.14px] desktop:tracking-[1.14px] uppercase text-audiophile-black text-center mb-10 tablet:mb-14 desktop:mb-16">You may also like</h3>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-14 tablet:gap-[11px] desktop:gap-[30px]">
            {product.others.map((otherProduct) => (
              <div key={otherProduct.slug} className="text-center">
                <ResponsiveImage
                  mobile={otherProduct.image.mobile}
                  tablet={otherProduct.image.tablet}
                  desktop={otherProduct.image.desktop}
                  alt={otherProduct.name}
                  className="w-full h-[120px] tablet:h-[318px] desktop:h-[318px] rounded-lg object-cover mb-8 tablet:mb-10 desktop:mb-10"
                />
                <h5 className="text-[24px] font-bold leading-[33px] tracking-[1.7px] uppercase text-audiophile-black mb-8">{otherProduct.name}</h5>
                <Link
                  to={`/product/${otherProduct.slug}`}
                  className="bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300 inline-block"
                >
                  See Product
                </Link>
              </div>
            ))}
          </div>
        </section>
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
