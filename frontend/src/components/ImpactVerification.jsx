import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Camera, Loader2, MapPin } from 'lucide-react';

const ImpactVerification = () => {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const startVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 3000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mt-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-white flex items-center">
          <Shield size={16} className="mr-2 text-cyan-400" /> Proof of Impact
        </h4>
        {verified && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Verified by AI</span>}
      </div>

      {!verified ? (
        <button 
          onClick={startVerify}
          disabled={verifying}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
        >
          {verifying ? (
            <>
              <Loader2 size={18} className="animate-spin text-cyan-400" />
              <span>Analyzing Metadata...</span>
            </>
          ) : (
            <>
              <Camera size={18} className="text-cyan-400" />
              <span>Upload Delivery Photo</span>
            </>
          )}
        </button>
      ) : (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
          <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden relative group">
             {/* Mock image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs text-center p-4">
              [ Verified Field Photo: Food Distribution ]
            </div>
            <div className="absolute top-2 left-2 bg-emerald-500 text-white p-1 rounded-full">
              <CheckCircle size={14} />
            </div>
          </div>
          <div className="flex items-center text-[10px] text-slate-500 font-mono">
            <MapPin size={10} className="mr-1" /> Lat: 28.6139 | Long: 77.2090
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImpactVerification;