
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CMSProvider } from './components/cms/CMSProvider';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import CMSPage from './pages/CMSPage';

function App() {
  return (
    <Router>
      <CMSProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cms" element={<CMSPage />} />
              <Route path="/admin" element={<CMSPage />} />
            </Routes>
            <Toaster />
          </div>
        </CartProvider>
      </CMSProvider>
    </Router>
  );
}

export default App;
