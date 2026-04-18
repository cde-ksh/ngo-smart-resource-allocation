import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Camera, Shield, CheckCircle, Loader2 } from 'lucide-react';

const FieldReport = () => {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-md mx-auto">
        <button onClick={() => navigate('/volunteer-dashboard')} className="flex items-center text-slate-400 mb-8"><ArrowLeft size={18} className="mr-2" /> Exit</button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-cyan-400 underline underline-offset-8">Field Report</h2>
          <form className="space-y-5">
            <div><label className="text-[10px] font-bold text-slate-500 uppercase">Beneficiaries</label>
            <input type="number" placeholder="No. of people helped" className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 outline-none" required /></div>
            
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase">Impact Verification</h4>
                {verified && <CheckCircle size={14} className="text-emerald-500" />}
              </div>
              <button type="button" onClick={() => { setVerifying(true); setTimeout(() => { setVerifying(false); setVerified(true); }, 2000); }} className="w-full bg-slate-700 py-3 rounded-xl flex items-center justify-center text-xs font-bold">
                {verifying ? <Loader2 size={16} className="animate-spin mr-2" /> : verified ? "Photo Verified" : <><Camera size={16} className="mr-2" /> Upload Proof</>}
              </button>
            </div>
            
            <button className="w-full bg-cyan-600 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20">Submit Final Data</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default FieldReport;