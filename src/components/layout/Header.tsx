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
      <header className="bg-audiophile-dark border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white"
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
            <nav className="hidden lg:flex space-x-8">
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
            <div className="lg:hidden py-4 border-t border-white border-opacity-20">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-white text-subtitle uppercase tracking-wider hover:text-audiophile-orange transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute top-24 right-6 max-w-sm w-full">
            <Cart onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
