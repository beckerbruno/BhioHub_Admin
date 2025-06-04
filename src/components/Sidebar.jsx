
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  User, 
  Network,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Comunidade' },
    { id: 'courses', icon: BookOpen, label: 'Cursos' },
    { id: 'community', icon: Users, label: 'Comunidade' },
    { id: 'evolution', icon: TrendingUp, label: 'Evolução' },
    { id: 'profile', icon: User, label: 'Perfil' },
    { id: 'connections', icon: Network, label: 'Conexões' },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 shadow-lg z-50"
    >
      <div className="flex flex-col items-center py-8 space-y-6">
        <div className="w-14 h-14 flex items-center justify-center">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/b2f68ffc-2057-442d-9a89-c2beb6fb60a7/b86395b125ce29fdb965758682aba411.jpg" alt="BhioHub Logo" className="w-full h-full object-contain" />
        </div>
        
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                  isActive 
                    ? "bhio-blue text-white shadow-lg" 
                    : "text-gray-400 hover:text-[#002B4E] hover:bg-gray-50"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bhio-blue rounded-xl"
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;