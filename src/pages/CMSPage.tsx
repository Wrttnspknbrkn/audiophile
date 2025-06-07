
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../components/cms/CMSProvider';
import { Save, ArrowLeft, Edit2, Plus, Trash2, Upload, X } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Product } from '../types/product';

interface CMSImage {
  id: string;
  url: string;
  name: string;
}

const CMSPage: React.FC = () => {
  const { content, updateContent } = useCMS();
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'categories' | 'products' | 'images'>('hero');
  const [editingContent, setEditingContent] = useState(content);
  
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('cms-products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Images state
  const [images, setImages] = useState<CMSImage[]>(() => {
    const savedImages = localStorage.getItem('cms-images');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  // Update editingContent when content changes
  useEffect(() => {
    setEditingContent(content);
  }, [content]);

  const handleSave = () => {
    if (activeTab !== 'products' && activeTab !== 'images') {
      updateContent(activeTab, editingContent[activeTab]);
    }
  };

  const handleProductSave = (product: Product) => {
    const updatedProducts = editingProduct && editingProduct.id
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, { ...product, id: Date.now() }];
    
    setProducts(updatedProducts);
    localStorage.setItem('cms-products', JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const handleProductDelete = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('cms-products', JSON.stringify(updatedProducts));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: CMSImage = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          name: file.name,
        };
        const updatedImages = [...images, newImage];
        setImages(updatedImages);
        localStorage.setItem('cms-images', JSON.stringify(updatedImages));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('cms-images', JSON.stringify(updatedImages));
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D87D4A] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4">Content Management System</h1>
          <p className="text-gray-600 mt-2">Manage your website content, products, and images</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r min-h-[600px]">
              <nav className="p-4">
                {(['hero', 'about', 'categories', 'products', 'images'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left p-3 rounded mb-2 capitalize ${
                      activeTab === tab
                        ? 'bg-[#D87D4A] text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Hero Section</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingContent.hero.subtitle}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingContent.hero.title}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, title: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={editingContent.hero.description}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, description: e.target.value }
                      }))}
                      className="w-full p-3 border rounded h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Button Text</label>
                    <input
                      type="text"
                      value={editingContent.hero.buttonText}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        hero: { ...prev.hero, buttonText: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">About Section</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={editingContent.about.title}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        about: { ...prev.about, title: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={editingContent.about.description}
                      onChange={(e) => setEditingContent(prev => ({
                        ...prev,
                        about: { ...prev.about, description: e.target.value }
                      }))}
                      className="w-full p-3 border rounded h-32"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  {editingContent.categories.map((category, index) => (
                    <div key={category.id} className="border p-4 rounded">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
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
                            className="w-full p-3 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Image URL</label>
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
                            className="w-full p-3 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Products Management</h3>
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
                      className="bg-[#D87D4A] text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Product
                    </button>
                  </div>
                  
                  {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No products yet. Add your first product!</p>
                  ) : (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category} - ${product.price}</p>
                            <p className="text-xs text-gray-500">{product.slug}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleProductDelete(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Image Gallery</h3>
                    <label className="bg-[#D87D4A] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
                      <Upload size={16} />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {images.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No images uploaded yet. Upload your first image!</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="border rounded p-2">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                          <p className="text-xs text-gray-600 truncate">{image.name}</p>
                          <div className="flex gap-1 mt-2">
                            <button
                              onClick={() => copyImageUrl(image.url)}
                              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                            >
                              Copy URL
                            </button>
                            <button
                              onClick={() => handleImageDelete(image.id)}
                              className="text-xs bg-red-500 text-white px-2 py-1 rounded"
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
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-[#D87D4A] text-white rounded hover:bg-[#FBAF85] flex items-center gap-2"
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
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, name: e.target.value }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, slug: e.target.value }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, category: e.target.value as any }))}
                    className="w-full p-3 border rounded"
                  >
                    <option value="headphones">Headphones</option>
                    <option value="speakers">Speakers</option>
                    <option value="earphones">Earphones</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct(prev => ({ ...prev!, price: Number(e.target.value) }))}
                    className="w-full p-3 border rounded"
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingProduct.new || false}
                      onChange={(e) => setEditingProduct(prev => ({ ...prev!, new: e.target.checked }))}
                    />
                    <span className="text-sm font-medium">New Product</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev!, description: e.target.value }))}
                  className="w-full p-3 border rounded h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Features</label>
                <textarea
                  value={editingProduct.features || ''}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev!, features: e.target.value }))}
                  className="w-full p-3 border rounded h-32"
                />
              </div>

              {/* Image URLs */}
              <div className="space-y-4">
                <h4 className="font-medium">Product Images</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Mobile Image</label>
                    <input
                      type="text"
                      value={editingProduct.image?.mobile || ''}
                      onChange={(e) => setEditingProduct(prev => ({ 
                        ...prev!, 
                        image: { ...prev!.image, mobile: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tablet Image</label>
                    <input
                      type="text"
                      value={editingProduct.image?.tablet || ''}
                      onChange={(e) => setEditingProduct(prev => ({ 
                        ...prev!, 
                        image: { ...prev!.image, tablet: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Desktop Image</label>
                    <input
                      type="text"
                      value={editingProduct.image?.desktop || ''}
                      onChange={(e) => setEditingProduct(prev => ({ 
                        ...prev!, 
                        image: { ...prev!.image, desktop: e.target.value }
                      }))}
                      className="w-full p-3 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 p-6 border-t">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleProductSave(editingProduct)}
                className="px-4 py-2 bg-[#D87D4A] text-white rounded hover:bg-[#FBAF85]"
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
