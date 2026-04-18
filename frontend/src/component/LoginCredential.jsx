import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import { Building2, Mail, Lock, ArrowLeft } from 'lucide-react';

const NGOCredentials = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd check API here. For hackathon, we just go to profile.
    navigate('/ngo-profile'); 
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white mb-6 flex items-center text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'NGO Login' : 'NGO Register'}</h2>
        <p className="text-slate-400 mb-8 text-sm">Authorized access for social organizations.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Organization Name" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" required />
          )}
          <input type="email" placeholder="Official Email" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" required />
          <input type="password" placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" required />
          
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all">
            {isLogin ? 'Login to Portal' : 'Create Account'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-6 text-indigo-400 text-sm hover:underline">
          {isLogin ? "Need to register your NGO?" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default NGOCredentials;