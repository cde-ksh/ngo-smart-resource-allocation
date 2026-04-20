import { useEffect, useState } from "react";
import { getVolunteers } from "../api/api";

function VolunteerDashboard() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    getVolunteers().then((data) => {
      setVolunteers(data["Volunteer Data"] || []);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8">Helpers Hub</h2>

          <nav className="space-y-4 text-sm">
            <div className="text-cyan-400">Dashboard</div>
            <div className="text-slate-400">Your Tasks</div>
            <div className="text-slate-400">Open Opportunities</div>
            <div className="text-slate-400">Volunteer Network</div>
            <div className="text-slate-400">Settings</div>
          </nav>
        </div>

        <button className="text-sm text-slate-400">Log out</button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-slate-400">Your impact makes a difference</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Hours Logged</p>
            <p className="text-2xl font-bold">34</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Events</p>
            <p className="text-2xl font-bold">7</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">People Helped</p>
            <p className="text-2xl font-bold">21</p>
          </div>
        </div>

        {/* MAIN CONTENT SPLIT */}
        <div className="grid grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="col-span-1 space-y-6">

            {/* TASKS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Your Tasks</h3>

              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium">Food Distribution</p>
                  <p className="text-xs text-slate-400 mt-1">In Progress</p>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium">Medical Camp</p>
                  <p className="text-xs text-slate-400 mt-1">Upcoming</p>
                </div>
              </div>
            </div>

            {/* OPPORTUNITIES */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Open Opportunities</h3>

              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium">Community Clean-Up</p>
                  <p className="text-xs text-slate-400 mt-1">4 slots left</p>
                  <button className="mt-3 text-xs bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
                    Sign Up
                  </button>
                </div>

                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium">Elderly Care Visits</p>
                  <p className="text-xs text-slate-400 mt-1">Ongoing</p>
                  <button className="mt-3 text-xs bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-2">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Volunteer Network</h3>

              <input
                type="text"
                placeholder="Search volunteers"
                className="bg-slate-900 border border-slate-800 px-3 py-1 rounded text-sm"
              />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteers.map((v) => (
                <div
                  key={v.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                >
                  <p className="font-semibold">
                    {v.name || v.email}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    Skills: {v.skills}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        v.availability
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {v.availability ? "Available" : "Busy"}
                    </span>

                    <button className="bg-slate-700 px-3 py-1 text-xs rounded hover:bg-slate-600">
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* URGENT */}
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-red-400 font-semibold">URGENT</p>
            <p className="font-medium">Flood Relief Mission - Main City</p>
            <p className="text-xs text-slate-400">Immediate help required</p>
          </div>

          <button className="bg-red-600 px-4 py-2 rounded text-sm">
            View
          </button>
        </div>

      </main>
    </div>
  );
}

export default VolunteerDashboard;