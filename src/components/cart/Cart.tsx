
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-h6">Cart ({state.itemCount})</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {state.items.length === 0 ? (
          <p className="text-body">Your cart is empty</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={clearCart}
                className="text-body underline hover:text-audiophile-orange transition-colors"
              >
                Remove all
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-body text-sm">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-audiophile-light-gray">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-200 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-2 font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-body">Total</span>
              <span className="text-h6">${state.total.toLocaleString()}</span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full text-center btn-primary"
            >
              Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
