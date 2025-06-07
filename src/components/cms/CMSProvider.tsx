
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../types/product';

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
  updateContent: (section: keyof CMSContent, data: any) => void;
  isLoading: boolean;
  products: Product[];
  updateProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
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

  // Load content and products from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('cms-content');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Failed to parse saved CMS content:', error);
      }
    }

    const savedProducts = localStorage.getItem('cms-products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Failed to parse saved CMS products:', error);
      }
    }
  }, []);

  const updateContent = (section: keyof CMSContent, data: any) => {
    const newContent = {
      ...content,
      [section]: data
    };
    setContent(newContent);
    localStorage.setItem('cms-content', JSON.stringify(newContent));
  };

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('cms-products', JSON.stringify(newProducts));
  };

  const addProduct = (product: Product) => {
    const newProduct = { ...product, id: Date.now() };
    const newProducts = [...products, newProduct];
    updateProducts(newProducts);
  };

  const updateProduct = (product: Product) => {
    const newProducts = products.map(p => p.id === product.id ? product : p);
    updateProducts(newProducts);
  };

  const deleteProduct = (id: number) => {
    const newProducts = products.filter(p => p.id !== id);
    updateProducts(newProducts);
  };

  return (
    <CMSContext.Provider value={{ 
      content, 
      updateContent, 
      isLoading, 
      products, 
      updateProducts, 
      addProduct, 
      updateProduct, 
      deleteProduct 
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
