
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  BarChart2, 
  Star,
  ChevronRight,
  Briefcase,
  FileText,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminDashboardScreen = ({ setActiveTab }) => {
  const quickAccessItems = [
    { icon: Briefcase, label: 'Talentos em Destaque', count: 12, color: 'bhio-green', tab: 'talents' },
    { icon: UserPlus, label: 'Novas Inscrições', count: 5, color: 'bg-yellow-400', tab: 'talents' },
    { icon: BarChart2, label: 'Análises', count: 3, color: 'bg-purple-500', tab: 'dashboard' },
    { icon: Star, label: 'Destaques da Semana', count: 8, color: 'bg-pink-500', tab: 'dashboard' },
  ];

  const weekHighlights = [
    {
      type: 'talent',
      title: 'Novo Talento: Dr. Carlos Andrade',
      description: 'Especialista em Cardiologia com 10 anos de experiência.',
      badge: 'Especialista em Procedimentos',
      location: 'São Paulo, SP'
    },
    {
      type: 'metric',
      title: 'Aumento de 15% em Inscrições',
      description: 'Comparado à semana anterior.',
      value: '+15%',
      icon: TrendingUp
    },
    {
      type: 'article',
      title: 'Novo Artigo Publicado',
      description: 'Tendências em Telemedicina para 2025.',
      link: '/articles/telemedicina-2025'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pl-64">
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl gradient-bg p-10 mb-8 text-white shadow-xl"
        >
          <div className="relative z-10">
            <motion.h1 
              className="text-4xl font-bold mb-3"
            >
              Bem-vindo ao painel de talentos da BhioHub!
            </motion.h1>
            <motion.p 
              className="text-lg opacity-90 mb-6 max-w-2xl"
            >
              Gerencie talentos, acompanhe o progresso e descubra os melhores profissionais para sua organização.
            </motion.p>
            <motion.div>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bhio-green text-bhio-blue hover-bhio-green font-semibold"
                onClick={() => setActiveTab('talents')}
              >
                Ver Todos os Talentos
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-72 h-72 opacity-10">
             <img  alt="Abstract network graphic" class="w-full h-full object-contain" src="https://images.unsplash.com/photo-1542640355824-4412af4a0ab2" />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 43, 78, 0.1)" }}
                className="cursor-pointer"
                onClick={() => setActiveTab(item.tab)}
              >
                <Card className="card-hover border-0 shadow-lg h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs text-bhio-blue border-bhio-blue">
                          {item.count}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-bhio-blue text-lg mb-1">{item.label}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Acesso rápido</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-bhio-blue mb-6">Destaques da Semana</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {weekHighlights.map((highlight, index) => {
              const HighlightIcon = highlight.icon || (highlight.type === 'talent' ? Briefcase : highlight.type === 'article' ? FileText : MapPin);
              return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 43, 78, 0.1)" }}
              >
                <Card className="card-hover border-0 shadow-lg h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <HighlightIcon className={`h-5 w-5 ${highlight.type === 'talent' ? 'text-bhio-green' : highlight.type === 'metric' ? 'text-purple-500' : 'text-yellow-500'}`} />
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {highlight.type === 'talent' ? 'Novo Talento' : 
                           highlight.type === 'metric' ? 'Métrica Chave' : 'Artigo'}
                        </span>
                      </div>
                      {highlight.value && (
                        <Badge variant="secondary" className="text-xs bhio-green text-bhio-blue">
                          {highlight.value}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg text-bhio-blue">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{highlight.description}</p>
                    {highlight.badge && (
                      <Badge variant="outline" className="text-xs mb-2 border-bhio-blue text-bhio-blue">
                        {highlight.badge}
                      </Badge>
                    )}
                    {highlight.location && (
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" /> {highlight.location}
                      </div>
                    )}
                    {highlight.link && (
                       <Button variant="link" size="sm" className="p-0 h-auto text-bhio-green hover:text-bhio-blue" onClick={() => setActiveTab('articles')}>
                        Ler Artigo <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;