import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Map,
  Search,
  Plus,
  LogOut,
  X,
  Activity,
  CheckCircle,
  Camera,
  Package,
  HandHelping,
} from "lucide-react";

import {
  getRequests,
  createRequest,
  allocateRequest,
} from "../api/api";

const NGODashboard = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missionName, setMissionName] = useState("");
  const [missionZone, setMissionZone] = useState("");
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch missions from backend
  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    try {
      const data = await getRequests();
      setMissions(data);
    } catch (err) {
      console.error("Failed to fetch missions:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create mission (POST → backend)
  const handleCreateMission = async (e) => {
    e.preventDefault();

    const data = {
      title: missionName,
      location: missionZone,
      urgency: "high",
    };

    try {
      await createRequest(data);
      await fetchMissions();

      setIsModalOpen(false);
      setMissionName("");
      setMissionZone("");
    } catch (err) {
      console.error("Mission creation failed:", err);
    }
  };

  // 🔹 Allocate volunteers
  const handleAllocate = async (id) => {
    try {
      await allocateRequest(id);
      await fetchMissions();
    } catch (err) {
      console.error("Allocation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden lg:flex flex-col p-6">
        <div className="text-xl font-bold text-white mb-10">
          IMPACT<span className="text-cyan-500">SYNC</span>
        </div>

        <nav className="flex-1 space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400 bg-cyan-500/10 p-3 rounded-xl">
            <LayoutDashboard size={20} />
            <span>Operations Hub</span>
          </div>

          <div onClick={() => navigate("/impact-map")} className="cursor-pointer p-3">
            <Map size={20} /> Live Need Map
          </div>
        </nav>

        <button onClick={() => navigate("/")} className="text-red-400 p-3">
          <LogOut size={20} /> Exit
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">

        {/* HEADER */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-2.5" />
            <input
              placeholder="Search..."
              className="w-full bg-slate-900 border rounded py-2 pl-10"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 px-4 py-2 rounded"
          >
            <Plus size={16} /> Launch Mission
          </button>
        </header>

        <div className="p-8">

          {/* TITLE */}
          <h1 className="text-2xl font-bold mb-6">Community Missions</h1>

          {/* TABLE */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm">
                  <th>Task</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {missions.map((m) => (
                  <tr key={m.id} className="border-t border-slate-800">
                    <td>{m.title}</td>
                    <td>{m.location}</td>
                    <td>{m.status}</td>

                    <td>
                      <button
                        onClick={() => handleAllocate(m.id)}
                        className="bg-cyan-600 px-2 py-1 rounded text-xs"
                      >
                        Allocate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* EXTRA UI (kept from your design) */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6">
              <Camera size={20} /> Action Proof Gallery
            </h3>
          </div>
        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900 p-6 rounded w-96"
            >
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>

              <h2 className="text-lg mb-4">Create Mission</h2>

              <form onSubmit={handleCreateMission}>
                <input
                  value={missionName}
                  onChange={(e) => setMissionName(e.target.value)}
                  placeholder="Task"
                  className="w-full mb-3 p-2 bg-slate-800"
                  required
                />

                <input
                  value={missionZone}
                  onChange={(e) => setMissionZone(e.target.value)}
                  placeholder="Location"
                  className="w-full mb-3 p-2 bg-slate-800"
                  required
                />

                <button className="w-full bg-cyan-600 py-2">
                  Create
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NGODashboard;