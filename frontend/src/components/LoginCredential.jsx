import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

const NGOCredentials = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    organization_name: "",
    email: "",
    password: "",
  });

  /*
  =====================================
  HANDLE SUBMIT
  =====================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
    TEMPORARY LOGIN LOGIC
    ----------------------------------
    Since backend auth is not built yet,
    we simulate login and redirect using
    fake NGO id = 1

    Later replace with:
    - JWT login
    - backend validation
    - session/token storage
    */

    const fakeNgoId = 1;

    navigate(`/ngo-profile/${fakeNgoId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white mb-6 flex items-center text-sm"
        >
          <ArrowLeft
            size={16}
            className="mr-2"
          />
          Back
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-white mb-2">
          {isLogin ? "NGO Login" : "NGO Register"}
        </h2>

        <p className="text-slate-400 mb-8 text-sm">
          Authorized access for NGO operations.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* REGISTER ONLY */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Organization Name"
              value={formData.organization_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  organization_name:
                    e.target.value,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white"
              required
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Official Email"
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

          {/* PASSWORD */}
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

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all"
          >
            {isLogin
              ? "Login to Portal"
              : "Create Account"}
          </button>
        </form>

        {/* TOGGLE */}
        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="w-full mt-6 text-indigo-400 text-sm hover:underline"
        >
          {isLogin
            ? "Need to register your NGO?"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default NGOCredentials;