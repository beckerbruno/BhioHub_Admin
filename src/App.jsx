import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboardScreen from '@/components/admin/AdminDashboardScreen';
import AdminTalentsScreen from '@/components/admin/AdminTalentsScreen';
import AdminGeolocationScreen from '@/components/admin/AdminGeolocationScreen';
import AdminArticlesScreen from '@/components/admin/AdminArticlesScreen';
import AdminProfileScreen from '@/components/admin/AdminProfileScreen';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default to admin dashboard

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboardScreen setActiveTab={setActiveTab} />;
      case 'talents':
        return <AdminTalentsScreen setActiveTab={setActiveTab} />;
      case 'geolocation':
        return <AdminGeolocationScreen />;
      case 'articles':
        return <AdminArticlesScreen />;
      case 'profile':
        return <AdminProfileScreen />;
      default:
        return <AdminDashboardScreen setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;