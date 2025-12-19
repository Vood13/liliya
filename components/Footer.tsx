
import React, { useState, useEffect } from 'https://esm.sh/react@19';
import { motion, AnimatePresence } from 'https://esm.sh/framer-motion@12';
import { Loader2 } from 'https://esm.sh/lucide-react@0.475.0';

interface FooterProps { isDarkMode: boolean; }

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const [step, setStep] = useState<'idle' | 'confirm' | 'loading' | 'active'>('idle');
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (step === 'active') {
      const timer = setTimeout(() => setShowText(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <footer className={`py-20 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="opacity-40 text-sm mono">
          &copy; {new Date().getFullYear()} котенок.
        </div>
        <button 
          onClick={() => setStep('confirm')}
          className={`px-8 py-3 border font-bold uppercase tracking-widest text-xs transition-all ${isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
        >
          Не нажимай
        </button>
      </div>

      <AnimatePresence>
        {step === 'confirm' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className={`max-w-md w-full p-8 border ${isDarkMode ? 'bg-zinc-900 border-white/20' : 'bg-white border-black/20'} text-center`}>
              <h3 className="text-xl font-bold mb-8 uppercase">Уверены?</h3>
              <div className="flex gap-4">
                <button onClick={() => { setStep('loading'); setTimeout(() => setStep('active'), 2000); }} className="flex-1 py-3 border border-current font-bold">Да</button>
                <button onClick={() => setStep('idle')} className="flex-1 py-3 opacity-50">Нет</button>
              </div>
            </div>
          </motion.div>
        )}
        {step === 'loading' && (
          <div className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center text-white">
            <Loader2 className="animate-spin mb-4" size={48} />
            <span className="text-[10px] uppercase tracking-[0.5em]">Загрузка...</span>
          </div>
        )}
        {step === 'active' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[120] bg-black flex flex-col items-center justify-center text-white" onClick={() => setStep('idle')}>
            {showText && <motion.p initial={{ y: 20 }} animate={{ y: 0 }} className="text-2xl italic">To love is to be friends with you.</motion.p>}
            <p className="mt-12 text-6xl">🐾</p>
            <span className="absolute bottom-10 opacity-30 text-[9px] uppercase">кликните, чтобы выйти</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
