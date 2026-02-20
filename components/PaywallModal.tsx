import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Loader2, Check, ShieldCheck, Lock } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate API call to Paystack
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        setSuccess(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-dark-900/80 backdrop-blur-md"
            onClick={onClose}
        />
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        >
            {/* Paystack Header Imitation */}
            <div className="bg-[#091E2D] p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                         <ShieldCheck className="text-green-400 w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-white text-sm font-bold">TechOrange Premium</div>
                        <div className="text-gray-400 text-xs">test@techorange.com</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-gray-400 text-xs">NGN</div>
                    <div className="text-white font-bold text-lg">500.00</div>
                </div>
            </div>

            <div className="p-8">
                {success ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-dark-900 mb-2">Payment Successful!</h3>
                        <p className="text-gray-500 text-center">Welcome to TechOrange Premium.</p>
                    </div>
                ) : (
                    <>
                        <h3 className="font-display text-lg font-bold text-dark-900 mb-6 text-center">Enter Card Details</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Card Number</label>
                                <div className="relative">
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" readOnly value="4242 4242 4242 4242" />
                                    <CreditCard className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                                </div>
                            </div>
                            
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" readOnly value="12/25" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">CVV</label>
                                    <input type="password" placeholder="123" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" readOnly value="***" />
                                </div>
                            </div>

                            <button 
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-[#3BB75E] hover:bg-[#2fa04e] text-white font-bold py-4 rounded-lg shadow-md transition-all flex items-center justify-center mt-6"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 w-5 h-5" /> Processing...
                                    </>
                                ) : (
                                    "Pay NGN 500.00"
                                )}
                            </button>
                            
                            <div className="flex justify-center mt-4">
                                <div className="flex items-center text-[10px] text-gray-400 uppercase font-semibold">
                                    <Lock className="w-3 h-3 mr-1" />
                                    Secured by Paystack
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};