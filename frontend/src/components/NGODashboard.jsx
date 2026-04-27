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

  /*
  =====================================
  STATE
  =====================================
  */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH STATE (FIXED)
  const [searchTerm, setSearchTerm] = useState("");

  /*
  =====================================
  FORM STATE
  =====================================
  */

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
      alert("Mission Creation Failed");
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

      alert(
        error?.response?.data?.detail ||
          "Allocation Failed"
      );
    }
  };

  /*
  =====================================
  SEARCH FILTER (FIXED)
  =====================================
  */

  const filteredMissions = missions.filter((mission) =>
    mission.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.required_skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.urgency?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden flex">
      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-900/50 hidden lg:flex flex-col p-6">
        <div className="text-xl font-bold text-white mb-10">
          IMPACT
          <span className="text-cyan-500">
            SYNC
          </span>
        </div>

        <nav className="flex-1 space-y-4">
          <div className="flex items-center space-x-3 text-cyan-400 bg-cyan-500/10 p-3 rounded-xl">
            <LayoutDashboard size={20} />
            <span>Operations Hub</span>
          </div>

          <div
            onClick={() => navigate("/impact-map")}
            className="cursor-pointer p-3 flex items-center gap-2 hover:bg-slate-800 rounded-xl transition"
          >
            <Map size={20} />
            <span>Live Need Map</span>
          </div>
        </nav>

        <button
          onClick={() => navigate("/")}
          className="text-red-400 p-3 flex items-center gap-2 hover:bg-slate-800 rounded-xl transition"
        >
          <LogOut size={20} />
          <span>Exit</span>
        </button>
      </aside>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="flex-1 min-w-0">
        {/* HEADER */}

        <header className="border-b border-slate-800 px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />

            {/* FIXED SEARCH INPUT */}
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full bg-slate-900 border border-slate-700 rounded py-2 pl-10 pr-4 text-white"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded flex items-center gap-2 transition"
          >
            <Plus size={16} />
            Launch Mission
          </button>
        </header>

        {/* CONTENT */}

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            Community Missions
          </h1>

          {loading ? (
            <p>Loading missions...</p>
          ) : filteredMissions.length === 0 ? (
            <p>No matching missions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="text-slate-400 text-sm">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Required Skills</th>
                    <th className="pb-3">Urgency</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* FIXED MAP */}
                  {filteredMissions.map((m) => (
                    <tr
                      key={m.id}
                      className="border-t border-slate-800"
                    >
                      <td className="py-4">
                        {m.title}
                      </td>

                      <td>
                        {m.required_skills}
                      </td>

                      <td>
                        {m.urgency}
                      </td>

                      <td>
                        {m.status}
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            handleAllocate(m.id)
                          }
                          className="bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded text-sm transition"
                        >
                          Allocate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ACTION PROOF GALLERY */}

          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Camera size={20} />
              Action Proof Gallery
            </h3>
          </div>
        </div>
      </main>

      {/* =====================================
          MODAL
      ===================================== */}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 p-4 z-50">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900 p-6 rounded-2xl w-full max-w-md"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="mb-4"
              >
                <X />
              </button>

              <h2 className="text-xl font-semibold mb-4">
                Create Mission
              </h2>

              <form
                onSubmit={handleCreateMission}
                className="space-y-4"
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
                  className="w-full p-3 bg-slate-800 rounded"
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
                  className="w-full p-3 bg-slate-800 rounded"
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
                  className="w-full p-3 bg-slate-800 rounded"
                  required
                />

                <input
                  type="number"
                  placeholder="Volunteers Required"
                  value={formData.volunteers_required}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      volunteers_required: Number(
                        e.target.value
                      ),
                    })
                  }
                  className="w-full p-3 bg-slate-800 rounded"
                  required
                />

                <button className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded font-semibold transition">
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