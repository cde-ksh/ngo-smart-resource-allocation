import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  Search,
  Plus,
  LogOut,
  X,
  Camera,
} from "lucide-react";

import {
  getRequests,
  createRequest,
  allocateRequest,
} from "../api/api";

const NGODashboard = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    required_skills: "",
    volunteers_required: 1,
    urgency: "high",
  });

  /*
  =====================================
  FETCH REQUESTS
  =====================================
  */

  const fetchMissions = async () => {
    try {
      const data = await getRequests();

      // backend may return wrapped or direct response
      setMissions(data.data || data || []);
    } catch (error) {
      console.log("Fetch requests failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  


  /*
  =====================================
  CREATE REQUEST
  =====================================
  */

  const handleCreateMission = async (e) => {
    e.preventDefault();

    try {
      await createRequest(formData);

      await fetchMissions();

      setFormData({
        title: "",
        description: "",
        required_skills: "",
        volunteers_required: 1,
        urgency: "high",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.log("Create request failed:", error);
    }
  };

  /*
  =====================================
  SMART ALLOCATION
  =====================================
  */

  const handleAllocate = async (requestId) => {
    try {
      await allocateRequest(requestId);
      alert("Smart Allocation Completed");
      await fetchMissions();
    } catch (error) {
      console.log("Allocation failed:", error);
      alert("Allocation Failed");
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

          <div
            onClick={() => navigate("/impact-map")}
            className="cursor-pointer p-3 flex items-center gap-2"
          >
            <Map size={20} />
            <span>Live Need Map</span>
          </div>
        </nav>

        <button
          onClick={() => navigate("/")}
          className="text-red-400 p-3 flex items-center gap-2"
        >
          <LogOut size={20} />
          <span>Exit</span>
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">
          <div className="relative w-72">
            <Search
              size={16}
              className="absolute left-3 top-3"
            />
            <input
              placeholder="Search requests..."
              className="w-full bg-slate-900 border border-slate-700 rounded py-2 pl-10 pr-4"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 px-4 py-2 rounded"
          >
            <Plus size={16} />
            Launch Mission
          </button>
        </header>

        {/* CONTENT */}
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">
            Community Missions
          </h1>

          {loading ? (
            <p>Loading missions...</p>
          ) : missions.length === 0 ? (
            <p>No missions found.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm">
                  <th>Title</th>
                  <th>Required Skills</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {missions.map((m) => (
                  <tr
                    key={m.id}
                    className="border-t border-slate-800"
                  >
                    <td>{m.title}</td>
                    <td>{m.required_skills}</td>
                    <td>{m.urgency}</td>
                    <td>{m.status}</td>

                    <td>
                      <button
                        onClick={() =>
                          handleAllocate(m.id)
                        }
                        className="bg-cyan-600 px-3 py-1 rounded text-xs"
                      >
                        Allocate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Camera size={20} />
              Action Proof Gallery
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
              className="bg-slate-900 p-6 rounded w-[420px]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="mb-4"
              >
                <X />
              </button>

              <h2 className="text-lg mb-4">
                Create Mission
              </h2>

              <form
                onSubmit={handleCreateMission}
                className="space-y-3"
              >
                <input
                  placeholder="Mission Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-slate-800 rounded"
                  required
                />

                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-slate-800 rounded"
                  required
                />

                <input
                  placeholder="Required Skills"
                  value={formData.required_skills}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      required_skills: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-slate-800 rounded"
                  required
                />

                <input
                  type="number"
                  placeholder="Volunteers Required"
                  value={formData.volunteers_required}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      volunteers_required:
                        Number(e.target.value),
                    })
                  }
                  className="w-full p-2 bg-slate-800 rounded"
                  required
                />

                <button className="w-full bg-cyan-600 py-2 rounded">
                  Create Mission
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