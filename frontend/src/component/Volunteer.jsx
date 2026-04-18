import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Heart, ArrowLeft } from 'lucide-react';

const Volunteer = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  
  // State to hold the inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // SAVE DATA TO LOCAL STORAGE
    localStorage.setItem('volunteerName', formData.fullName);
    localStorage.setItem('volunteerEmail', formData.email);
    
    navigate('/volunteer-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
        <button onClick={() => navigate('/')} className="flex items-center text-slate-400 mb-8 hover:text-white transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Welcome Back' : 'Join as Volunteer'}</h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-cyan-500 text-white" 
                required 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            )}
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-cyan-500 text-white" 
              required 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:border-cyan-500 text-white" 
              required 
            />

            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center space-x-2">
              <span>{isLogin ? 'Sign In' : 'Start Volunteering'}</span>
              <Heart size={18} fill="currentColor" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Volunteer;