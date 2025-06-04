
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Route, 
  Award, 
  Users, 
  TrendingUp,
  Calendar,
  Star,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HomeScreen = () => {
  const quickAccessItems = [
    { icon: BookOpen, label: 'Meus Cursos', count: 12, color: 'bg-blue-500' },
    { icon: Route, label: 'Minhas Trilhas', count: 3, color: 'bg-green-500' },
    { icon: Award, label: 'Conquistas', count: 8, color: 'bg-yellow-500' },
    { icon: Users, label: 'Fórum', count: 24, color: 'bg-purple-500' },
  ];

  const weekHighlights = [
    {
      type: 'event',
      title: 'Workshop: Técnicas Avançadas de Procedimentos',
      date: '15 Dez',
      participants: 45,
      status: 'Inscrições Abertas'
    },
    {
      type: 'ranking',
      title: 'Top 5 da Semana - Engajamento',
      description: 'Você está em 3º lugar!',
      badge: 'bronze'
    },
    {
      type: 'news',
      title: 'Nova Trilha: Qualidade e Segurança',
      description: 'Explore os novos módulos disponíveis',
      isNew: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pl-20">
      <div className="p-8">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl gradient-bg p-8 mb-8 text-white"
        >
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4"
            >
              Sua jornada na saúde começa aqui
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl opacity-90 mb-6"
            >
              Desenvolva suas habilidades e transforme sua carreira na área da saúde
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Continuar Aprendendo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
            <img  alt="Medical professionals collaborating" src="https://images.unsplash.com/photo-1579684288452-b334934f845f" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="card-hover border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.count}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-500">Acesso rápido</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Week Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Destaques da Semana</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {weekHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-hover border-0 shadow-lg h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {highlight.type === 'event' && <Calendar className="h-5 w-5 text-blue-500" />}
                        {highlight.type === 'ranking' && <TrendingUp className="h-5 w-5 text-green-500" />}
                        {highlight.type === 'news' && <Star className="h-5 w-5 text-yellow-500" />}
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {highlight.type === 'event' ? 'Evento' : 
                           highlight.type === 'ranking' ? 'Ranking' : 'Novidade'}
                        </span>
                      </div>
                      {highlight.isNew && (
                        <Badge variant="success" className="text-xs">
                          Novo
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {highlight.description && (
                      <p className="text-gray-600 mb-3">{highlight.description}</p>
                    )}
                    {highlight.date && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Data: {highlight.date}</span>
                        <span className="text-blue-600 font-medium">{highlight.participants} participantes</span>
                      </div>
                    )}
                    {highlight.status && (
                      <Badge variant="outline" className="mt-2">
                        {highlight.status}
                      </Badge>
                    )}
                    {highlight.badge && (
                      <div className="flex items-center mt-2">
                        <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <span className="text-sm text-gray-600">Posição no ranking</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
