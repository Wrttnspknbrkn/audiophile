
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const vatAmount = state.total * 0.2;
  const shipping = 50;
  const grandTotal = state.total + vatAmount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderComplete(true);
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-audiophile-white">
        <Header />
        <div className="max-w-md mx-auto px-6 py-20">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-audiophile-orange rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="mb-4">Thank you for your order</h2>
            <p className="body mb-8">You will receive an email confirmation shortly.</p>
            <div className="bg-audiophile-light-gray p-4 rounded mb-6">
              {state.items.slice(0, 1).map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-body text-xs">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-body">x{item.quantity}</span>
                </div>
              ))}
              {state.items.length > 1 && (
                <p className="text-body text-center mt-4">
                  and {state.items.length - 1} other item{state.items.length > 2 ? 's' : ''}
                </p>
              )}
            </div>
            <div className="text-left mb-6">
              <p className="flex justify-between mb-2">
                <span className="text-body">Grand Total</span>
                <span className="font-bold">${grandTotal.toLocaleString()}</span>
              </p>
            </div>
            <Link
              to="/"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="btn-primary w-full"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-audiophile-light-gray">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <Link
          to="/"
          className="flex items-center text-body hover:text-audiophile-orange transition-colors mb-12"
        >
          <ChevronLeft size={20} className="mr-2" />
          Go Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg">
            <h1 className="text-h3 mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              {/* Billing Details */}
              <div className="mb-8">
                <h3 className="subtitle mb-4">Billing Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="Alexei Ward"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="alexei@mail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="+1 202-555-0136"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-8">
                <h3 className="subtitle mb-4">Shipping Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="1137 Williams Avenue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-8">
                <h3 className="subtitle mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="e-money"
                          checked={formData.paymentMethod === 'e-money'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        e-Money
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                  {formData.paymentMethod === 'e-money' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">e-Money Number</label>
                        <input
                          type="text"
                          name="eMoneyNumber"
                          value={formData.eMoneyNumber}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                          placeholder="238521993"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">e-Money PIN</label>
                        <input
                          type="text"
                          name="eMoneyPin"
                          value={formData.eMoneyPin}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-gray-300 rounded focus:border-audiophile-orange focus:outline-none"
                          placeholder="6891"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Continue & Pay
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg h-fit">
            <h3 className="text-h6 mb-6">Summary</h3>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-body text-sm">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-body">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-body">Total</span>
                <span className="font-bold">${state.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body">Shipping</span>
                <span className="font-bold">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body">VAT (Included)</span>
                <span className="font-bold">${Math.round(vatAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="text-body">Grand Total</span>
                <span className="font-bold text-audiophile-orange">${Math.round(grandTotal).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
