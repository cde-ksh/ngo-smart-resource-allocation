import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VolunteerLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary fake login flow
    // Replace later with backend auth
    const fakeVolunteerId = 1;

    navigate(`/volunteer-profile/${fakeVolunteerId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white mb-6 flex items-center text-sm"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-2">
          {isLogin ? "Volunteer Login" : "Volunteer Register"}
        </h2>

        <p className="text-slate-400 mb-8 text-sm">
          Access missions, assignments and community support tasks.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 rounded-xl transition-all"
          >
            {isLogin ? "Login to Portal" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-cyan-400 text-sm hover:underline"
        >
          {isLogin
            ? "Need to register as volunteer?"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default VolunteerLogin;
