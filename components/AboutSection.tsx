
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShieldAlert, Zap } from 'lucide-react';

interface AboutSectionProps { softwareMode?: boolean; isDarkMode: boolean; }

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode }) => {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState('me.jpg');
  const [triedIndex, setTriedIndex] = useState(0);

  // Список качественных черно-белых аниме-артов (манга-стиль)
  const imageSources = [
    "me.jpg", 
    "https://i.pinimg.com/236x/8c/d2/b5/8cd2b54b4871bcc04ba808e8a7f99e30.jpg",
    "https://e0.pxfuel.com/wallpapers/186/367/desktop-wallpaper-anime-girl-monochrome-black-and-white-anime-girl-monochrome.jpg",
    "https://images.wallpapersden.com/image/download/anime-girl-monochrome-art_bWZra2aUmZqaraWkpJRmbmdlrWZsZ2U.jpg",
    "https://c4.wallpaperflare.com/wallpaper/110/373/591/anime-girls-monochrome-original-characters-long-hair-wallpaper-preview.jpg",
    "https://w0.peakpx.com/wallpaper/704/728/wallpaper-anime-girls-monochrome-original-characters-looking-at-viewer-wallpaper-preview.jpg",
    "https://i.pinimg.com/originals/8f/2c/8e/8f2c8ef6340f1a415a782e4e7e6f8090.jpg",
    "https://wallpapers.com/images/hd/black-and-white-anime-girl-1bwj76n48n07u0ly.jpg",
    "https://p4.wallpaperbetter.com/wallpaper/842/734/960/anime-anime-girls-monochrome-wallpaper-preview.jpg",
    "https://p4.wallpaperbetter.com/wallpaper/52/636/906/anime-girls-monochrome-original-characters-long-hair-wallpaper-preview.jpg"
  ];

  useEffect(() => {
    let isMounted = true;

    const testImage = (url: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        const timeout = setTimeout(() => reject(), 5000);
        img.onload = () => { clearTimeout(timeout); resolve(url); };
        img.onerror = () => { clearTimeout(timeout); reject(); };
      });
    };

    const loadWaterfall = async (index: number) => {
      if (index >= imageSources.length) {
        if (isMounted) setImgStatus('error');
        return;
      }

      setImgStatus('loading');
      setTriedIndex(index);

      try {
        const successfulUrl = await testImage(imageSources[index]);
        if (isMounted) {
          setCurrentSrc(successfulUrl);
          setImgStatus('loaded');
        }
      } catch (e) {
        if (isMounted) {
          loadWaterfall(index + 1);
        }
      }
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
            <p className="mb-4 drop-shadow-sm">
              "Взгляд острее льда, а в словах — металл,"
            </p>
            <p className="mb-4 drop-shadow-sm">
              "Резкий тон обрывает любую попытку сближения."
            </p>
            <p className="drop-shadow-sm">
              "Она сама себе — крепость, которую никто не взял."
            </p>
          </div>
        </motion.div>

        {/* Уменьшен максимальный размер контейнера для фото */}
        <div className="flex justify-center md:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] md:aspect-square flex items-center justify-center group w-full max-w-[320px] md:max-w-[420px]"
          >
            <div className={`absolute -inset-4 border ${isDarkMode ? 'border-white/5' : 'border-black/5'} rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-700`}></div>
            <div className={`absolute -inset-4 border ${isDarkMode ? 'border-white/5' : 'border-black/5'} rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-75`}></div>
            
            <div className={`w-full h-full border-2 overflow-hidden ${isDarkMode ? 'border-white/10 bg-zinc-900' : 'border-black/10 bg-zinc-100'} rounded-2xl flex items-center justify-center relative shadow-2xl`}>
              
              {/* Эффект полутоновых точек манги */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] bg-[radial-gradient(black_1px,transparent_0)] bg-[length:4px_4px]" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}></div>

              {imgStatus === 'loading' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-inherit">
                  <Loader2 className={`animate-spin ${isDarkMode ? 'text-white/20' : 'text-black/20'}`} size={40} />
                  <span className="mt-4 text-[10px] uppercase tracking-widest opacity-30 text-center px-4">
                    Загрузка образа...
                  </span>
                </div>
              )}

              {imgStatus === 'loaded' ? (
                <>
                  <motion.img 
                    key={currentSrc}
                    src={currentSrc} 
                    alt="Lily Anime Portrait"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    style={{
                      filter: 'grayscale(1) contrast(1.1) brightness(0.9)'
                    }}
                  />
                  
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                    <motion.div 
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className={`h-20 w-full bg-gradient-to-b from-transparent ${isDarkMode ? 'via-white/20' : 'via-black/20'} to-transparent`}
                    />
                  </div>

                  <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t ${isDarkMode ? 'from-black/60 via-transparent' : 'from-transparent'} to-transparent`}></div>
                  
                  <div className="absolute inset-8 border border-white/10 pointer-events-none group-hover:inset-6 transition-all duration-500">
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isDarkMode ? 'border-white/30' : 'border-black/30'}`}></div>
                    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isDarkMode ? 'border-white/30' : 'border-black/30'}`}></div>
                    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isDarkMode ? 'border-white/30' : 'border-black/30'}`}></div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isDarkMode ? 'border-white/30' : 'border-black/30'}`}></div>
                  </div>
                </>
              ) : imgStatus === 'error' ? (
                <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <ShieldAlert size={48} strokeWidth={1} className="opacity-20" />
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest font-bold opacity-40 italic">System Critical: No Image Found</p>
                    <p className="text-[10px] opacity-30 leading-relaxed uppercase">
                      Не удалось загрузить ни один из 10 образов.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="absolute -bottom-6 left-0 right-0 flex justify-between items-center px-2 opacity-30 text-[9px] uppercase tracking-[0.2em] mono">
              <span>Subject: Lily_Anime</span>
              <span>Source: {triedIndex + 1}/10</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
