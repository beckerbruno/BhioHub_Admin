import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Briefcase } from 'lucide-react';

// Fix for default Leaflet icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const talentLocations = [
  { id: 1, name: 'Dr. Ana Silva', role: 'Cardiologista Sênior', city: 'São Paulo', state: 'SP', position: [-23.5505, -46.6333], expertise: ['Cardiologia', 'Gestão'], phone: '+55 11 85858-55555' },
  { id: 2, name: 'Enf. Bruno Costa', role: 'Enfermeiro Chefe UTI', city: 'Rio de Janeiro', state: 'RJ', position: [-22.9068, -43.1729], expertise: ['UTI', 'Emergência'], phone: '+55 21 77777-7777' },
  { id: 3, name: 'Fisio. Carla Lima', role: 'Fisioterapeuta Respiratória', city: 'Belo Horizonte', state: 'MG', position: [-19.9167, -43.9345], expertise: ['Respiratória', 'Reabilitação'], phone: '+55 31 55555-5555' },
  { id: 4, name: 'Dr. Marcos Oliveira', role: 'Cirurgião Geral', city: 'Curitiba', state: 'PR', position: [-25.4284, -49.2733], expertise: ['Cirurgia', 'Auditoria'], phone: '+55 41 99999-9999' },
  { id: 5, name: 'Dra. Sofia Pereira', role: 'Pediatra', city: 'Porto Alegre', state: 'RS', position: [-30.0346, -51.2177], expertise: ['Pediatria', 'Neonatal'], phone: '+55 51 88888-8888' },
  { id: 6, name: 'Psic. Ricardo Alves', role: 'Psicólogo Clínico', city: 'Salvador', state: 'BA', position: [-12.9714, -38.5014], expertise: ['Clínica', 'Terapia Comportamental'], phone: '+55 73 66666-6666' },
];

const FitBoundsToMarkers = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => loc.position));
      if (bounds.isValid()) {
         map.fitBounds(bounds, { padding: [50, 50] });
      } else if (locations.length === 1) {
        map.setView(locations[0].position, 10); // Zoom to a single marker
      }
    }
  }, [locations, map]);
  return null;
};


const AdminGeolocationScreen = () => {
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [mapCenter, setMapCenter] = useState([-14.2350, -51.9253]); // Brazil center
  const [zoomLevel, setZoomLevel] = useState(4);

  const handleMarkerClick = (talent) => {
    setSelectedTalent(talent);
    setMapCenter(talent.position);
    setZoomLevel(12);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      <div className="p-8 flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust height for header if any */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-bhio-blue mb-2">Geolocalização de Talentos</h1>
          <p className="text-gray-600">Visualize a distribuição dos talentos BhioHub no mapa.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 h-[calc(100vh-12rem)]"> {/* Adjust height */}
             <Card className="h-full shadow-xl border-0">
              <CardContent className="p-0 h-full">
                <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={true} className="h-full w-full rounded-lg">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {talentLocations.map(talent => (
                    <Marker 
                      key={talent.id} 
                      position={talent.position}
                      eventHandlers={{ click: () => handleMarkerClick(talent) }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-bold text-bhio-blue">{talent.name}</p>
                          <p className="text-gray-700">{talent.role}</p>
                          <p className="text-gray-500">{talent.city}, {talent.state}</p>
                          <p className="text-gray-500">{talent.phone}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  <FitBoundsToMarkers locations={talentLocations} />
                </MapContainer>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} className="h-[calc(100vh-12rem)] overflow-y-auto"> {/* Adjust height */}
            <Card className="shadow-xl border-0 h-full">
              <CardHeader>
                <CardTitle className="text-bhio-blue flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-bhio-green" />
                  Informações do Talento
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTalent ? (
                  <motion.div 
                    key={selectedTalent.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <h3 className="text-xl font-semibold text-bhio-blue">{selectedTalent.name}</h3>
                    <p className="text-gray-700 flex items-center"><Briefcase size={16} className="mr-2 text-bhio-green" /> {selectedTalent.role}</p>
                    <p className="text-gray-600 flex items-center"><MapPin size={16} className="mr-2 text-bhio-green" /> {selectedTalent.city}, {selectedTalent.state}</p>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Especialidades:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTalent.expertise.map(exp => (
                          <Badge key={exp} variant="secondary" className="bhio-green text-bhio-blue text-xs">{exp}</Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>Selecione um talento no mapa para ver os detalhes.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminGeolocationScreen;