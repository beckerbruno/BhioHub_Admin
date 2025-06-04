
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar,
  Star,
  Trophy,
  BookOpen,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const EvolutionScreen = () => {
  const userStats = {
    level: 'Especialista',
    currentXP: 2850,
    nextLevelXP: 3500,
    totalCourses: 24,
    completedCourses: 18,
    certificates: 12,
    studyHours: 156
  };

  const skillsData = [
    { name: 'Procedimentos Médicos', level: 85, category: 'Técnico' },
    { name: 'Comunicação', level: 92, category: 'Soft Skills' },
    { name: 'Liderança', level: 78, category: 'Gestão' },
    { name: 'Qualidade', level: 88, category: 'Técnico' },
    { name: 'Segurança do Paciente', level: 95, category: 'Técnico' },
    { name: 'Trabalho em Equipe', level: 90, category: 'Soft Skills' }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Primeiro Curso Concluído',
      description: 'Parabéns por completar seu primeiro curso!',
      icon: BookOpen,
      date: '15 Nov 2024',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Especialista em Procedimentos',
      description: 'Concluiu 5 cursos de procedimentos médicos',
      icon: Award,
      date: '28 Nov 2024',
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Comunicador Excepcional',
      description: 'Alcançou 90% em habilidades de comunicação',
      icon: Users,
      date: '05 Dez 2024',
      rarity: 'epic'
    },
    {
      id: 4,
      title: 'Maratonista do Conhecimento',
      description: 'Estudou por mais de 100 horas',
      icon: Clock,
      date: '10 Dez 2024',
      rarity: 'legendary'
    }
  ];

  const monthlyProgress = [
    { month: 'Ago', courses: 2, hours: 12 },
    { month: 'Set', courses: 3, hours: 18 },
    { month: 'Out', courses: 4, hours: 24 },
    { month: 'Nov', courses: 5, hours: 32 },
    { month: 'Dez', courses: 4, hours: 28 }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="progress-ring" width={size} height={size}>
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-blue-500 progress-ring"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pl-20">
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Evolução e Nível de Expertise</h1>
          <p className="text-gray-600">Acompanhe seu progresso e desenvolvimento profissional</p>
        </motion.div>

        {/* Level and XP Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg gradient-bg text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="h-10 w-10 text-yellow-300" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Nível 8
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{userStats.level}</h2>
                    <p className="text-white/80 mb-3">Seu nível atual de expertise</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>{userStats.currentXP} / {userStats.nextLevelXP} XP</span>
                      <span>•</span>
                      <span>{userStats.nextLevelXP - userStats.currentXP} XP para próximo nível</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-1">{userStats.studyHours}h</div>
                  <p className="text-white/80">Horas de estudo</p>
                </div>
              </div>
              <div className="mt-6">
                <Progress 
                  value={(userStats.currentXP / userStats.nextLevelXP) * 100} 
                  className="h-3 bg-white/20"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{userStats.completedCourses}</div>
              <p className="text-gray-600 text-sm">Cursos Concluídos</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{userStats.certificates}</div>
              <p className="text-gray-600 text-sm">Certificados</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.round((userStats.completedCourses / userStats.totalCourses) * 100)}%
              </div>
              <p className="text-gray-600 text-sm">Taxa de Conclusão</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
              <p className="text-gray-600 text-sm">Engajamento</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Skills Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Habilidades por Área
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsData.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Progresso Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyProgress.map((month, index) => (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{month.month}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>{month.courses} cursos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span>{month.hours}h</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Conquistas Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <Card className="card-hover border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {achievement.date}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EvolutionScreen;
