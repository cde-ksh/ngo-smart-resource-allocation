import { useEffect, useState } from "react";
import { getVolunteers } from "../api/api";

function Volunteer() {
  const [volunteers, setVolunteers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [filterAvailability, setFilterAvailability] = useState("all");

  useEffect(() => {
    getVolunteers()
      .then((data) => {
        const list = data["Volunteer Data"] || [];
        setVolunteers(list);
        setFiltered(list);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filtering + search
  useEffect(() => {
    let result = [...volunteers];

    if (search) {
      result = result.filter((v) =>
        (v.name || v.email || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (filterAvailability !== "all") {
      result = result.filter((v) =>
        filterAvailability === "available"
          ? v.availability === true
          : v.availability === false
      );
    }

    setFiltered(result);
  }, [search, volunteers, filterAvailability]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading volunteers...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold">Volunteer Network</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search volunteers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm outline-none"
          />

          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-sm"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="text-slate-400">No matching volunteers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(v)}
              className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition"
            >
              <h3 className="text-lg font-semibold">
                {v.name || v.email || "Unnamed"}
              </h3>

              <p className="text-slate-400 text-sm mt-2">
                Skills: {v.skills || "N/A"}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    v.availability
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {v.availability ? "Available" : "Busy"}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Assign clicked for:", v.id);
                  }}
                  className="text-xs bg-slate-700 px-3 py-1 rounded hover:bg-slate-600"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL PANEL */}
      {selected && (
        <div className="fixed right-0 top-0 h-full w-80 bg-slate-900 border-l border-slate-800 p-6">
          <button
            onClick={() => setSelected(null)}
            className="text-sm text-slate-400 mb-4"
          >
            Close
          </button>

          <h3 className="text-xl font-semibold mb-2">
            {selected.name || selected.email}
          </h3>

          <p className="text-slate-400 text-sm mb-2">
            Skills: {selected.skills}
          </p>

          <p className="text-slate-400 text-sm mb-4">
            Availability: {selected.availability ? "Available" : "Busy"}
          </p>

          <button className="w-full bg-slate-700 py-2 rounded hover:bg-slate-600">
            Assign to mission
          </button>
        </div>
      )}
    </div>
  );
}

export default Volunteer;
