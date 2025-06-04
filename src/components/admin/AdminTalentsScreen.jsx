import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Filter, 
  Search, 
  ChevronRight, 
  Award, 
  TrendingUp,
  Star,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input'; // Assuming Input component exists

const AdminTalentsScreen = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    expertise: 'all',
    gamification: 'all',
  });

  const expertiseBadges = [
    { id: 'all', name: 'Todas as Especialidades' },
    { id: 'procedimentos', name: 'Especialista em Procedimentos' },
    { id: 'auditoria', name: 'Apto para Auditoria' },
    { id: 'gestao', name: 'Liderança em Saúde' },
    { id: 'inovacao', name: 'Inovação Clínica' },
  ];

  const gamificationLevels = [
    { id: 'all', name: 'Todos os Níveis' },
    { id: 'bronze', name: 'Bronze' },
    { id: 'prata', name: 'Prata' },
    { id: 'ouro', name: 'Ouro' },
  ];

  const talents = [
    {
      id: 1,
      name: 'Dr. Ana Silva',
      role: 'Cardiologista Sênior',
      avatar: 'Female doctor smiling',
      trails: ['Cardiologia Avançada', 'Gestão de Pacientes Crônicos'],
      badges: ['Especialista em Procedimentos', 'Liderança em Saúde'],
      gamification: 'ouro',
      progress: 92,
      readyFor: '5 processos críticos',
      location: 'São Paulo, SP'
    },
    {
      id: 2,
      name: 'Enf. Bruno Costa',
      role: 'Enfermeiro Chefe UTI',
      avatar: 'Male nurse in scrubs',
      trails: ['Cuidados Intensivos', 'Protocolos de Emergência'],
      badges: ['Apto para Auditoria'],
      gamification: 'prata',
      progress: 78,
      readyFor: '3 processos de auditoria',
      location: 'Rio de Janeiro, RJ'
    },
    {
      id: 3,
      name: 'Fisio. Carla Lima',
      role: 'Fisioterapeuta Respiratória',
      avatar: 'Female physiotherapist with patient',
      trails: ['Reabilitação Pulmonar', 'Ventilação Mecânica'],
      badges: ['Inovação Clínica'],
      gamification: 'bronze',
      progress: 65,
      readyFor: '2 processos de reabilitação',
      location: 'Belo Horizonte, MG'
    },
     {
      id: 4,
      name: 'Dr. Marcos Oliveira',
      role: 'Cirurgião Geral',
      avatar: 'Male surgeon in operating room',
      trails: ['Técnicas Cirúrgicas Avançadas', 'Pós-operatório Complexo'],
      badges: ['Especialista em Procedimentos', 'Apto para Auditoria'],
      gamification: 'ouro',
      progress: 95,
      readyFor: '6 processos cirúrgicos',
      location: 'Curitiba, PR'
    },
  ];

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredTalents = talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          talent.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = filters.expertise === 'all' || talent.badges.includes(expertiseBadges.find(b => b.id === filters.expertise)?.name);
    const matchesGamification = filters.gamification === 'all' || talent.gamification === filters.gamification;
    return matchesSearch && matchesExpertise && matchesGamification;
  });

  const getGamificationColor = (level) => {
    if (level === 'ouro') return 'bg-yellow-400 text-yellow-800';
    if (level === 'prata') return 'bg-gray-300 text-gray-700';
    if (level === 'bronze') return 'bg-yellow-600 text-white'; // Bronze color
    return 'bg-gray-200 text-gray-600';
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-bhio-blue mb-2">Banco de Talentos</h1>
          <p className="text-gray-600">Encontre e gerencie os profissionais da BhioHub.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative col-span-1 md:col-span-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar Talento</label>
              <Search className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
              <Input
                id="search"
                type="text"
                placeholder="Nome ou cargo..."
                className="w-full pl-10 pr-4 py-2.5 border-gray-300 rounded-lg focus:ring-bhio-blue focus:border-bhio-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="expertiseFilter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Especialidade</label>
              <select 
                id="expertiseFilter"
                className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-bhio-blue focus:border-bhio-blue"
                value={filters.expertise}
                onChange={(e) => handleFilterChange('expertise', e.target.value)}
              >
                {expertiseBadges.map(badge => <option key={badge.id} value={badge.id}>{badge.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="gamificationFilter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Nível</label>
              <select 
                id="gamificationFilter"
                className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-bhio-blue focus:border-bhio-blue"
                value={filters.gamification}
                onChange={(e) => handleFilterChange('gamification', e.target.value)}
              >
                {gamificationLevels.map(level => <option key={level.id} value={level.id}>{level.name}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTalents.map((talent) => (
            <motion.div
              key={talent.id}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 43, 78, 0.1)" }}
            >
              <Card className="card-hover border-0 shadow-lg overflow-hidden h-full flex flex-col">
                <CardHeader className="p-5 bg-gradient-to-br from-bhio-blue to-blue-700 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{talent.name}</CardTitle>
                      <p className="text-sm opacity-80">{talent.role}</p>
                    </div>
                    <div className={`p-1.5 rounded-full ${getGamificationColor(talent.gamification)}`}>
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 flex-grow space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Trilhas Principais</h4>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {talent.trails.slice(0,2).map(trail => <li key={trail} className="truncate">{trail}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Badges</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {talent.badges.map(badge => (
                        <Badge key={badge} variant="secondary" className="bhio-green text-bhio-blue text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase">Evolução Geral</h4>
                      <span className="text-sm font-bold text-bhio-green">{talent.progress}%</span>
                    </div>
                    <Progress value={talent.progress} className="h-2 [&>div]:bg-bhio-green" />
                  </div>
                   <div className="pt-2">
                    <div className="flex items-center text-sm text-bhio-blue font-medium">
                      <ShieldCheck className="h-4 w-4 mr-1.5 text-bhio-green" />
                      <span>Pronto para atuar em: {talent.readyFor}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="p-5 border-t border-gray-200">
                  <Button 
                    className="w-full bhio-blue hover-bhio-blue text-white"
                    onClick={() => setActiveTab('profile')} // Placeholder: should navigate to specific talent profile
                  >
                    Ver Perfil Completo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
           {filteredTalents.length === 0 && (
            <motion.div className="col-span-full text-center py-10" variants={itemVariants}>
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum talento encontrado</h3>
              <p className="text-gray-500">Tente ajustar seus filtros ou termo de busca.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminTalentsScreen;