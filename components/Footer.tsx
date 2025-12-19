
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

type SurpriseStep = 'idle' | 'confirm' | 'loading' | 'active';

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const [step, setStep] = useState<SurpriseStep>('idle');
  const [showText, setShowText] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDontPress = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('active');
    }, 3000);
  };

  useEffect(() => {
    if (step === 'active') {
      // Спустя 1 секунду появляется текст
      const textTimer = setTimeout(() => setShowText(true), 1000);
      // Спустя еще 0.5 секунд (итого 1.5с) начинает рисоваться сердечко
      const drawingTimer = setTimeout(() => setIsDrawing(true), 1500);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(drawingTimer);
      };
    } else {
      setShowText(false);
      setIsDrawing(false);
    }
  }, [step]);

  // Путь сердца для SVG
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <footer className={`py-20 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="opacity-40 text-sm mono">
          &copy; {new Date().getFullYear()} котенок. Все права защищены (наверное).
        </div>

        <div className="relative">
          <button 
            onClick={handleDontPress}
            className={`px-8 py-3 border font-bold uppercase tracking-widest text-xs transition-all active:scale-95 ${
              isDarkMode 
              ? 'border-white hover:bg-white hover:text-black' 
              : 'border-black hover:bg-black hover:text-white'
            }`}
          >
            Не нажимай
          </button>
        </div>
      </div>

      <AnimatePresence>
        {/* Окно подтверждения */}
        {step === 'confirm' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`max-w-md w-full p-8 border ${isDarkMode ? 'bg-zinc-900 border-white/20' : 'bg-white border-black/20'} shadow-2xl text-center`}
            >
              <h3 className="text-xl font-bold mb-8 uppercase tracking-tighter">Ты точно хочешь это сделать?</h3>
              <div className="flex gap-4">
                <button 
                  onClick={handleConfirm}
                  className={`flex-1 py-3 border font-bold uppercase tracking-widest text-xs transition-all ${isDarkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
                >
                  Да...
                </button>
                <button 
                  onClick={() => setStep('idle')}
                  className={`flex-1 py-3 border font-bold uppercase tracking-widest text-xs opacity-50 hover:opacity-100 transition-all ${isDarkMode ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black'}`}
                >
                  Позже
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Загрузка */}
        {step === 'loading' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center text-white"
          >
            <Loader2 className="animate-spin mb-4 opacity-20" size={48} />
            <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white"
              />
            </div>
            <span className="mt-4 text-[10px] uppercase tracking-[0.5em] opacity-30">Инициализация...</span>
          </motion.div>
        )}

        {/* Финальная сцена */}
        {step === 'active' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[120] bg-black flex flex-col items-center justify-center text-white cursor-pointer"
            onClick={() => setStep('idle')}
          >
            {/* Контейнер для текста и рисунка */}
            <div className="flex flex-col items-center">
              {/* Текст сверху */}
              <div className="h-16 flex items-end justify-center mb-12">
                <AnimatePresence>
                  {showText && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl md:text-3xl font-light tracking-wide italic text-center px-4"
                    >
                      To love is to be friends with you.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Область сердца */}
              <div className="relative w-[120px] h-[120px]">
                <svg width="120" height="120" viewBox="0 0 24 24" className="overflow-visible">
                  <motion.path
                    d={heartPath}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: isDrawing ? 1 : 0, 
                      opacity: isDrawing ? 1 : 0 
                    }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                  {/* Легкое свечение после завершения */}
                  <motion.path
                    d={heartPath}
                    fill="white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDrawing ? 0.1 : 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                  />
                </svg>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              className="absolute bottom-10 text-[9px] uppercase tracking-widest pointer-events-none"
            >
              кликните, чтобы вернуться
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
