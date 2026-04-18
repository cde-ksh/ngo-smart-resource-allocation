import React from 'react';
// FIXED IMPORTS
import { motion } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  ShieldCheck, 
  MapPin, 
  Globe,
  LogOut,
  ArrowRight
} from 'lucide-react';

const NGOProfile = () => {
  const navigate = useNavigate();

  const orgData = {
    name: "Global Relief Network",
    email: "admin@globalrelief.org",
    location: "New Delhi, India",
    status: "Verified Provider",
    id: "NGO-8829-XP"
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Side Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -mr-48 -mt-48" />

      {/* Top Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
        <div className="text-xl font-bold tracking-widest">
          IMPACT<span className="text-indigo-500">SYNC</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Support</button>
          <button onClick={() => navigate('/')} className="flex items-center text-red-400 hover:text-red-300 transition-colors text-sm font-medium">
            <LogOut size={16} className="mr-2" /> Logout
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-6">
                  <span className="text-3xl font-bold text-white">GR</span>
                </div>
                <h2 className="text-2xl font-bold">{orgData.name}</h2>
                <div className="mt-2 flex items-center text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  <ShieldCheck size={14} className="mr-1" /> {orgData.status}
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-center text-slate-400">
                  <FileText size={18} className="mr-4 text-indigo-400" />
                  <span className="text-sm">ID: {orgData.id}</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <MapPin size={18} className="mr-4 text-indigo-400" />
                  <span className="text-sm">{orgData.location}</span>
                </div>
                <div className="flex items-center text-slate-400">
                  <Globe size={18} className="mr-4 text-indigo-400" />
                  <span className="text-sm">globalrelief.org</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Gateway to Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-10 shadow-2xl shadow-indigo-500/20 overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 text-white">Ready to manage <br />community impact?</h3>
                <p className="text-indigo-100 mb-8 max-w-md opacity-90">
                  Your organization portal is now active. Access real-time field data, coordinate volunteers, and deploy resources.
                </p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl flex items-center group-hover:gap-4 transition-all hover:bg-indigo-50 shadow-xl"
                >
                  <LayoutDashboard className="mr-2" size={20} />
                  <span>Enter NGO Dashboard</span>
                  <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
              <LayoutDashboard size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-colors cursor-pointer group">
                <div className="h-12 w-12 bg-slate-800 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 rounded-xl flex items-center justify-center text-slate-500 mb-4 font-bold transition-all">01</div>
                <h4 className="font-bold text-lg mb-2">Resource Inventory</h4>
                <p className="text-slate-400 text-sm">Review available food, medical supplies, and shelter kits.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-colors cursor-pointer group">
                <div className="h-12 w-12 bg-slate-800 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 rounded-xl flex items-center justify-center text-slate-500 mb-4 font-bold transition-all">02</div>
                <h4 className="font-bold text-lg mb-2">Field Surveys</h4>
                <p className="text-slate-400 text-sm">Upload or review digitized paper surveys from community zones.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default NGOProfile;