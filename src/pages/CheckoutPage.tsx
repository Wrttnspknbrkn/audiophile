
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Wrong format';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Wrong format';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // ZIP Code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // e-Money validation
    if (formData.paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber.trim()) {
        newErrors.eMoneyNumber = 'e-Money Number is required';
      }
      if (!formData.eMoneyPin.trim()) {
        newErrors.eMoneyPin = 'e-Money PIN is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const vatAmount = state.total * 0.2;
  const shipping = 50;
  const grandTotal = state.total + vatAmount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsOrderComplete(true);
    }
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-audiophile-white">
        <Header />
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white p-8 tablet:p-12 rounded-lg max-w-[540px] w-full">
            <div className="w-16 h-16 bg-audiophile-orange rounded-full flex items-center justify-center mb-[23px]">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            </div>
            <h2 className="text-[24px] tablet:text-[32px] font-bold leading-[28px] tablet:leading-[36px] tracking-[0.86px] tablet:tracking-[1.14px] uppercase text-audiophile-black mb-4 tablet:mb-6">Thank you<br />for your order</h2>
            <p className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 mb-6 tablet:mb-[33px]">You will receive an email confirmation shortly.</p>
            
            <div className="flex flex-col tablet:flex-row rounded-lg overflow-hidden mb-6 tablet:mb-[46px]">
              <div className="bg-audiophile-light-gray p-6 tablet:flex-1">
                {state.items.slice(0, 1).map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-[50px] h-[50px] rounded object-cover" />
                      <div>
                        <p className="text-[15px] font-bold leading-[25px] text-audiophile-black">{item.name.split(' ').slice(0, 2).join(' ')}</p>
                        <p className="text-[14px] font-bold leading-[25px] text-audiophile-black opacity-50">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-[15px] font-bold leading-[25px] text-audiophile-black opacity-50">x{item.quantity}</span>
                  </div>
                ))}
                {state.items.length > 1 && (
                  <>
                    <hr className="my-3 border-audiophile-black opacity-8" />
                    <p className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black opacity-50 text-center">
                      and {state.items.length - 1} other item{state.items.length > 2 ? 's' : ''}
                    </p>
                  </>
                )}
              </div>
              <div className="bg-audiophile-black p-6 tablet:w-[198px] flex flex-col justify-end">
                <p className="text-[15px] font-medium leading-[25px] text-white opacity-50 mb-2">Grand Total</p>
                <p className="text-[18px] font-bold leading-[25px] text-white">${Math.round(grandTotal).toLocaleString()}</p>
              </div>
            </div>
            
            <Link
              to="/"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300 w-full text-center block"
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
      
      <div className="max-w-[1110px] mx-auto px-6 tablet:px-[40px] desktop:px-0 py-4 tablet:py-8 desktop:py-[79px]">
        <Link
          to="/"
          className="inline-flex items-center text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 hover:text-audiophile-orange transition-colors mb-6 tablet:mb-14 desktop:mb-14"
        >
          Go Back
        </Link>

        <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8 desktop:gap-[30px]">
          {/* Checkout Form */}
          <div className="desktop:col-span-2 bg-white p-6 tablet:p-[48px] rounded-lg">
            <h1 className="text-[28px] tablet:text-[32px] font-bold leading-[32px] tablet:leading-[36px] tracking-[1px] tablet:tracking-[1.14px] uppercase text-audiophile-black mb-[41px] tablet:mb-[41px]">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              {/* Billing Details */}
              <div className="mb-[53px]">
                <h3 className="text-[13px] font-bold leading-[25px] tracking-[0.93px] uppercase text-audiophile-orange mb-4">Billing Details</h3>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">Name</label>
                      {errors.name && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.name}</span>}
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.name ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="Alexei Ward"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">Email Address</label>
                      {errors.email && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.email}</span>}
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.email ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="alexei@mail.com"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">Phone Number</label>
                      {errors.phone && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.phone}</span>}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.phone ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="+1 202-555-0136"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-[53px]">
                <h3 className="text-[13px] font-bold leading-[25px] tracking-[0.93px] uppercase text-audiophile-orange mb-4">Shipping Info</h3>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  <div className="tablet:col-span-2">
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">Address</label>
                      {errors.address && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.address}</span>}
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.address ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="1137 Williams Avenue"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">ZIP Code</label>
                      {errors.zipCode && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.zipCode}</span>}
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.zipCode ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">City</label>
                      {errors.city && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.city}</span>}
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.city ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">Country</label>
                      {errors.country && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.country}</span>}
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.country ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold leading-[25px] tracking-[0.93px] uppercase text-audiophile-orange mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black mb-[17px] block">Payment Method</label>
                    <div className="space-y-4">
                      <label className={`flex items-center p-[18px] border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'e-money' ? 'border-audiophile-orange' : 'border-[#CFCFCF]'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="e-money"
                          checked={formData.paymentMethod === 'e-money'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-audiophile-orange bg-white border-[#CFCFCF] focus:ring-audiophile-orange focus:ring-2 mr-4"
                        />
                        <span className="text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black">e-Money</span>
                      </label>
                      <label className={`flex items-center p-[18px] border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'cash' ? 'border-audiophile-orange' : 'border-[#CFCFCF]'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-audiophile-orange bg-white border-[#CFCFCF] focus:ring-audiophile-orange focus:ring-2 mr-4"
                        />
                        <span className="text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                  {formData.paymentMethod === 'e-money' && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-[9px]">
                          <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">e-Money Number</label>
                          {errors.eMoneyNumber && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.eMoneyNumber}</span>}
                        </div>
                        <input
                          type="text"
                          name="eMoneyNumber"
                          value={formData.eMoneyNumber}
                          onChange={handleInputChange}
                          className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.eMoneyNumber ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                          placeholder="238521993"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-[9px]">
                          <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-audiophile-black">e-Money PIN</label>
                          {errors.eMoneyPin && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.eMoneyPin}</span>}
                        </div>
                        <input
                          type="text"
                          name="eMoneyPin"
                          value={formData.eMoneyPin}
                          onChange={handleInputChange}
                          className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-audiophile-black placeholder-audiophile-black placeholder-opacity-40 focus:outline-none caret-audiophile-orange ${errors.eMoneyPin ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-audiophile-orange'}`}
                          placeholder="6891"
                        />
                      </div>
                    </div>
                  )}
                  {formData.paymentMethod === 'cash' && (
                    <div className="flex items-start space-x-8">
                      <img src="/assets/checkout/icon-cash-on-delivery.svg" alt="Cash on delivery" className="w-12 h-12 mt-2" />
                      <p className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50">
                        The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="bg-audiophile-orange text-audiophile-white px-[31px] py-[15px] text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-audiophile-light-orange transition-all duration-300 w-full tablet:w-auto">
                Continue & Pay
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 tablet:p-8 rounded-lg h-fit">
            <h3 className="text-[18px] font-bold leading-[25px] tracking-[1.29px] uppercase text-audiophile-black mb-[31px]">Summary</h3>
            
            <div className="space-y-6 mb-8">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h4 className="text-[15px] font-bold leading-[25px] text-audiophile-black">{item.name.split(' ').slice(0, 2).join(' ')}</h4>
                      <p className="text-[14px] font-bold leading-[25px] text-audiophile-black opacity-50">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold leading-[25px] text-audiophile-black opacity-50">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 uppercase">Total</span>
                <span className="text-[18px] font-bold leading-[25px] text-audiophile-black">${state.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 uppercase">Shipping</span>
                <span className="text-[18px] font-bold leading-[25px] text-audiophile-black">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 uppercase">VAT (Included)</span>
                <span className="text-[18px] font-bold leading-[25px] text-audiophile-black">${Math.round(vatAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-6">
                <span className="text-[15px] font-medium leading-[25px] text-audiophile-black opacity-50 uppercase">Grand Total</span>
                <span className="text-[18px] font-bold leading-[25px] text-audiophile-orange">${Math.round(grandTotal).toLocaleString()}</span>
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
