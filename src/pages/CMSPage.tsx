
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../components/cms/CMSProvider';
import { Save, ArrowLeft, Edit2, Plus, Trash2, Upload, X, AlertCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Product } from '../types/product';
import { toast } from '@/hooks/use-toast';

interface CMSImage {
  id: string;
  url: string;
  name: string;
}

const CMSPage: React.FC = () => {
  const { 
    content, 
    products, 
    updateContent, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory 
  } = useCMS();
  
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'categories' | 'products' | 'images'>('hero');
  const [editingContent, setEditingContent] = useState(content);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; image: string; href: string } | null>(null);
  const [images, setImages] = useState<CMSImage[]>(() => {
    const savedImages = localStorage.getItem('cms-images');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    try {
      if (activeTab !== 'products' && activeTab !== 'images') {
        updateContent(activeTab, editingContent[activeTab]);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const validateProduct = (product: Product): string | null => {
    if (!product.name?.trim()) return "Product name is required";
    if (!product.slug?.trim()) return "Product slug is required";
    if (!product.category) return "Category is required";
    if (product.price <= 0) return "Price must be greater than 0";
    if (!product.description?.trim()) return "Description is required";
    return null;
  };

  const handleProductSave = (product: Product) => {
    const validationError = validateProduct(product);
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validationError
      });
      return;
    }

    try {
      if (editingProduct && editingProduct.id) {
        updateProduct(product);
      } else {
        addProduct(product);
      }
      setEditingProduct(null);
    } catch (error) {
      console.error('Product save error:', error);
    }
  };

  const handleProductDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleCategoryDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "Error",
          description: "File size must be less than 5MB"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newImage: CMSImage = {
            id: Date.now().toString(),
            url: e.target?.result as string,
            name: file.name,
          };
          const updatedImages = [...images, newImage];
          setImages(updatedImages);
          localStorage.setItem('cms-images', JSON.stringify(updatedImages));
          
          toast({
            title: "Success",
            description: "Image uploaded successfully"
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to upload image"
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const updatedImages = images.filter(img => img.id !== id);
        setImages(updatedImages);
        localStorage.setItem('cms-images', JSON.stringify(updatedImages));
        
        toast({
          title: "Success",
          description: "Image deleted successfully"
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete image"
        });
      }
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Success",
      description: "Image URL copied to clipboard!"
    });
  };

  // Update editingContent when content changes
  React.useEffect(() => {
    setEditingContent(content);
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D87D4A] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Main Website
          </Link>
          <div className="bg-gradient-to-r from-[#D87D4A] to-[#FBAF85] text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold">Content Management System</h1>
            <p className="mt-2 opacity-90">Manage your website content, products, and media</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 bg-gray-50 border-r">
              <nav className="p-4">
                {(['hero', 'about', 'categories', 'products', 'images'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left p-3 rounded mb-2 capitalize transition-colors ${
                      activeTab === tab
                        ? 'bg-[#D87D4A] text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {tab === 'hero' && '🏠 Hero Section'}
                    {tab === 'about' && 'ℹ️ About Section'}
                    {tab === 'categories' && '📂 Categories'}
                    {tab === 'products' && '📦 Products'}
                    {tab === 'images' && '🖼️ Images'}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">Hero Section Management</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Subtitle</label>
                      <input
                        type="text"
                        value={editingContent.hero.subtitle}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          hero: { ...prev.hero, subtitle: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                        placeholder="Enter subtitle..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editingContent.hero.title}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          hero: { ...prev.hero, title: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                        placeholder="Enter title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                      <textarea
                        value={editingContent.hero.description}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          hero: { ...prev.hero, description: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                        placeholder="Enter description..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Button Text</label>
                      <input
                        type="text"
                        value={editingContent.hero.buttonText}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          hero: { ...prev.hero, buttonText: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                        placeholder="Enter button text..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">About Section Management</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
                      <input
                        type="text"
                        value={editingContent.about.title}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          about: { ...prev.about, title: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                        placeholder="Enter title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                      <textarea
                        value={editingContent.about.description}
                        onChange={(e) => setEditingContent(prev => ({
                          ...prev,
                          about: { ...prev.about, description: e.target.value }
                        }))}
                        className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                        placeholder="Enter description..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">Categories Management</h3>
                    <button
                      onClick={() => setEditingCategory({ id: '', name: '', image: '', href: '' })}
                      className="bg-[#D87D4A] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FBAF85] transition-colors"
                    >
                      <Plus size={16} />
                      Add Category
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {editingContent.categories.map((category, index) => (
                      <div key={category.id} className="border border-gray-200 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                            <input
                              type="text"
                              value={category.name}
                              onChange={(e) => {
                                const newCategories = [...editingContent.categories];
                                newCategories[index].name = e.target.value;
                                setEditingContent(prev => ({
                                  ...prev,
                                  categories: newCategories
                                }));
                              }}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Image URL</label>
                            <input
                              type="text"
                              value={category.image}
                              onChange={(e) => {
                                const newCategories = [...editingContent.categories];
                                newCategories[index].image = e.target.value;
                                setEditingContent(prev => ({
                                  ...prev,
                                  categories: newCategories
                                }));
                              }}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Link</label>
                            <input
                              type="text"
                              value={category.href}
                              onChange={(e) => {
                                const newCategories = [...editingContent.categories];
                                newCategories[index].href = e.target.value;
                                setEditingContent(prev => ({
                                  ...prev,
                                  categories: newCategories
                                }));
                              }}
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              onClick={() => handleCategoryDelete(category.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete category"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Products Management</h3>
                      <p className="text-sm text-gray-600 mt-1">Total products: {products.length}</p>
                    </div>
                    <button
                      onClick={() => setEditingProduct({
                        id: 0,
                        name: '',
                        slug: '',
                        category: 'headphones',
                        price: 0,
                        description: '',
                        new: false,
                        image: { mobile: '', tablet: '', desktop: '' },
                        categoryImage: { mobile: '', tablet: '', desktop: '' },
                        features: '',
                        includes: [],
                        gallery: {
                          first: { mobile: '', tablet: '', desktop: '' },
                          second: { mobile: '', tablet: '', desktop: '' },
                          third: { mobile: '', tablet: '', desktop: '' }
                        },
                        others: []
                      })}
                      className="bg-[#D87D4A] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#FBAF85] transition-colors"
                    >
                      <Plus size={16} />
                      Add Product
                    </button>
                  </div>
                  
                  {products.length === 0 ? (
                    <div className="text-center py-12">
                      <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">No products found. Add your first product!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {products.map((product) => (
                        <div key={product.id} className="border border-gray-200 p-4 rounded-md flex justify-between items-center hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-600 capitalize">
                              {product.category} • ${product.price.toLocaleString()}
                              {product.new && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">New</span>}
                            </p>
                            <p className="text-xs text-gray-500">Slug: {product.slug}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                              title="Edit product"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleProductDelete(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'images' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">Image Gallery</h3>
                    <label className="bg-[#D87D4A] text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:bg-[#FBAF85] transition-colors">
                      <Upload size={16} />
                      Upload Image
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {images.length === 0 ? (
                    <div className="text-center py-12">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">No images uploaded yet. Upload your first image!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {images.map((image) => (
                        <div key={image.id} className="border border-gray-200 rounded-md p-3 hover:shadow-md transition-shadow">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                          <p className="text-xs text-gray-600 truncate mb-3">{image.name}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => copyImageUrl(image.url)}
                              className="flex-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                            >
                              Copy URL
                            </button>
                            <button
                              onClick={() => handleImageDelete(image.id)}
                              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {(activeTab !== 'products' && activeTab !== 'images') && (
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-[#D87D4A] text-white rounded-md hover:bg-[#FBAF85] flex items-center gap-2 transition-colors"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-semibold">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Name *</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                    placeholder="Enter product name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Slug *</label>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, slug: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                    placeholder="product-slug"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Category *</label>
                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, category: e.target.value as any }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                  >
                    <option value="headphones">Headphones</option>
                    <option value="speakers">Speakers</option>
                    <option value="earphones">Earphones</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Price *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, price: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      checked={editingProduct.new || false}
                      onChange={(e) => setEditingProduct(prev => ({ ...prev!, new: e.target.checked }))}
                      className="rounded border-gray-300 text-[#D87D4A] focus:ring-[#D87D4A]"
                    />
                    <span className="text-sm font-medium text-gray-700">New Product</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Description *</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev!, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                  placeholder="Enter product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Features</label>
                <textarea
                  value={editingProduct.features || ''}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev!, features: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                  placeholder="Enter product features..."
                />
              </div>

              {/* Image URLs */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Product Images</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Mobile Image</label>
                    <input
                      type="text"
                      value={editingProduct.image?.mobile || ''}
                      onChange={(e) => setEditingProduct(prev => ({ 
                        ...prev!, 
                        image: { ...prev!.image, mobile: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                      placeholder="Mobile image URL..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Tablet Image</label>
                    <input
                      type="text"
                      value={editingProduct.image?.tablet || ''}
                      onChange={(e) => setEditingProduct(prev => ({ 
                        ...prev!, 
                        image: { ...prev!.image, tablet: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                      placeholder="Tablet image URL..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Desktop Image</label>
                    <input
                      type="text"
                      value={editingProduct.image?.desktop || ''}
                      onChange={(e) => setEditingProduct(prev => ({ 
                        ...prev!, 
                        image: { ...prev!.image, desktop: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D87D4A] focus:border-transparent"
                      placeholder="Desktop image URL..."
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleProductSave(editingProduct)}
                className="px-4 py-2 bg-[#D87D4A] text-white rounded-md hover:bg-[#FBAF85] transition-colors"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CMSPage;
