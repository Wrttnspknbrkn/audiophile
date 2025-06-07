
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../components/cms/CMSProvider';
import { Save, ArrowLeft, Edit2, Plus, Trash2, Upload, X, ImageIcon } from 'lucide-react';
import { Product } from '../types/product';
import { useToast } from '../hooks/use-toast';

interface CMSImage {
  id: string;
  url: string;
  name: string;
}

const CMSPage: React.FC = () => {
  const { content, updateContent, products, addProduct, updateProduct, deleteProduct } = useCMS();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'categories' | 'products' | 'images'>('hero');
  const [editingContent, setEditingContent] = useState(content);
  
  // Products state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Images state
  const [images, setImages] = useState<CMSImage[]>(() => {
    const savedImages = localStorage.getItem('cms-images');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  // Category editing state
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Update editingContent when content changes
  useEffect(() => {
    setEditingContent(content);
  }, [content]);

  const handleSave = () => {
    if (activeTab !== 'products' && activeTab !== 'images') {
      updateContent(activeTab, editingContent[activeTab]);
      toast({
        title: "Content saved successfully!",
        description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section has been updated.`,
      });
    }
  };

  const handleProductSave = (product: Product) => {
    if (editingProduct && editingProduct.id) {
      updateProduct(product);
      toast({
        title: "Product updated successfully!",
        description: `${product.name} has been updated.`,
      });
    } else {
      addProduct(product);
      toast({
        title: "Product created successfully!",
        description: `${product.name} has been created.`,
      });
    }
    setEditingProduct(null);
  };

  const handleProductDelete = (id: number) => {
    deleteProduct(id);
    toast({
      title: "Product deleted",
      description: "The product has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleCategorySave = (category: any) => {
    const updatedCategories = editingCategory && editingCategory.id
      ? editingContent.categories.map(c => c.id === category.id ? category : c)
      : [...editingContent.categories, { ...category, id: Date.now().toString() }];
    
    setEditingContent(prev => ({
      ...prev,
      categories: updatedCategories
    }));
    
    updateContent('categories', updatedCategories);
    setEditingCategory(null);
    
    toast({
      title: "Category saved successfully!",
      description: `${category.name} has been ${editingCategory && editingCategory.id ? 'updated' : 'created'}.`,
    });
  };

  const handleCategoryDelete = (id: string) => {
    const updatedCategories = editingContent.categories.filter(c => c.id !== id);
    setEditingContent(prev => ({
      ...prev,
      categories: updatedCategories
    }));
    updateContent('categories', updatedCategories);
    
    toast({
      title: "Category deleted",
      description: "The category has been removed successfully.",
      variant: "destructive",
    });
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
        
        toast({
          title: "Image uploaded successfully!",
          description: `${file.name} has been added to your gallery.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('cms-images', JSON.stringify(updatedImages));
    
    toast({
      title: "Image deleted",
      description: "The image has been removed from your gallery.",
      variant: "destructive",
    });
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied!",
      description: "Image URL has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Standalone CMS Header */}
      <div className="bg-white shadow-sm border-b w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#D87D4A] transition-colors mb-4"
              >
                <ArrowLeft size={20} />
                Back to Website
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Content Management System</h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your website content, products, and images</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r min-h-[200px] lg:min-h-[600px]">
              <nav className="p-4">
                <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
                  {(['hero', 'about', 'categories', 'products', 'images'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full text-left p-2 lg:p-3 rounded text-xs sm:text-sm lg:text-base capitalize ${
                        activeTab === tab
                          ? 'bg-[#D87D4A] text-white'
                          : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 sm:p-6">
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
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-lg font-semibold">Categories Management</h3>
                    <button
                      onClick={() => setEditingCategory({
                        id: '',
                        name: '',
                        image: '',
                        href: ''
                      })}
                      className="bg-[#D87D4A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                    >
                      <Plus size={16} />
                      Add Category
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {editingContent.categories.map((category) => (
                      <div key={category.id} className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-gray-600">{category.href}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleCategoryDelete(category.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Products Management</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Total products: {products.length}
                      </p>
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
                      className="bg-[#D87D4A] text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                    >
                      <Plus size={16} />
                      Add Product
                    </button>
                  </div>
                  
                  {products.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No products found. Add your first product!</p>
                  ) : (
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <div className="flex items-center gap-4">
                            {product.image?.desktop && (
                              <img 
                                src={product.image.desktop} 
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{product.name}</h4>
                              <p className="text-sm text-gray-600">{product.category} - ${product.price}</p>
                              <p className="text-xs text-gray-500">{product.slug}</p>
                              {product.new && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mt-1 inline-block">
                                  New Product
                                </span>
                              )}
                            </div>
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
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-lg font-semibold">Image Gallery</h3>
                    <label className="bg-[#D87D4A] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer text-sm">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

              {(activeTab !== 'products' && activeTab !== 'images' && activeTab !== 'categories') && (
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

      {/* Category Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editingCategory.id ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev!, name: e.target.value }))}
                  className="w-full p-3 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category URL/Path</label>
                <input
                  type="text"
                  value={editingCategory.href || ''}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev!, href: e.target.value }))}
                  className="w-full p-3 border rounded"
                  placeholder="/category/example"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category Image URL</label>
                <input
                  type="text"
                  value={editingCategory.image || ''}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev!, image: e.target.value }))}
                  className="w-full p-3 border rounded"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {editingCategory.image && (
                <div>
                  <label className="block text-sm font-medium mb-2">Preview</label>
                  <img 
                    src={editingCategory.image} 
                    alt="Category preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4 p-6 border-t">
              <button
                onClick={() => setEditingCategory(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCategorySave(editingCategory)}
                className="px-4 py-2 bg-[#D87D4A] text-white rounded hover:bg-[#FBAF85]"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
    </div>
  );
};

export default CMSPage;
