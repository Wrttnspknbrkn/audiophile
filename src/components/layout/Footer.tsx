
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Headphones', href: '/category/headphones' },
    { name: 'Speakers', href: '/category/speakers' },
    { name: 'Earphones', href: '/category/earphones' },
  ];

  return (
    <footer className="bg-audiophile-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Orange accent line */}
        <div className="w-24 h-1 bg-audiophile-orange mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Logo and Navigation */}
          <div>
            <Link to="/" className="inline-block mb-8">
              <span className="text-white font-bold text-2xl">audiophile</span>
            </Link>
            
            <nav className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0">
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
          </div>

          {/* Company Description */}
          <div className="lg:text-right">
            <p className="text-white opacity-50 text-body mb-8 lg:mb-12">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers 
              and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
              visit our demo facility - we're open 7 days a week.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 lg:justify-end">
              <a href="#" className="text-white hover:text-audiophile-orange transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-audiophile-orange transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-audiophile-orange transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-10">
          <p className="text-white opacity-50 text-body">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
