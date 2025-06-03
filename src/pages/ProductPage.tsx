
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h1>Product not found</h1>
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
        image: product.image.desktop,
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
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Back Button */}
        <Link
          to={`/category/${product.category}`}
          className="flex items-center text-body hover:text-audiophile-orange transition-colors mb-12"
        >
          <ChevronLeft size={20} className="mr-2" />
          Go Back
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="/placeholder.svg"
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            {product.new && (
              <p className="overline mb-4">New Product</p>
            )}
            <h1 className="text-audiophile-black mb-6">{product.name}</h1>
            <p className="body mb-8">{product.description}</p>
            <p className="text-h6 mb-8">${product.price.toLocaleString()}</p>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center bg-audiophile-light-gray">
                <button
                  onClick={() => updateQuantity(quantity - 1)}
                  className="p-4 hover:bg-gray-200 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 font-bold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(quantity + 1)}
                  className="p-4 hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} />
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h3 className="mb-8">Features</h3>
            <div className="body space-y-6">
              {product.features.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-8">In The Box</h3>
            <ul className="space-y-2">
              {product.includes.map((item, index) => (
                <li key={index} className="flex">
                  <span className="text-audiophile-orange font-bold mr-6">
                    {item.quantity}x
                  </span>
                  <span className="body">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="space-y-8">
            <img
              src="/placeholder.svg"
              alt={`${product.name} gallery 1`}
              className="w-full rounded-lg"
            />
            <img
              src="/placeholder.svg"
              alt={`${product.name} gallery 2`}
              className="w-full rounded-lg"
            />
          </div>
          <div className="lg:col-span-2">
            <img
              src="/placeholder.svg"
              alt={`${product.name} gallery 3`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* You May Also Like */}
        <section>
          <h3 className="text-center mb-12">You may also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.others.map((otherProduct) => (
              <div key={otherProduct.slug} className="text-center">
                <img
                  src="/placeholder.svg"
                  alt={otherProduct.name}
                  className="w-full rounded-lg mb-8"
                />
                <h5 className="mb-8">{otherProduct.name}</h5>
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
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['headphones', 'speakers', 'earphones'].map((cat) => (
              <div key={cat} className="text-center group">
                <div className="bg-audiophile-light-gray rounded-lg pt-20 pb-6 mb-4 relative overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={cat}
                    className="w-32 h-32 mx-auto object-cover"
                  />
                </div>
                <h3 className="text-h6 mb-4 capitalize">{cat}</h3>
                <Link
                  to={`/category/${cat}`}
                  className="btn-tertiary group-hover:text-audiophile-orange transition-colors duration-300"
                >
                  Shop
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
