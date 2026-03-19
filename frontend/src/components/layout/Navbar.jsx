import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);

  // Handle scroll effect for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isScrolled || activeMegaMenu
            ? 'bg-offwhite/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
        onMouseLeave={() => setActiveMegaMenu(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Navigation */}
            <nav className="hidden md:flex flex-1 space-x-8 items-center">
              <Link to="/women" className={`text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors duration-200 ${isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'}`}>Women</Link>
              <Link to="/men" className={`text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors duration-200 ${isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'}`}>Men</Link>
              
              {/* Mega Menu Trigger */}
              <div 
                className="h-full py-4 flex items-center cursor-pointer"
                onMouseEnter={() => setActiveMegaMenu(true)}
              >
                <span className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors duration-200 ${isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'}`}>
                  Collections <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMegaMenu ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </nav>

            {/* Center Logo */}
            <div className="flex-shrink-0 text-center">
              <Link
                to="/"
                className={`font-serif text-3xl md:text-4xl font-bold tracking-[0.2em] transition-colors duration-200 ${
                  isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'
                }`}
              >
                SONISH
              </Link>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex flex-1 justify-end items-center space-x-6">
              <button className={`hover:text-gold transition-colors duration-200 ${isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'}`}>
                <Search className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`hover:text-gold transition-colors duration-200 relative ${isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'}`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <Link to="/login" className={`text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors duration-200 ${isScrolled || activeMegaMenu ? 'text-charcoal' : 'text-white'}`}>
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative ${isScrolled ? 'text-charcoal' : 'text-white'}`}
              >
                <ShoppingBag className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={isScrolled ? 'text-charcoal' : 'text-white'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Mega Menu Panel */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-offwhite/95 backdrop-blur-xl border-t border-charcoal/10 shadow-xl"
              onMouseLeave={() => setActiveMegaMenu(false)}
            >
              <div className="max-w-7xl mx-auto px-8 py-12 flex gap-16">
                
                {/* Links Grids */}
                <div className="flex-1 grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-6">Ready to Wear</h3>
                    <ul className="space-y-4 text-sm text-charcoal">
                      <li><Link to="/outerwear" className="hover:text-gold transition-colors">Outerwear</Link></li>
                      <li><Link to="/knitwear" className="hover:text-gold transition-colors">Knitwear</Link></li>
                      <li><Link to="/dresses" className="hover:text-gold transition-colors">Dresses</Link></li>
                      <li><Link to="/tailoring" className="hover:text-gold transition-colors">Tailoring</Link></li>
                      <li><Link to="/denim" className="hover:text-gold transition-colors">Denim</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-6">Accessories</h3>
                    <ul className="space-y-4 text-sm text-charcoal">
                      <li><Link to="/bags" className="hover:text-gold transition-colors">Bags</Link></li>
                      <li><Link to="/shoes" className="hover:text-gold transition-colors">Shoes</Link></li>
                      <li><Link to="/jewelry" className="hover:text-gold transition-colors">Jewelry</Link></li>
                      <li><Link to="/sunglasses" className="hover:text-gold transition-colors">Sunglasses</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-6">Curated</h3>
                    <ul className="space-y-4 text-sm text-charcoal">
                      <li><Link to="/new" className="hover:text-gold transition-colors flex items-center gap-2">New Arrivals <span className="bg-gold text-white text-[9px] px-1.5 py-0.5 rounded-sm">NEW</span></Link></li>
                      <li><Link to="/bestsellers" className="hover:text-gold transition-colors">Bestsellers</Link></li>
                      <li><Link to="/gifts" className="hover:text-gold transition-colors">The Gift Guide</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Promotional Image Component */}
                <div className="w-[400px] h-[300px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/30 transition-colors duration-500 z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" 
                    alt="The Winter Edit" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-white text-[10px] uppercase tracking-widest mb-1 block">Featured</span>
                    <h4 className="text-white font-serif text-2xl tracking-wide mb-2">The Winter Edit</h4>
                    <Link to="/winter" className="text-white text-xs border-b border-white/50 hover:border-white pb-0.5 transition-colors">Explore</Link>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-offwhite absolute top-full left-0 w-full shadow-lg border-t border-gray-100">
            <div className="px-4 py-8 space-y-6 flex flex-col items-center">
              <Link to="/women" className="text-charcoal text-lg uppercase tracking-widest w-full text-center hover:text-gold">Women</Link>
              <Link to="/men" className="text-charcoal text-lg uppercase tracking-widest w-full text-center hover:text-gold">Men</Link>
              <Link to="/collections" className="text-charcoal text-lg uppercase tracking-widest w-full text-center hover:text-gold">Collections</Link>
              <div className="h-px bg-gray-200 w-1/3 my-2"></div>
              <Link to="/login" className="text-charcoal text-sm uppercase tracking-widest hover:text-gold">Login</Link>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer Overlay */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
