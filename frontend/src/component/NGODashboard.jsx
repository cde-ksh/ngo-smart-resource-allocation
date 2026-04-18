import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Map, Bell, Search, Plus, 
  LogOut, X, Zap, Activity, CheckCircle, Camera, 
  Database, Package, HandHelping, Clock 
} from 'lucide-react';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missionName, setMissionName] = useState("");
  const [missionZone, setMissionZone] = useState("");
  
  const [missions, setMissions] = useState([
    { id: "01", task: "Dry Ration Distribution", zone: "East Slum", status: "In-Progress" },
    { id: "02", task: "First Aid Training", zone: "Sector 4 Hub", status: "Scheduled" },
  ]);

  const handleCreateMission = (e) => {
    e.preventDefault();
    const newMission = { 
      id: String(missions.length + 1).padStart(2, '0'), 
      task: missionName, 
      zone: missionZone, 
      status: "New" 
    };
    setMissions([newMission, ...missions]);
    setIsModalOpen(false);
    setMissionName(""); setMissionZone("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden lg:flex flex-col p-6">
        <div className="text-xl font-bold tracking-widest text-white mb-10 italic">
          IMPACT<span className="text-cyan-500">SYNC</span>
        </div>
        <nav className="flex-1 space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400 bg-cyan-500/10 p-3 rounded-xl cursor-pointer border border-cyan-500/20">
            <LayoutDashboard size={20} /> <span className="font-bold">Operations Hub</span>
          </div>
          <div onClick={() => navigate('/impact-map')} className="flex items-center space-x-3 text-slate-400 hover:text-white p-3 cursor-pointer transition-all">
            <Map size={20} /> <span>Live Need Map</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400 hover:text-white p-3 cursor-pointer transition-all">
            <Users size={20} /> <span>Community</span>
          </div>
        </nav>
        <button onClick={() => navigate('/')} className="flex items-center space-x-3 text-red-400 p-3 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} /> <span>Exit System</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="relative w-72 text-slate-400">
            <Search size={16} className="absolute left-3 top-2.5" />
            <input type="text" placeholder="Search resources..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-xs outline-none" />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold shadow-lg shadow-cyan-500/20">
            <Plus size={18} className="mr-2" /> Launch Mission
          </button>
        </header>

        <div className="p-8">
          {/* SECTION 1: TOP STATS & MISSIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Community Control</h1>
                  <p className="text-slate-400 mt-1">Directing local resources to active needs.</p>
                </div>
                <div className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-bold border border-cyan-500/20">
                   BOOTSTRAPPED MODE ACTIVE
                </div>
              </div>

              {/* MISSION TABLE */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800/50 text-slate-500 uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Resource Goal</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {missions.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-800/20">
                        <td className="px-6 py-4 font-bold text-white">{m.task}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs">{m.zone}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-slate-800 text-cyan-400 text-[10px] font-bold border border-slate-700">
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LIVE FEED */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full shadow-xl">
                <h3 className="font-bold text-white mb-6 flex items-center text-sm uppercase tracking-wider">
                  <Activity size={18} className="mr-2 text-cyan-500" /> Need Pulse
                </h3>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l border-cyan-500/30">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                    <p className="text-xs text-slate-300">Resident #14 donated <span className="text-cyan-400">5kg Rice</span></p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase">Just Now</p>
                  </div>
                  <div className="relative pl-6 border-l border-slate-800">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-700" />
                    <p className="text-xs text-slate-400">Medical mission #02 requires more <span className="text-red-400">Bandages</span></p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase">1h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: COMMUNITY RESOURCE SYNC (BOOTSTRAP VERSION) */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resource Stocks */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl lg:col-span-1">
              <h3 className="font-bold text-white flex items-center text-sm mb-6">
                <Package size={18} className="mr-2 text-amber-400" /> Pooled Supplies
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold"><span>FOOD STOCK</span><span>74%</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[74%] shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-bold"><span>VOLUNTEER HOURS</span><span>40h Available</span></div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[40%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution Ledger */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl lg:col-span-2">
              <h3 className="font-bold text-white flex items-center text-sm mb-6">
                <HandHelping size={18} className="mr-2 text-indigo-400" /> Community Contribution Ledger
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { user: "Resident A", item: "First Aid Kit", mission: "Sector 4", status: "Received" },
                  { user: "Local Baker", item: "20 Bread Loaves", mission: "Morning Slum Run", status: "Assigned" }
                ].map((d, i) => (
                  <div key={i} className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-all">
                    <div>
                      <p className="text-xs font-bold text-white">{d.item}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Source: {d.user}</p>
                    </div>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${d.status === 'Received' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: PROOF OF IMPACT GALLERY */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Camera size={20} className="mr-2 text-cyan-500" /> Action Proof Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-2 rounded-2xl">
                  <div className="aspect-square bg-slate-800/50 rounded-xl mb-2 flex items-center justify-center text-[10px] text-slate-600 font-bold uppercase text-center p-2">
                    Media Proof {i}
                  </div>
                  <div className="flex items-center text-emerald-500 text-[8px] font-bold">
                    <CheckCircle size={10} className="mr-1" /> VERIFIED
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* MISSION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={24} /></button>
              <h2 className="text-xl font-bold text-white mb-6">Launch Community Mission</h2>
              <form onSubmit={handleCreateMission} className="space-y-4 text-xs">
                <input autoFocus type="text" value={missionName} onChange={(e) => setMissionName(e.target.value)} placeholder="What needs to be done? (e.g. Gather Blankets)" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-4 text-white outline-none" required />
                <input type="text" value={missionZone} onChange={(e) => setMissionZone(e.target.value)} placeholder="Which Area?" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-4 text-white outline-none" required />
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-bold text-white shadow-lg transition-all mt-4 uppercase tracking-widest">Broadcast Mission</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NGODashboard;