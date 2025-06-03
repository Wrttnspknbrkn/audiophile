
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from '../cart/Cart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Headphones', href: '/category/headphones' },
    { name: 'Speakers', href: '/category/speakers' },
    { name: 'Earphones', href: '/category/earphones' },
  ];

  return (
    <>
      <header className="bg-audiophile-dark">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex justify-between items-center h-24 border-b border-white border-opacity-20">
            {/* Mobile menu button */}
            <button
              className="tablet:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/assets/shared/desktop/logo.svg"
                alt="Audiophile"
                className="h-6 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden desktop:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white text-subtitle uppercase tracking-wider hover:text-audiophile-orange transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Cart button */}
            <button
              className="text-white relative hover:text-audiophile-orange transition-colors duration-300"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-audiophile-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="tablet:hidden py-8 bg-white absolute left-0 right-0 top-24 z-40 rounded-b-lg">
              <div className="container-padding">
                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-16">
                  {['headphones', 'speakers', 'earphones'].map((cat) => (
                    <div key={cat} className="text-center group">
                      <div className="category-thumbnail mb-4 relative pt-20 pb-8">
                        <img
                          src={`/assets/shared/desktop/image-category-thumbnail-${cat}.png`}
                          alt={cat}
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 object-contain"
                        />
                      </div>
                      <h6 className="mb-4 text-audiophile-black capitalize">{cat}</h6>
                      <Link
                        to={`/category/${cat}`}
                        className="inline-flex items-center text-subtitle uppercase tracking-wider text-audiophile-black opacity-50 hover:text-audiophile-orange hover:opacity-100 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
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
            </div>
          )}
        </div>
      </header>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
