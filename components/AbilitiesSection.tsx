
import React from 'https://esm.sh/react@19';
import { motion } from 'https://esm.sh/framer-motion@12';
import { Swords, Gamepad2, Crown } from 'https://esm.sh/lucide-react@0.475.0';

interface AbilitiesSectionProps { isDarkMode: boolean; }

const AbilityCard: React.FC<{icon: any, title: string, isDarkMode: boolean, index: number}> = ({ icon: Icon, title, isDarkMode, index }) => (
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
          <AbilityCard key={idx} index={idx} icon={ability.icon} title={ability.title} isDarkMode={isDarkMode} />
        ))}
      </div>
    </section>
  );
};
