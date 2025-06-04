import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, Video, PlayCircle, Eye, Trash2, PlusCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const initialArticles = [
  { 
    id: 1, 
    title: 'Avanços em Telemedicina Pós-Pandemia', 
    docName: 'telemedicina_avancos.docx', 
    status: 'video_gerado', 
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    views: 1250, 
    uploadDate: '2025-05-15',
    thumbnail: 'Abstract image of medical technology'
  },
  { 
    id: 2, 
    title: 'IA na Detecção Precoce de Doenças Crônicas', 
    docName: 'ia_deteccao_doencas.pdf', 
    status: 'processando', 
    progress: 65, 
    uploadDate: '2025-06-01',
    thumbnail: 'AI brain scan analysis'
  },
  { 
    id: 3, 
    title: 'Humanização no Atendimento em Saúde Digital', 
    docName: 'humanizacao_saude_digital.docx', 
    status: 'pendente', 
    uploadDate: '2025-06-03',
    thumbnail: 'Doctor holding patient hand via video call'
  },
];


const AdminArticlesScreen = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [articleTitle, setArticleTitle] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "application/pdf")) {
      setSelectedFile(file);
      if (!articleTitle) {
        setArticleTitle(file.name.split('.').slice(0, -1).join('.')); // Auto-fill title
      }
    } else {
      toast({
        variant: "destructive",
        title: "Arquivo Inválido",
        description: "Por favor, selecione um arquivo .docx ou .pdf.",
      });
      setSelectedFile(null);
    }
  };

  const handleUploadAndGenerate = () => {
    if (!selectedFile || !articleTitle) {
      toast({
        variant: "destructive",
        title: "Campos Obrigatórios",
        description: "Por favor, selecione um arquivo e forneça um título.",
      });
      return;
    }

    const newArticle = {
      id: articles.length + 1,
      title: articleTitle,
      docName: selectedFile.name,
      status: 'processando',
      progress: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      thumbnail: 'Generic document icon'
    };
    setArticles(prev => [newArticle, ...prev]);
    setSelectedFile(null);
    setArticleTitle('');

    toast({
      title: "Upload Iniciado",
      description: `O arquivo "${newArticle.docName}" está sendo processado.`,
    });

    // Simulate processing and video generation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setArticles(prev => prev.map(art => art.id === newArticle.id ? {...art, progress: currentProgress} : art));
      if (currentProgress >= 100) {
        clearInterval(interval);
        setArticles(prev => prev.map(art => art.id === newArticle.id ? {...art, status: 'video_gerado', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: 0} : art));
        toast({
          title: "Vídeo Gerado!",
          description: `O vídeo para "${newArticle.title}" está pronto.`,
          variant: "success"
        });
      }
    }, 500);
  };
  
  const handleDeleteArticle = (articleId) => {
    setArticles(prev => prev.filter(art => art.id !== articleId));
    toast({
      title: "Artigo Removido",
      description: "O artigo foi removido com sucesso.",
    });
  };
  
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-bhio-blue mb-2">Gestão de Artigos e Vídeos</h1>
          <p className="text-gray-600">Faça upload de documentos (.docx, .pdf) para gerar vídeos informativos com IA.</p>
        </motion.div>

        <motion.div 
          variants={itemVariants} initial="hidden" animate="visible"
          className="mb-8"
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bhio-blue flex items-center">
                <PlusCircle className="h-6 w-6 mr-2 text-bhio-green" />
                Novo Artigo para Vídeo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="articleTitle" className="block text-sm font-medium text-gray-700 mb-1">Título do Artigo/Vídeo</label>
                <input 
                  type="text" 
                  id="articleTitle"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Ex: Impacto da IA na Saúde Preventiva"
                  className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-bhio-blue focus:border-bhio-blue"
                />
              </div>
              <div>
                <label htmlFor="docUpload" className="block text-sm font-medium text-gray-700 mb-1">Selecione o Documento (.docx ou .pdf)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-bhio-green hover:text-bhio-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-bhio-blue"
                      >
                        <span>Carregar um arquivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.pdf" />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">DOCX, PDF até 10MB</p>
                  </div>
                </div>
                {selectedFile && <p className="mt-2 text-sm text-gray-700">Arquivo selecionado: <span className="font-medium">{selectedFile.name}</span></p>}
              </div>
              <Button onClick={handleUploadAndGenerate} className="w-full bhio-blue hover-bhio-blue text-white" disabled={!selectedFile || !articleTitle}>
                <Video className="mr-2 h-5 w-5" />
                Fazer Upload e Gerar Vídeo
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-bhio-blue mb-6">Artigos Enviados</h2>
          {articles.length === 0 ? (
             <motion.div className="text-center py-10 bg-white rounded-xl shadow-lg" variants={itemVariants}>
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum artigo enviado ainda</h3>
              <p className="text-gray-500">Use o formulário acima para começar a gerar vídeos.</p>
            </motion.div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <motion.div key={article.id} variants={itemVariants} whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 43, 78, 0.1)" }}>
                <Card className="card-hover border-0 shadow-lg h-full flex flex-col">
                  <div className="relative h-40 bg-gray-200 rounded-t-lg">
                    <img  alt={article.title} class="w-full h-full object-cover rounded-t-lg" src="https://images.unsplash.com/photo-1441458834224-9b5d5a49dda3" />
                    {article.status === 'video_gerado' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-white/80" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-bhio-blue line-clamp-2">{article.title}</CardTitle>
                    <p className="text-xs text-gray-500">Documento: {article.docName}</p>
                    <p className="text-xs text-gray-500">Enviado em: {new Date(article.uploadDate).toLocaleDateString('pt-BR')}</p>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <Badge 
                          variant={
                            article.status === 'video_gerado' ? 'success' : 
                            article.status === 'processando' ? 'warning' : 'default'
                          } 
                          className={
                            article.status === 'video_gerado' ? 'bg-bhio-green text-bhio-blue' : 
                            article.status === 'processando' ? 'bg-yellow-400 text-yellow-800' : 'bg-gray-500 text-white'
                          }
                        >
                          {article.status === 'video_gerado' ? 'Vídeo Gerado' : 
                           article.status === 'processando' ? 'Processando...' : 'Pendente'}
                        </Badge>
                      </div>
                      {article.status === 'processando' && <Progress value={article.progress} className="h-2 [&>div]:bg-yellow-500" />}
                    </div>
                    {article.status === 'video_gerado' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="h-4 w-4 mr-1.5 text-bhio-green" />
                        <span>{article.views || 0} visualizações</span>
                      </div>
                    )}
                  </CardContent>
                  <div className="p-4 border-t border-gray-200 flex gap-2">
                    {article.status === 'video_gerado' && (
                      <Button variant="outline" size="sm" className="flex-1 border-bhio-green text-bhio-green hover:bg-bhio-green hover:text-bhio-blue">
                        <PlayCircle className="mr-1.5 h-4 w-4" /> Assistir
                      </Button>
                    )}
                     {article.status === 'pendente' && (
                      <Button size="sm" className="flex-1 bhio-green hover-bhio-green text-bhio-blue">
                        <Video className="mr-1.5 h-4 w-4" /> Gerar Vídeo
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center"><AlertTriangle className="h-5 w-5 mr-2 text-red-500"/>Confirmar Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o artigo e o vídeo associado a "{article.title}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteArticle(article.id)} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminArticlesScreen;