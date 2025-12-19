
import React, { useState, useEffect } from 'https://esm.sh/react@19';
import { motion } from 'https://esm.sh/framer-motion@12';
import { Loader2, ShieldAlert } from 'https://esm.sh/lucide-react@0.475.0';

interface AboutSectionProps { isDarkMode: boolean; }

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode }) => {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState('');

  const imageSources = [
    "https://i.pinimg.com/originals/8f/2c/8e/8f2c8ef6340f1a415a782e4e7e6f8090.jpg",
    "https://e0.pxfuel.com/wallpapers/186/367/desktop-wallpaper-anime-girl-monochrome-black-and-white-anime-girl-monochrome.jpg",
    "me.jpg"
  ];

  useEffect(() => {
    let isMounted = true;
    const loadWaterfall = async (index: number) => {
      if (index >= imageSources.length) {
        if (isMounted) setImgStatus('error');
        return;
      }
      const img = new Image();
      img.src = imageSources[index];
      img.onload = () => {
        if (isMounted) {
          setCurrentSrc(imageSources[index]);
          setImgStatus('loaded');
        }
      };
      img.onerror = () => loadWaterfall(index + 1);
    };
    loadWaterfall(0);
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="z-10 space-y-6"
        >
          <div className="flex items-center space-x-4">
             <div className={`h-px w-12 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
             <span className="text-xs uppercase tracking-[0.3em] opacity-50">Profile Entry</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
            О Лилии
          </h2>
          <div className="text-xl md:text-2xl leading-relaxed font-light italic opacity-90 border-l-2 pl-6 border-current">
            <p className="mb-4">"Взгляд острее льда, а в словах — металл,"</p>
            <p>"Она сама себе — крепость."</p>
          </div>
        </motion.div>

        <div className="flex justify-center md:justify-end">
          <div className="relative aspect-square w-full max-w-[400px]">
            <div className={`absolute -inset-4 border ${isDarkMode ? 'border-white/5' : 'border-black/5'} rounded-3xl -rotate-3`}></div>
            <div className={`w-full h-full border-2 overflow-hidden ${isDarkMode ? 'border-white/10 bg-zinc-900' : 'border-black/10 bg-zinc-100'} rounded-2xl flex items-center justify-center relative shadow-2xl`}>
              {imgStatus === 'loading' && <Loader2 className="animate-spin opacity-20" size={40} />}
              {imgStatus === 'loaded' && (
                <motion.img 
                  src={currentSrc} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              )}
              {imgStatus === 'error' && <ShieldAlert size={48} className="opacity-20" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
