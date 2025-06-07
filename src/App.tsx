
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { CMSProvider } from './components/cms/CMSProvider';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import CMSPage from './pages/CMSPage';
import NotFound from './pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cms" element={<CMSPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </CartProvider>
      </CMSProvider>
    </QueryClientProvider>
  );
}

export default App;
