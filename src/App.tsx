
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CMSProvider } from "./components/cms/CMSProvider";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import CMSPage from "./pages/CMSPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CMSProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Main Website Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* CMS Admin Routes */}
              <Route path="/admin" element={<CMSPage />} />
              <Route path="/cms" element={<CMSPage />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </CMSProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
