import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Settings, 
  Zap, 
  ShieldCheck, 
  Globe, 
  BarChart3, 
  Fingerprint,
  Award,
  Circle
} from 'lucide-react';

const VolunteerProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-4 md:p-10 selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP NAVIGATION: CRADLE STYLING */}
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => navigate('/volunteer-dashboard')}
            className="group flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-cyan-400 transition-all"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Return to Core
          </button>
          
          <div className="flex items-center space-x-2">
             <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">System Link Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: THE IDENTITY CRADLE */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 text-center relative overflow-hidden group">
              {/* Futuristic Scanner Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000" />
              
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-700 p-2 group-hover:rotate-180 transition-all duration-[2s]">
                   <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <Fingerprint size={32} className="text-cyan-500" />
                   </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-slate-950 p-1 rounded-lg">
                  <ShieldCheck size={14} />
                </div>
              </div>

              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Volunteer_Node_01</h2>
              <p className="text-[10px] text-cyan-500 font-mono mt-1 uppercase tracking-[0.2em]">Class: Community Sentinel</p>
              
              <div className="mt-8 pt-8 border-t border-slate-800/50 space-y-4">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-500 uppercase">Trust Rating</span>
                  <span className="text-emerald-400">98.2%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className="bg-emerald-500 h-full" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                 <Globe size={14} className="mr-2 text-indigo-400" /> Bio-Signature
               </h3>
               <p className="text-xs leading-relaxed text-slate-400">
                 Focused on local logistics and emergency food distribution. Committed to the zero-waste community protocol.
               </p>
            </div>
          </div>

          {/* RIGHT COLUMN: DATA & ANALYTICS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STATS STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: "Synced", val: "12", icon: <Zap size={14}/> },
                 { label: "Points", val: "840", icon: <Award size={14}/> },
                 { label: "Hours", val: "102", icon: <BarChart3 size={14}/> },
                 { label: "Impact", val: "High", icon: <Circle size={14}/> }
               ].map((s, i) => (
                 <div key={i} className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl hover:border-cyan-500/50 transition-colors">
                    <div className="text-cyan-500 mb-2">{s.icon}</div>
                    <p className="text-lg font-black text-white tracking-tighter">{s.val}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                 </div>
               ))}
            </div>

            {/* CONTRIBUTION LOG */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8">
               <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center">
                 <BarChart3 size={18} className="mr-2 text-cyan-500" /> Recent Node Activity
               </h3>
               
               <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-cyan-500 rounded-full flex items-center justify-center">
                       <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide">Emergency Ration Drop</h4>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono tracking-tighter">Sector 4 Hub • Verified via GPS</p>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-500">+50 PTS</span>
                    </div>
                  </div>

                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Resource Inventory Update</h4>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-mono tracking-tighter">System Log #4229 • Remote Action</p>
                      </div>
                      <span className="text-[9px] font-mono text-slate-700">+10 PTS</span>
                    </div>
                  </div>
               </div>

               <button className="mt-10 w-full py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all">
                  Request Impact Certificate
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;