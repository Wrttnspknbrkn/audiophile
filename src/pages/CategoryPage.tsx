
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import productsData from '../data/products.json';
import { Product } from '../types/product';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const products = productsData as Product[];
  
  const categoryProducts = products.filter(
    product => product.category === category
  );

  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-audiophile-white">
      <Header />
      
      {/* Category Header */}
      <section className="bg-audiophile-dark py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-white">{categoryName}</h1>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            {categoryProducts.map((product, index) => (
              <div key={product.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img
                    src="/placeholder.svg"
                    alt={product.name}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} text-center lg:text-left`}>
                  {product.new && (
                    <p className="overline mb-4">New Product</p>
                  )}
                  <h2 className="mb-6">{product.name}</h2>
                  <p className="body mb-8">
                    {product.description}
                  </p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="btn-primary"
                  >
                    See Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['headphones', 'speakers', 'earphones'].map((cat) => (
              <div key={cat} className="text-center group">
                <div className="bg-audiophile-light-gray rounded-lg pt-20 pb-6 mb-4 relative overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={cat}
                    className="w-32 h-32 mx-auto object-cover"
                  />
                </div>
                <h3 className="text-h6 mb-4 capitalize">{cat}</h3>
                <Link
                  to={`/category/${cat}`}
                  className="btn-tertiary group-hover:text-audiophile-orange transition-colors duration-300"
                >
                  Shop
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
