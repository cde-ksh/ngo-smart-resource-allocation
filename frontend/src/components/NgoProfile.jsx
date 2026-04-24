import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  MapPin,
  Globe,
  LogOut,
  ArrowRight,
} from "lucide-react";
import axios from "axios";

const NGOProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  ====================================
  FETCH NGO PROFILE
  ====================================
  */

  useEffect(() => {
    /*
    TEMPORARY:
    Since NGO backend profile endpoint
    is not fully built yet, we use fallback
    mock data.

    Later replace with:
    GET /ngo/{id}
    */

    setOrgData({
      id: `NGO-${id}`,
      name: "Global Relief Network",
      email: "admin@globalrelief.org",
      location: "New Delhi, India",
      status: "Verified Provider",
      website: "globalrelief.org",
    });

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading NGO Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Glow Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -mr-48 -mt-48" />

      {/* TOP NAV */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
        <div className="text-xl font-bold tracking-widest">
          IMPACT
          <span className="text-indigo-500">
            SYNC
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-slate-400 hover:text-white text-sm">
            Support
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center text-red-400 text-sm"
          >
            <LogOut
              size={16}
              className="mr-2"
            />
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold">
                    GR
                  </span>
                </div>

                <h2 className="text-2xl font-bold">
                  {orgData.name}
                </h2>

                <div className="mt-3 flex items-center text-emerald-400 text-xs font-bold uppercase bg-emerald-400/10 px-3 py-1 rounded-full">
                  <ShieldCheck
                    size={14}
                    className="mr-1"
                  />
                  {orgData.status}
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-center text-slate-400">
                  <FileText
                    size={18}
                    className="mr-4 text-indigo-400"
                  />
                  <span className="text-sm">
                    ID: {orgData.id}
                  </span>
                </div>

                <div className="flex items-center text-slate-400">
                  <MapPin
                    size={18}
                    className="mr-4 text-indigo-400"
                  />
                  <span className="text-sm">
                    {orgData.location}
                  </span>
                </div>

                <div className="flex items-center text-slate-400">
                  <Globe
                    size={18}
                    className="mr-4 text-indigo-400"
                  />
                  <span className="text-sm">
                    {orgData.website}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* DASHBOARD ACCESS */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to manage
                <br />
                community impact?
              </h3>

              <p className="text-indigo-100 mb-8 max-w-md">
                Your organization portal is active.
                Access real-time field data,
                coordinate volunteers, and deploy
                resources.
              </p>

              <button
                onClick={() =>
                  navigate("/ngo-dashboard")
                }
                className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl flex items-center"
              >
                <LayoutDashboard
                  className="mr-2"
                  size={20}
                />
                Enter NGO Dashboard
                <ArrowRight
                  size={20}
                  className="ml-2"
                />
              </button>
            </div>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-2">
                  Resource Inventory
                </h4>

                <p className="text-slate-400 text-sm">
                  Review food, medicine, and
                  emergency resource stock.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <h4 className="font-bold text-lg mb-2">
                  Field Surveys
                </h4>

                <p className="text-slate-400 text-sm">
                  Upload and review survey reports
                  from affected zones.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NGOProfile;