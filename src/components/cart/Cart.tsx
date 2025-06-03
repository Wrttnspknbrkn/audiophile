
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
      
      {/* Cart Modal */}
      <div className="fixed top-24 right-6 tablet:right-10 desktop:right-40 w-80 bg-white rounded-lg shadow-xl z-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h6 className="text-audiophile-black">Cart ({state.itemCount})</h6>
          {state.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-body underline hover:text-audiophile-orange transition-colors"
            >
              Remove all
            </button>
          )}
        </div>

        {state.items.length === 0 ? (
          <p className="text-body text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-audiophile-black truncate">
                      {item.name.replace(/headphones|speaker|earphones/gi, '').trim()}
                    </h4>
                    <p className="text-body text-sm">${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center bg-audiophile-light-gray">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} className="text-audiophile-dark-gray" />
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center font-bold text-sm text-audiophile-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={12} className="text-audiophile-dark-gray" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-body">Total</span>
              <span className="text-h6 text-audiophile-black">${state.total.toLocaleString()}</span>
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
