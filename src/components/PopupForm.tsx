import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const PopupForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: '', email: '', phone: '', service: '',
  // });

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popupDismissed');
    if (dismissed) return;

    // Show popup after 10 seconds delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupDismissed', 'true');
  };

  // const handleSubmit = () => {
  //   handleClose();
  // };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-md"
          >
            {/* Close button — always shows X */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge */}
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;