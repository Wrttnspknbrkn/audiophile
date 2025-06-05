
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Cart from '../cart/Cart';

const Header: React.FC = () => {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#191919] border-b border-[#979797]/20">
        <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0">
          <div className="flex items-center justify-between h-[90px] md:h-[97px]">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <img src="/assets/shared/tablet/icon-hamburger.svg" alt="Menu" className="w-4 h-4" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/assets/shared/desktop/logo.svg" alt="Audiophile" className="h-6" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-[34px]">
              <Link 
                to="/" 
                className="text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/category/headphones" 
                className="text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors"
              >
                Headphones
              </Link>
              <Link 
                to="/category/speakers" 
                className="text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors"
              >
                Speakers
              </Link>
              <Link 
                to="/category/earphones" 
                className="text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-white hover:text-[#D87D4A] transition-colors"
              >
                Earphones
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <img src="/assets/shared/desktop/icon-cart.svg" alt="Cart" className="w-6 h-6" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-[90px] left-0 right-0 bg-white z-50 px-6 py-8 shadow-lg">
              <nav className="space-y-4">
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-black hover:text-[#D87D4A] transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/category/headphones" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-black hover:text-[#D87D4A] transition-colors"
                >
                  Headphones
                </Link>
                <Link 
                  to="/category/speakers" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-black hover:text-[#D87D4A] transition-colors"
                >
                  Speakers
                </Link>
                <Link 
                  to="/category/earphones" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[13px] font-bold leading-[25px] tracking-[2px] uppercase text-black hover:text-[#D87D4A] transition-colors"
                >
                  Earphones
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Overlay */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
