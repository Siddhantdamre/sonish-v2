import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isFeatured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use dynamic height based on context. Featured items fill the large flex/grid space.
  const heightClass = isFeatured ? 'h-full min-h-[450px]' : 'h-[450px]';

  return (
    <div
      className="group relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product._id || product.id}`} className={`relative overflow-hidden bg-gray-100 mb-4 block ${heightClass}`}>

        {/* Primary Image */}
        <motion.img
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered && product.secondaryImage ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
        />

        {/* Secondary Hover Image (if it exists) */}
        {product.secondaryImage && (
          <motion.img
            initial={{ opacity: 0, scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src={product.secondaryImage}
            alt={`${product.name} Alternate View`}
            className="absolute inset-0 w-full h-full object-cover object-center z-20"
          />
        )}

        {/* Quick Add Button Slide Up */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-0 w-full px-4 z-30"
        >
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevents the Link tag from routing you to a new page

              // 1. Package the product data for the cart
              const cartItem = {
                product: product._id || product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1 // Default to adding 1 item
              };

              // 2. Dispatch to your global cart state (Adjust this based on if you use Redux or Context!)
              // e.g., dispatch(addToCart(cartItem)); 

              // 3. Trigger the UI feedback
              alert(`${product.name} added to your cart!`); // Placeholder until the sliding drawer is hooked up
            }}
            className="w-full bg-white/95 backdrop-blur-md text-charcoal py-3 text-xs uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors duration-300 shadow-sm"
          >
            Quick Add
          </button>
        </motion.div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col space-y-1">
        <span className="text-xs text-charcoal/60 uppercase tracking-wider">{product.brand}</span>
        <Link to={`/product/${product._id || product.id}`} className="text-sm font-medium text-charcoal hover:text-gold transition-colors line-clamp-1">
          {product.name}
        </Link>
        <span className="text-sm text-charcoal font-serif tracking-wide">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
