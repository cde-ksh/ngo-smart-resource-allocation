import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, LogOut, Heart, UserCircle, 
  Zap, Trophy, Package, ShieldCheck, 
  CloudOff, CloudCheck, ArrowRight, Share2
} from 'lucide-react';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [appliedId, setAppliedId] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Simulated Sync Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSyncing(true);
      setTimeout(() => setSyncing(false), 2000);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const tasks = [
    { id: 1, title: "Distribute Seed Kits", location: "Sector 9 Hub", time: "1h", urgency: "Critical", points: 150 },
    { id: 2, title: "Data Audit: Water Wells", location: "North Grid", time: "3h", urgency: "High", points: 80 },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30">
      
      {/* CRADLE SYSTEM NAV */}
      <nav className="border-b border-slate-800/50 px-8 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-white">Impact<span className="text-cyan-500">Sync</span></span>
        </div>

        <div className="flex items-center space-x-6">
          {/* OFFLINE SYNC STATUS */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
            {syncing ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Share2 size={12} className="text-cyan-500" />
              </motion.div>
            ) : isOnline ? <CloudCheck size={12} className="text-emerald-500" /> : <CloudOff size={12} className="text-red-500" />}
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
              {syncing ? "Syncing Nodes" : "System Live"}
            </span>
          </div>
          
          <UserCircle size={22} className="text-slate-500 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => navigate('/volunteer-profile')} />
          <LogOut size={18} className="text-slate-700 cursor-pointer hover:text-red-500 transition-colors" onClick={() => navigate('/')} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: NODE STATUS & PEER VOUCHING */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={80} /></div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Node Identity</p>
             <h3 className="text-2xl font-black text-white italic tracking-tighter mb-1">Volunteer_01</h3>
             <p className="text-xs text-cyan-500 font-mono">Rank: Community Sentinel</p>
             
             <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Impact Pts</p>
                  <p className="text-xl font-black text-white">1,240</p>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Vouches</p>
                  <p className="text-xl font-black text-emerald-400">18</p>
                </div>
             </div>
          </div>

          {/* PEER VOUCHING WIDGET */}
          <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-[2rem] p-6">
            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center">
              <ShieldCheck size={14} className="mr-2" /> Peer Verification Req.
            </h4>
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                <span className="text-white font-bold">Node_88</span> completed a Ration Drop 200m away. Confirm delivery?
              </p>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase rounded-lg transition-all">
                Vouch Node
              </button>
            </div>
          </div>
        </div>

        {/* CENTER: MISSION FEED */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-white uppercase tracking-widest">Active Need Grids</h2>
            <div className="h-[1px] flex-1 bg-slate-800 mx-6 hidden md:block" />
            <button onClick={() => navigate('/impact-map')} className="text-[10px] font-black text-cyan-500 hover:underline tracking-widest uppercase">Open Map View</button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <motion.div 
                key={task.id} 
                whileHover={{ x: 10 }}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between group hover:border-cyan-500/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${
                      task.urgency === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    }`}>
                      {task.urgency}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 tracking-tighter">ID: {Math.random().toString(36).substr(2, 5).toUpperCase()}</span>
                  </div>
                  <h3 className="text-lg font-black text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{task.title}</h3>
                  <div className="flex items-center space-x-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center"><MapPin size={12} className="mr-1 text-cyan-500" /> {task.location}</span>
                    <span className="flex items-center"><Clock size={12} className="mr-1 text-cyan-500" /> {task.time}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => { setAppliedId(task.id); setTimeout(() => navigate('/field-report'), 1200); }}
                  className="mt-6 md:mt-0 w-full md:w-auto px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-xl shadow-white/5"
                >
                  {appliedId === task.id ? 'Accepting...' : 'Sync Mission'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* SYSTEM FOOTER */}
          <div className="mt-12 p-8 border border-dashed border-slate-800 rounded-[2rem] text-center">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
              Data provided by community nodes • End-to-end verified
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;