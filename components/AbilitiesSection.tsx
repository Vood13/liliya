
import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Gamepad2, Crown } from 'lucide-react';

interface AbilitiesSectionProps {
  isDarkMode: boolean;
}

// Added interface for AbilityCard props
interface AbilityCardProps {
  icon: any;
  title: string;
  isDarkMode: boolean;
  index: number;
}

// Fixed: Using React.FC to correctly handle React-specific props like 'key'
const AbilityCard: React.FC<AbilityCardProps> = ({ icon: Icon, title, isDarkMode, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ y: -10 }}
    className={`p-8 border ${isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-black/10 hover:border-black/30'} transition-all group`}
  >
    <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
      <Icon size={48} strokeWidth={1} />
    </div>
    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
  </motion.div>
);

export const AbilitiesSection: React.FC<AbilitiesSectionProps> = ({ isDarkMode }) => {
  const abilities = [
    { icon: Swords, title: "Может въе*ать" },
    { icon: Gamepad2, title: "Играет в бравл старс" },
    { icon: Crown, title: "Крутая ваще" }
  ];

  return (
    <section className="py-32">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Её возможности</h2>
        <div className={`h-[1px] w-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {abilities.map((ability, idx) => (
          /* Fixed: Explicitly passing props to avoid type mismatch with the 'key' prop and ensure compatibility with React.FC */
          <AbilityCard 
            key={idx} 
            index={idx} 
            icon={ability.icon} 
            title={ability.title} 
            isDarkMode={isDarkMode} 
          />
        ))}
      </div>
    </section>
  );
};
