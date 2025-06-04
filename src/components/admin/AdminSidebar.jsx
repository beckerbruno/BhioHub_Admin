import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  FileText, 
  UserCircle,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'talents', icon: Users, label: 'Talentos' },
    { id: 'geolocation', icon: MapPin, label: 'Geolocalização' },
    { id: 'articles', icon: FileText, label: 'Artigos' },
    { id: 'profile', icon: UserCircle, label: 'Perfil' },
  ];

  return (
    <motion.div 
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full w-64 bg-bhio-blue text-white shadow-2xl z-50 flex flex-col"
    >
      <div className="flex items-center justify-center p-6 border-b border-white/10">
        <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/b2f68ffc-2057-442d-9a89-c2beb6fb60a7/b86395b125ce29fdb965758682aba411.jpg" alt="BhioHub Logo" className="h-12 object-contain" />
        <span className="ml-3 text-xl font-semibold">BhioHub Admin</span>
      </div>
      
      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left",
                isActive 
                  ? "bg-bhio-green text-bhio-blue font-medium shadow-md" 
                  : "hover:bg-white/10 hover:text-bhio-green"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="adminActiveTab"
                  className="absolute inset-0 bg-bhio-green rounded-lg"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/50 text-center">&copy; {new Date().getFullYear()} BhioHub. Todos os direitos reservados.</p>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;