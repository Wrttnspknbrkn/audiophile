import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../types/product';
import productsData from '../../data/products.json';
import { toast } from '@/hooks/use-toast';

interface CMSContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
  };
  categories: Array<{
    id: string;
    name: string;
    image: string;
    href: string;
  }>;
  featuredProducts: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
    featured: boolean;
  }>;
}

interface CMSContextType {
  content: CMSContent;
  products: Product[];
  updateContent: (section: keyof CMSContent, data: any) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  addCategory: (category: { id: string; name: string; image: string; href: string }) => void;
  updateCategory: (category: { id: string; name: string; image: string; href: string }) => void;
  deleteCategory: (id: string) => void;
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const defaultContent: CMSContent = {
  hero: {
    title: "XX99 Mark II Headphones",
    subtitle: "New Product",
    description: "Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.",
    buttonText: "See Product",
    backgroundImage: "/assets/home/desktop/image-hero.jpg"
  },
  about: {
    title: "Bringing you the best audio gear",
    description: "Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.",
    image: "/assets/shared/desktop/image-best-gear.jpg"
  },
  categories: [
    {
      id: "headphones",
      name: "Headphones",
      image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
      href: "/category/headphones"
    },
    {
      id: "speakers",
      name: "Speakers",
      image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
      href: "/category/speakers"
    },
    {
      id: "earphones",
      name: "Earphones",
      image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
      href: "/category/earphones"
    }
  ],
  featuredProducts: [
    {
      id: "zx9-speaker",
      name: "ZX9 Speaker",
      description: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.",
      image: "/assets/home/desktop/image-speaker-zx9.png",
      link: "/product/zx9-speaker",
      featured: true
    },
    {
      id: "zx7-speaker", 
      name: "ZX7 Speaker",
      description: "",
      image: "/assets/home/desktop/image-speaker-zx7.jpg",
      link: "/product/zx7-speaker",
      featured: true
    },
    {
      id: "yx1-earphones",
      name: "YX1 Earphones",
      description: "",
      image: "/assets/home/desktop/image-earphones-yx1.jpg",
      link: "/product/yx1-earphones",
      featured: true
    }
  ]
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data on mount
  useEffect(() => {
    try {
      // Load content from localStorage
      const savedContent = localStorage.getItem('cms-content');
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }

      // Load and merge products: static + CMS
      const staticProducts = productsData as Product[];
      const savedProducts = localStorage.getItem('cms-products');
      const cmsProducts = savedProducts ? JSON.parse(savedProducts) : [];
      
      // Merge static products with CMS products, ensuring no duplicates
      const allProducts = [...staticProducts];
      cmsProducts.forEach((cmsProduct: Product) => {
        if (!staticProducts.find(p => p.id === cmsProduct.id)) {
          allProducts.push(cmsProduct);
        }
      });
      
      setProducts(allProducts);
      console.log('Loaded products:', allProducts.length, 'total');
    } catch (error) {
      console.error('Failed to load CMS data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load CMS data"
      });
    }
  }, []);

  const updateContent = (section: keyof CMSContent, data: any) => {
    try {
      const newContent = { ...content, [section]: data };
      setContent(newContent);
      localStorage.setItem('cms-content', JSON.stringify(newContent));
      
      toast({
        title: "Success",
        description: `${section} updated successfully`
      });
    } catch (error) {
      console.error('Failed to update content:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update content"
      });
    }
  };

  const addProduct = (product: Product) => {
    try {
      const newProduct = { ...product, id: Date.now() };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      
      // Save only CMS products to localStorage
      const cmsProducts = updatedProducts.filter(p => !productsData.find(sp => sp.id === p.id));
      localStorage.setItem('cms-products', JSON.stringify(cmsProducts));
      
      toast({
        title: "Success",
        description: "Product added successfully"
      });
    } catch (error) {
      console.error('Failed to add product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product"
      });
    }
  };

  const updateProduct = (product: Product) => {
    try {
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      setProducts(updatedProducts);
      
      // Save only CMS products to localStorage
      const cmsProducts = updatedProducts.filter(p => !productsData.find(sp => sp.id === p.id));
      localStorage.setItem('cms-products', JSON.stringify(cmsProducts));
      
      toast({
        title: "Success",
        description: "Product updated successfully"
      });
    } catch (error) {
      console.error('Failed to update product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product"
      });
    }
  };

  const deleteProduct = (id: number) => {
    try {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      
      // Save only CMS products to localStorage
      const cmsProducts = updatedProducts.filter(p => !productsData.find(sp => sp.id === p.id));
      localStorage.setItem('cms-products', JSON.stringify(cmsProducts));
      
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product"
      });
    }
  };

  const addCategory = (category: { id: string; name: string; image: string; href: string }) => {
    try {
      const newCategories = [...content.categories, category];
      updateContent('categories', newCategories);
    } catch (error) {
      console.error('Failed to add category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add category"
      });
    }
  };

  const updateCategory = (category: { id: string; name: string; image: string; href: string }) => {
    try {
      const updatedCategories = content.categories.map(c => c.id === category.id ? category : c);
      updateContent('categories', updatedCategories);
    } catch (error) {
      console.error('Failed to update category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update category"
      });
    }
  };

  const deleteCategory = (id: string) => {
    try {
      const updatedCategories = content.categories.filter(c => c.id !== id);
      updateContent('categories', updatedCategories);
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete category"
      });
    }
  };

  return (
    <CMSContext.Provider value={{ 
      content, 
      products,
      updateContent, 
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      isLoading 
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
