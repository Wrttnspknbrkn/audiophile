
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ResponsiveImage } from '../components/ui/responsive-image';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { Product } from '../types/product';

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
      
      <div className="max-w-7xl mx-auto container-padding py-8 tablet:py-12 desktop:py-20">
        {/* Back Button */}
        <Link
          to={`/category/${product.category}`}
          className="flex items-center text-body hover:text-audiophile-orange transition-colors mb-8 tablet:mb-12"
        >
          <ChevronLeft size={20} className="mr-2" />
          Go Back
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 tablet:gap-12 desktop:gap-20 items-center mb-20 tablet:mb-25 desktop:mb-40">
          <div>
            <ResponsiveImage
              mobile={product.image.mobile}
              tablet={product.image.tablet}
              desktop={product.image.desktop}
              alt={product.name}
              className="w-full h-80 tablet:h-96 rounded-lg"
            />
          </div>
          <div className="text-center desktop:text-left">
            {product.new && (
              <p className="overline mb-4 tablet:mb-6">New Product</p>
            )}
            <h1 className="text-audiophile-black mb-6 tablet:mb-8 max-w-md mx-auto desktop:mx-0">{product.name}</h1>
            <p className="body mb-6 tablet:mb-8 max-w-lg mx-auto desktop:mx-0">{product.description}</p>
            <p className="text-h6 text-audiophile-black mb-8 tablet:mb-10">${product.price.toLocaleString()}</p>
            
            <div className="flex items-center justify-center desktop:justify-start space-x-4 mb-8 tablet:mb-10">
              <div className="flex items-center bg-audiophile-light-gray">
                <button
                  onClick={() => updateQuantity(quantity - 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} className="text-audiophile-dark-gray" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-bold text-audiophile-black">{quantity}</span>
                <button
                  onClick={() => updateQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} className="text-audiophile-dark-gray" />
                </button>
              </div>
              <button
                onClick={addToCart}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Features and In The Box */}
        <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8 tablet:gap-12 desktop:gap-20 mb-20 tablet:mb-25 desktop:mb-40">
          <div className="desktop:col-span-2">
            <h3 className="mb-6 tablet:mb-8 text-audiophile-black">Features</h3>
            <div className="body space-y-6">
              {product.features.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="text-center desktop:text-left">
            <h3 className="mb-6 tablet:mb-8 text-audiophile-black">In The Box</h3>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex justify-center desktop:justify-start">
                  <span className="text-audiophile-orange font-bold mr-6 w-8">
                    {item.quantity}x
                  </span>
                  <span className="body flex-1 text-left">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 tablet:gap-8 mb-20 tablet:mb-25 desktop:mb-40">
          <div className="space-y-6 tablet:space-y-8">
            <ResponsiveImage
              mobile={product.gallery.first.mobile}
              tablet={product.gallery.first.tablet}
              desktop={product.gallery.first.desktop}
              alt={`${product.name} gallery 1`}
              className="w-full h-48 tablet:h-64 rounded-lg"
            />
            <ResponsiveImage
              mobile={product.gallery.second.mobile}
              tablet={product.gallery.second.tablet}
              desktop={product.gallery.second.desktop}
              alt={`${product.name} gallery 2`}
              className="w-full h-48 tablet:h-64 rounded-lg"
            />
          </div>
          <div className="tablet:col-span-1 desktop:col-span-2">
            <ResponsiveImage
              mobile={product.gallery.third.mobile}
              tablet={product.gallery.third.tablet}
              desktop={product.gallery.third.desktop}
              alt={`${product.name} gallery 3`}
              className="w-full h-96 tablet:h-full rounded-lg"
            />
          </div>
        </div>

        {/* You May Also Like */}
        <section className="mb-20 tablet:mb-25 desktop:mb-40">
          <h3 className="text-center mb-12 tablet:mb-16 text-audiophile-black">You may also like</h3>
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 tablet:gap-8 desktop:gap-12">
            {product.others.map((otherProduct) => (
              <div key={otherProduct.slug} className="text-center">
                <ResponsiveImage
                  mobile={otherProduct.image.mobile}
                  tablet={otherProduct.image.tablet}
                  desktop={otherProduct.image.desktop}
                  alt={otherProduct.name}
                  className="w-full h-80 rounded-lg mb-8"
                />
                <h5 className="mb-8 text-audiophile-black">{otherProduct.name}</h5>
                <Link
                  to={`/product/${otherProduct.slug}`}
                  className="btn-primary"
                >
                  See Product
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-t border-audiophile-light-gray pt-20 tablet:pt-25 desktop:pt-40">
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
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
