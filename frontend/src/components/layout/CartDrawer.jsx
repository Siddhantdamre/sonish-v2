import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-offwhite shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-charcoal/10">
              <h2 className="font-serif text-2xl text-charcoal flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button
                onClick={onClose}
                className="text-charcoal/60 hover:text-charcoal transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Empty Cart State (Mock) */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-charcoal/5 flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-charcoal/40" />
              </div>
              <p className="text-charcoal font-medium text-lg mb-2">Your cart is empty</p>
              <p className="text-charcoal/60 text-sm mb-8">
                Discover our latest arrivals and elevate your wardrobe.
              </p>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Footer / Checkout (Mock) */}
            <div className="p-6 border-t border-charcoal/10 bg-white">
              <div className="flex justify-between items-center mb-6 text-sm text-charcoal font-medium tracking-wide">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs text-charcoal/50 mb-4">
                <Lock className="w-3 h-3" />
                <span>Secure 256-bit SSL Checkout</span>
              </div>

              <Link 
                to="/checkout"
                onClick={onClose}
                className="w-full block text-center px-8 py-4 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-charcoal/20"
              >
                Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
