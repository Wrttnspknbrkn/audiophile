
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
      <header className="bg-audiophile-dark relative z-50">
        {/* Main header content */}
        <div className="max-w-[1110px] mx-auto relative">
          <div className="flex justify-between items-center h-[90px] px-6 tablet:px-[39px] desktop:px-0">
            {/* Mobile menu button */}
            <button
              className="desktop:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="tablet:absolute tablet:left-1/2 tablet:transform tablet:-translate-x-1/2 desktop:relative desktop:left-auto desktop:transform-none"
            >
              <img
                src="/assets/shared/desktop/logo.svg"
                alt="Audiophile"
                className="h-[25px] w-[143px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden desktop:flex space-x-[34px] absolute left-1/2 transform -translate-x-1/2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-white text-[13px] font-bold leading-[25px] tracking-[2px] uppercase hover:text-audiophile-orange transition-colors duration-300"
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
              <ShoppingCart size={23} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-audiophile-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="desktop:hidden absolute left-0 right-0 top-[90px] z-40">
              <div className="bg-white rounded-b-lg mx-6 tablet:mx-[39px]">
                <div className="px-6 py-[84px]">
                  <div className="grid grid-cols-1 gap-[68px]">
                    {['headphones', 'speakers', 'earphones'].map((cat) => (
                      <div key={cat} className="text-center group">
                        <div className="relative pt-[88px] pb-[22px]">
                          <img
                            src={`/assets/shared/desktop/image-category-thumbnail-${cat}.png`}
                            alt={cat}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[147px] h-[133px] object-contain"
                          />
                        </div>
                        <h6 className="mb-[17px] text-[18px] font-bold leading-[24px] tracking-[1.29px] text-audiophile-black uppercase">{cat}</h6>
                        <Link
                          to={`/category/${cat}`}
                          className="inline-flex items-center text-[13px] font-bold leading-[25px] tracking-[1px] uppercase text-audiophile-black opacity-50 hover:text-audiophile-orange hover:opacity-100 transition-all duration-300"
                          onClick={() => setIsMenuOpen(false)}
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
              </div>
            </div>
          )}
        </div>

        {/* Underline - contained within max-width for tablet/desktop */}
        <div className="desktop:max-w-[1110px] tablet:max-w-[689px] desktop:mx-auto tablet:mx-auto">
          <div className="h-[1px] bg-white opacity-20 mx-6 tablet:mx-[39px] desktop:mx-0"></div>
        </div>
      </header>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
