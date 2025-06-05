
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
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Name is required' : undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Wrong format' : undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        return !/^\+?[\d\s\-()]+$/.test(value) ? 'Wrong format' : undefined;
      case 'address':
        return !value.trim() ? 'Address is required' : undefined;
      case 'zipCode':
        return !value.trim() ? 'ZIP Code is required' : undefined;
      case 'city':
        return !value.trim() ? 'City is required' : undefined;
      case 'country':
        return !value.trim() ? 'Country is required' : undefined;
      case 'eMoneyNumber':
        return formData.paymentMethod === 'e-money' && !value.trim() ? 'e-Money Number is required' : undefined;
      case 'eMoneyPin':
        return formData.paymentMethod === 'e-money' && !value.trim() ? 'e-Money PIN is required' : undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const fieldsToValidate = ['name', 'email', 'phone', 'address', 'zipCode', 'city', 'country'];
    
    if (formData.paymentMethod === 'e-money') {
      fieldsToValidate.push('eMoneyNumber', 'eMoneyPin');
    }

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white p-8 md:p-12 rounded-lg max-w-[540px] w-full">
            <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mb-[23px]">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </svg>
            </div>
            <h2 className="text-[24px] md:text-[32px] font-bold leading-[28px] md:leading-[36px] tracking-[0.86px] md:tracking-[1.14px] uppercase text-black mb-4 md:mb-6">
              Thank you<br />for your order
            </h2>
            <p className="text-[15px] font-medium leading-[25px] text-black/50 mb-6 md:mb-[33px]">
              You will receive an email confirmation shortly.
            </p>
            
            <div className="flex flex-col md:flex-row rounded-lg overflow-hidden mb-6 md:mb-[46px]">
              <div className="bg-[#F1F1F1] p-6 md:flex-1">
                {state.items.slice(0, 1).map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-[50px] h-[50px] rounded object-cover" />
                      <div>
                        <p className="text-[15px] font-bold leading-[25px] text-black">{item.name.split(' ').slice(0, 2).join(' ')}</p>
                        <p className="text-[14px] font-bold leading-[25px] text-black/50">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-[15px] font-bold leading-[25px] text-black/50">x{item.quantity}</span>
                  </div>
                ))}
                {state.items.length > 1 && (
                  <>
                    <hr className="my-3 border-black/8" />
                    <p className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black/50 text-center">
                      and {state.items.length - 1} other item{state.items.length > 2 ? 's' : ''}
                    </p>
                  </>
                )}
              </div>
              <div className="bg-black p-6 md:w-[198px] flex flex-col justify-end">
                <p className="text-[15px] font-medium leading-[25px] text-white/50 mb-2">Grand Total</p>
                <p className="text-[18px] font-bold leading-[25px] text-white">${Math.round(grandTotal).toLocaleString()}</p>
              </div>
            </div>
            
            <Link
              to="/"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              className="bg-[#D87D4A] text-white px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-all duration-300 w-full text-center block"
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
    <div className="min-h-screen bg-[#F1F1F1]">
      <Header />
      
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 py-4 md:py-8 lg:py-[79px]">
        <Link
          to="/"
          className="inline-flex items-center text-[15px] font-medium leading-[25px] text-black/50 hover:text-[#D87D4A] transition-colors mb-6 md:mb-14 lg:mb-14"
        >
          Go Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-[30px]">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white p-6 md:p-[48px] rounded-lg">
            <h1 className="text-[28px] md:text-[32px] font-bold leading-[32px] md:leading-[36px] tracking-[1px] md:tracking-[1.14px] uppercase text-black mb-[41px] md:mb-[41px]">
              Checkout
            </h1>
            
            <form onSubmit={handleSubmit}>
              {/* Billing Details */}
              <div className="mb-[53px]">
                <h3 className="text-[13px] font-bold leading-[25px] tracking-[0.93px] uppercase text-[#D87D4A] mb-4">Billing Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">Name</label>
                      {errors.name && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.name}</span>}
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.name ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="Alexei Ward"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">Email Address</label>
                      {errors.email && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.email}</span>}
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.email ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="alexei@mail.com"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">Phone Number</label>
                      {errors.phone && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.phone}</span>}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.phone ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="+1 202-555-0136"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-[53px]">
                <h3 className="text-[13px] font-bold leading-[25px] tracking-[0.93px] uppercase text-[#D87D4A] mb-4">Shipping Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">Address</label>
                      {errors.address && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.address}</span>}
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.address ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="1137 Williams Avenue"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">ZIP Code</label>
                      {errors.zipCode && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.zipCode}</span>}
                    </div>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.zipCode ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="10001"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">City</label>
                      {errors.city && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.city}</span>}
                    </div>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.city ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-[9px]">
                      <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">Country</label>
                      {errors.country && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.country}</span>}
                    </div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.country ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-8">
                <h3 className="text-[13px] font-bold leading-[25px] tracking-[0.93px] uppercase text-[#D87D4A] mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black mb-[17px] block">Payment Method</label>
                    <div className="space-y-4">
                      <label className={`flex items-center p-[18px] border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'e-money' ? 'border-[#D87D4A]' : 'border-[#CFCFCF]'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="e-money"
                          checked={formData.paymentMethod === 'e-money'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-[#D87D4A] bg-white border-[#CFCFCF] focus:ring-[#D87D4A] focus:ring-2 mr-4"
                        />
                        <span className="text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black">e-Money</span>
                      </label>
                      <label className={`flex items-center p-[18px] border-2 rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'cash' ? 'border-[#D87D4A]' : 'border-[#CFCFCF]'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-[#D87D4A] bg-white border-[#CFCFCF] focus:ring-[#D87D4A] focus:ring-2 mr-4"
                        />
                        <span className="text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                  {formData.paymentMethod === 'e-money' && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-[9px]">
                          <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">e-Money Number</label>
                          {errors.eMoneyNumber && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.eMoneyNumber}</span>}
                        </div>
                        <input
                          type="text"
                          name="eMoneyNumber"
                          value={formData.eMoneyNumber}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.eMoneyNumber ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                          placeholder="238521993"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-[9px]">
                          <label className="text-[12px] font-bold leading-[16px] tracking-[-0.21px] text-black">e-Money PIN</label>
                          {errors.eMoneyPin && <span className="text-[12px] font-medium leading-[16px] tracking-[-0.21px] text-[#CD2C2C]">{errors.eMoneyPin}</span>}
                        </div>
                        <input
                          type="text"
                          name="eMoneyPin"
                          value={formData.eMoneyPin}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full px-6 py-[18px] border-2 rounded-lg text-[14px] font-bold leading-[19px] tracking-[-0.25px] text-black placeholder-black/40 focus:outline-none caret-[#D87D4A] ${errors.eMoneyPin ? 'border-[#CD2C2C]' : 'border-[#CFCFCF] focus:border-[#D87D4A]'}`}
                          placeholder="6891"
                        />
                      </div>
                    </div>
                  )}
                  {formData.paymentMethod === 'cash' && (
                    <div className="flex items-start space-x-8">
                      <img src="/assets/checkout/icon-cash-on-delivery.svg" alt="Cash on delivery" className="w-12 h-12 mt-2" />
                      <p className="text-[15px] font-medium leading-[25px] text-black/50">
                        The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 md:p-8 rounded-lg h-fit">
            <h3 className="text-[18px] font-bold leading-[25px] tracking-[1.29px] uppercase text-black mb-[31px]">Summary</h3>
            
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
                      <h4 className="text-[15px] font-bold leading-[25px] text-black">{item.name.split(' ').slice(0, 2).join(' ')}</h4>
                      <p className="text-[14px] font-bold leading-[25px] text-black/50">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold leading-[25px] text-black/50">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-[15px] font-medium leading-[25px] text-black/50 uppercase">Total</span>
                <span className="text-[18px] font-bold leading-[25px] text-black">${state.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[15px] font-medium leading-[25px] text-black/50 uppercase">Shipping</span>
                <span className="text-[18px] font-bold leading-[25px] text-black">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[15px] font-medium leading-[25px] text-black/50 uppercase">VAT (Included)</span>
                <span className="text-[18px] font-bold leading-[25px] text-black">${Math.round(vatAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-6">
                <span className="text-[15px] font-medium leading-[25px] text-black/50 uppercase">Grand Total</span>
                <span className="text-[18px] font-bold leading-[25px] text-[#D87D4A]">${Math.round(grandTotal).toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="bg-[#D87D4A] text-white px-8 py-4 text-[13px] font-bold leading-[25px] tracking-[1px] uppercase hover:bg-[#FBAF85] transition-all duration-300 w-full"
            >
              Continue & Pay
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
