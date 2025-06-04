import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Edit3, Shield, Bell, Save, Mail, Phone, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminProfileScreen = () => {
  const { toast } = useToast();
  const [adminData, setAdminData] = useState({
    name: 'Administrador BhioHub',
    email: 'admin@bhiohub.com.br',
    phone: '(11) 98765-4321',
    role: 'Super Administrador',
    avatar: 'Admin user icon with a blue tie'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(adminData);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically send data to a backend
    setAdminData(formData);
    setIsEditing(false);
    toast({
      title: "Perfil Atualizado",
      description: "Suas informações foram salvas com sucesso.",
      variant: "success"
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro na Senha",
        description: "A nova senha e a confirmação não coincidem.",
      });
      return;
    }
    if (newPassword.length < 6) {
       toast({
        variant: "destructive",
        title: "Senha Inválida",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    // Add actual password change logic here (e.g., API call)
    console.log("Changing password with current:", currentPassword, "new:", newPassword);
    toast({
      title: "Senha Alterada",
      description: "Sua senha foi alterada com sucesso.",
      variant: "success"
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
          <h1 className="text-3xl font-bold text-bhio-blue mb-2">Perfil do Administrador</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e configurações de segurança.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <motion.div className="lg:col-span-2" variants={itemVariants} initial="hidden" animate="visible">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-bhio-blue flex items-center">
                  <UserCircle className="h-6 w-6 mr-2 text-bhio-green" />
                  Informações Pessoais
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="border-bhio-blue text-bhio-blue hover:bg-bhio-blue hover:text-white">
                  <Edit3 className="mr-2 h-4 w-4" />
                  {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-bhio-blue to-bhio-green flex items-center justify-center overflow-hidden">
                    <img  alt={adminData.name} class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1643101447193-9c59d5db2771" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-bhio-blue">{adminData.name}</h2>
                    <p className="text-bhio-green">{adminData.role}</p>
                  </div>
                </div>

                {isEditing ? (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1" />
                    </div>
                     <div>
                      <Label htmlFor="role">Cargo</Label>
                      <Input id="role" name="role" value={formData.role} onChange={handleInputChange} className="mt-1" />
                    </div>
                    <Button onClick={handleSaveProfile} className="w-full bhio-blue hover-bhio-blue text-white">
                      <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-3 text-gray-700">
                    <div className="flex items-center"><Mail className="h-5 w-5 mr-3 text-bhio-green" /> Email: {adminData.email}</div>
                    <div className="flex items-center"><Phone className="h-5 w-5 mr-3 text-bhio-green" /> Telefone: {adminData.phone}</div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Security and Settings Card */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-bhio-blue flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-bhio-green" />
                  Segurança e Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-bhio-blue mb-2 flex items-center"><Key className="h-5 w-5 mr-2 text-bhio-green"/>Alterar Senha</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" />
                    </div>
                    <Button onClick={handleChangePassword} className="w-full bhio-green hover-bhio-green text-bhio-blue">
                      Alterar Senha
                    </Button>
                  </div>
                </div>
                <hr/>
                <div>
                  <h3 className="text-lg font-semibold text-bhio-blue mb-3 flex items-center"><Bell className="h-5 w-5 mr-2 text-bhio-green"/>Notificações</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifications" className="text-gray-700">Notificações por Email</Label>
                      {/* Switch component would go here, using a checkbox as placeholder */}
                      <input type="checkbox" id="emailNotifications" className="form-checkbox h-5 w-5 text-bhio-green rounded focus:ring-bhio-blue" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                      <Label htmlFor="appNotifications" className="text-gray-700">Notificações no App</Label>
                      <input type="checkbox" id="appNotifications" className="form-checkbox h-5 w-5 text-bhio-green rounded focus:ring-bhio-blue" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileScreen;