
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star,
  Filter,
  Search,
  ChevronRight,
  Award,
  Play
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CoursesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', count: 24 },
    { id: 'procedures', name: 'Procedimentos', count: 8 },
    { id: 'soft-skills', name: 'Soft Skills', count: 6 },
    { id: 'quality', name: 'Qualidade', count: 5 },
    { id: 'safety', name: 'Segurança', count: 5 }
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'Trilha Básica - Fundamentos',
      level: 'Básico',
      progress: 75,
      courses: 4,
      duration: '12h',
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Trilha Intermediária - Especialização',
      level: 'Intermediário',
      progress: 45,
      courses: 6,
      duration: '18h',
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      title: 'Trilha Avançada - Liderança',
      level: 'Avançado',
      progress: 20,
      courses: 8,
      duration: '24h',
      color: 'bg-red-500'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Técnicas Básicas de Procedimentos Médicos',
      category: 'procedures',
      duration: '4h 30min',
      students: 156,
      rating: 4.8,
      progress: 85,
      isRequired: true,
      instructor: 'Dr. Maria Silva',
      image: 'Medical procedure training session'
    },
    {
      id: 2,
      title: 'Comunicação Efetiva com Pacientes',
      category: 'soft-skills',
      duration: '3h 15min',
      students: 203,
      rating: 4.9,
      progress: 60,
      isRequired: false,
      instructor: 'Psic. João Santos',
      image: 'Healthcare professional communicating with patient'
    },
    {
      id: 3,
      title: 'Controle de Qualidade em Laboratórios',
      category: 'quality',
      duration: '5h 45min',
      students: 89,
      rating: 4.7,
      progress: 0,
      isRequired: true,
      instructor: 'Dra. Ana Costa',
      image: 'Laboratory quality control procedures'
    },
    {
      id: 4,
      title: 'Segurança do Paciente e Prevenção de Erros',
      category: 'safety',
      duration: '6h 20min',
      students: 134,
      rating: 4.8,
      progress: 30,
      isRequired: true,
      instructor: 'Dr. Carlos Lima',
      image: 'Patient safety protocols in healthcare'
    }
  ];

  const recommendedCourses = [
    {
      id: 5,
      title: 'Gestão de Equipes em Saúde',
      reason: 'Baseado no seu perfil de liderança',
      duration: '4h',
      rating: 4.9
    },
    {
      id: 6,
      title: 'Inovação em Procedimentos',
      reason: 'Complementa seus cursos atuais',
      duration: '3h 30min',
      rating: 4.7
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pl-20">
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cursos e Trilhas</h1>
          <p className="text-gray-600">Desenvolva suas competências com nossos cursos especializados</p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Learning Paths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trilhas de Aprendizagem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-hover border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="outline" 
                        className={`${path.color} text-white border-0`}
                      >
                        {path.level}
                      </Badge>
                      <span className="text-sm text-gray-500">{path.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progresso</span>
                          <span className="font-medium">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{path.courses} cursos</span>
                        <Button size="sm" className="h-8">
                          Continuar
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cursos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-hover border-0 shadow-lg overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
                    <img  
                      className="w-full h-full object-cover" 
                      alt={`Course image for ${course.title}`}
                     src="https://images.unsplash.com/photo-1635251595512-dc52146d5ae8" />
                    {course.isRequired && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        Obrigatório
                      </Badge>
                    )}
                    {course.progress > 0 && (
                      <div className="absolute bottom-3 right-3 bg-white rounded-full p-2">
                        <Play className="h-4 w-4 text-blue-500" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-gray-600">por {course.instructor}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{course.students}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        {course.progress > 0 && (
                          <span className="text-sm text-blue-600 font-medium">
                            {course.progress}% concluído
                          </span>
                        )}
                      </div>

                      {course.progress > 0 && (
                        <Progress value={course.progress} className="h-2" />
                      )}

                      <Button 
                        className="w-full" 
                        variant={course.progress > 0 ? "default" : "outline"}
                      >
                        {course.progress > 0 ? 'Continuar' : 'Iniciar Curso'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recomendado para Você</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-hover border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                        <p className="text-sm text-blue-600 mb-3">{course.reason}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Award className="h-6 w-6 text-yellow-500" />
                    </div>
                    <Button variant="outline" className="w-full">
                      Ver Detalhes
                    </Button>
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

export default CoursesScreen;
