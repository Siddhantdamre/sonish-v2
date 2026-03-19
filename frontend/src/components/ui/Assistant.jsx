import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="bg-charcoal text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg tracking-wide">Personal Stylist</h3>
                <p className="text-xs font-light text-white/70">AI Concierge Assistant</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body (Mock) */}
            <div className="h-80 p-6 overflow-y-auto bg-offwhite/50 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-serif text-xs">S</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm text-sm text-charcoal shadow-charcoal/5">
                  <p>Welcome to Sonish! I am your personal AI stylist. What occasion are we dressing for today?</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-charcoal/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); setMessage(''); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-offwhite px-4 py-2 rounded-full text-sm outline-none focus:ring-1 focus:ring-gold transition-all"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-charcoal text-white rounded-full shadow-xl flex items-center justify-center hover:bg-black transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default Assistant;
