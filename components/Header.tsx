
import React from 'https://esm.sh/react@19';
import { motion } from 'https://esm.sh/framer-motion@12';
import { Moon, Sun } from 'https://esm.sh/lucide-react@0.475.0';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 border-b ${isDarkMode ? 'border-white/10 bg-black/80' : 'border-black/10 bg-white/80'} backdrop-blur-md`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter lowercase"
        >
          котенок
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {['about', 'abilities'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`text-[10px] uppercase tracking-[0.3em] hover:opacity-50 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              {item === 'about' ? 'о лилии' : 'возможности'}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
          >
            {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </header>
  );
};
