import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Crosshair, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// FIX FOR LEAFLET MARKERS
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const ImpactMap = () => {
  const points = [
    { id: 1, pos: [28.638, 77.189], title: "Supply Chain Block", type: "critical", risk: 0.9 },
    { id: 2, pos: [28.643, 77.179], title: "Verified Distribution", type: "success", risk: 0.2 }
  ];

  return (
    <div className="h-screen w-full bg-[#0a0f1d] relative overflow-hidden">
      
      {/* MAP CONTROLS */}
      <div className="absolute top-8 left-8 z-[1000] w-72 pointer-events-none">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl pointer-events-auto">
          <h2 className="text-white font-black text-lg mb-6 flex items-center tracking-tighter">
            <Crosshair size={18} className="mr-2 text-rose-500 animate-pulse" /> TACTICAL HEATMAP
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span className="flex items-center"><AlertTriangle size={12} className="mr-2 text-rose-500"/> High Risk Zones</span>
              <span className="text-rose-500">02</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
              <span className="flex items-center"><ShieldCheck size={12} className="mr-2 text-emerald-500"/> Secured Units</span>
              <span className="text-emerald-500">14</span>
            </div>
          </div>
        </motion.div>
      </div>

      <MapContainer center={[28.6139, 77.2090]} zoom={13} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        
        {points.map(p => (
          <React.Fragment key={p.id}>
            {/* HEAT GLOW */}
            <Circle 
              center={p.pos} 
              radius={1800} 
              pathOptions={{ 
                color: p.risk > 0.5 ? '#f43f5e' : '#6366f1', 
                fillOpacity: p.risk * 0.1, 
                weight: 0 
              }} 
            />
            {/* CORE MARKER */}
            <Circle 
              center={p.pos} 
              radius={400} 
              pathOptions={{ 
                color: p.type === 'critical' ? '#f43f5e' : '#10b981', 
                fillOpacity: 0.4,
                weight: 2 
              }} 
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default ImpactMap;