import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <div className="lg:w-1/2 flex flex-col justify-center px-12 py-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-6xl font-extrabold leading-tight tracking-tighter">
            Bridging the <br/><span className="text-indigo-500">Impact Gap.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg max-w-md">
            A data-driven ecosystem transforming scattered community needs into organized social action.
          </p>
        </motion.div>
      </div>

      <div className="lg:w-1/2 bg-slate-900 flex flex-col justify-center px-12 py-20 space-y-6">
        <motion.div 
          onClick={() => navigate('/ngo-auth')}
          whileHover={{ scale: 1.02 }}
          className="p-8 bg-slate-800 rounded-3xl border border-slate-700 cursor-pointer hover:border-indigo-500 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Building2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">NGO / Social Group</h3>
                <p className="text-slate-400 text-sm">Manage needs and field reports</p>
              </div>
            </div>
            <ChevronRight className="text-slate-600 group-hover:text-indigo-400" />
          </div>
        </motion.div>

        <motion.div 
          onClick={() => navigate('/volunteer-auth')}
          whileHover={{ scale: 1.02 }}
          className="p-8 bg-slate-800 rounded-3xl border border-slate-700 cursor-pointer hover:border-cyan-500 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Volunteer</h3>
                <p className="text-slate-400 text-sm">Discover and apply for missions</p>
              </div>
            </div>
            <ChevronRight className="text-slate-600 group-hover:text-cyan-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;