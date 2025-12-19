
import React, { useState } from 'https://esm.sh/react@19';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { AbilitiesSection } from './components/AbilitiesSection.tsx';
import { Footer } from './components/Footer.tsx';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto px-4 md:px-8">
        <Hero isDarkMode={isDarkMode} />
        
        <div id="about">
          <AboutSection isDarkMode={isDarkMode} />
        </div>
        
        <div id="abilities">
          <AbilitiesSection isDarkMode={isDarkMode} />
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
