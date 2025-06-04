
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import AboutSection from '../components/home/AboutSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
