import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function VolunteerDashboard() {
  // DASHBOARD STATS
  const [stats, setStats] = useState({
    ngos: 0,
    emergencies: 0,
    requirements: 0,
  });

  // VOLUNTEER PROFILE
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    skills: "",
    role: "",
    availability: true,
    state: "",
    district: "",
    transport: "bike",
  });

  // NGO / REQUEST LIST
  const [ngos, setNgos] = useState([]);
  const [search, setSearch] = useState("");

  // DEFAULT MAP LOCATION
  const [location] = useState({
    lat: 28.6139,
    lng: 77.209,
  });

  /*
  ======================================
  FETCH VOLUNTEER PROFILE
  ======================================
  */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/volunteers/1")
      .then((res) => {
        if (res.data?.data) {
          setProfile(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Volunteer fetch error:", err);
      });
  }, []);

  /*
  ======================================
  FETCH DASHBOARD STATS
  (temporary fallback values)
  ======================================
  */
  useEffect(() => {
    setStats({
      ngos: ngos.length,
      emergencies: 8,
      requirements: ngos.length,
    });
  }, [ngos]);

  /*
  ======================================
  SEARCH REQUESTS / NGOs
  ======================================
  */

  useEffect(() => {
    if (search.trim() === "") {
      axios
        .get("http://127.0.0.1:8000/requests/")
        .then((res) => {
          setNgos(res.data || []);
        })
        .catch((err) => {
          console.log("Requests fetch error:", err);
        });

      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`http://127.0.0.1:8000/requests/search/?q=${search}`)
        .then((res) => {
          setNgos(res.data || []);
        })
        .catch((err) => {
          console.log("Search error:", err);
        });
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  /*
  ======================================
  UPDATE PROFILE
  ======================================
  */

  const handleProfileUpdate = async () => {
    try {
      await axios.put(
        "http://127.0.0.1:8000/volunteers/1",
        profile
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  /*
  ======================================
  ASSIGN VOLUNTEER TO REQUEST
  ======================================
  */

  const handleAssign = async (requestId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/assign/${requestId}/1`
      );

      alert("Assigned Successfully");
    } catch (error) {
      console.log(error);
      alert("Assignment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Volunteer Dashboard
        </h1>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-sm text-slate-400">
            NGOs Near You
          </p>
          <h2 className="text-2xl font-bold">
            {stats.ngos}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-sm text-slate-400">
            Critical Cases (India)
          </p>
          <h2 className="text-2xl font-bold">
            {stats.emergencies}
          </h2>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-sm text-slate-400">
            Total Requirements
          </p>
          <h2 className="text-2xl font-bold">
            {stats.requirements}
          </h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* MAP */}
          <div className="bg-slate-900 p-4 rounded-xl">
            <p className="mb-2">Your Location</p>

            <MapContainer
              center={[location.lat, location.lng]}
              zoom={10}
              className="h-48 rounded"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[location.lat, location.lng]}
              />
            </MapContainer>
          </div>

          {/* PROFILE */}
          <div className="bg-slate-900 p-4 rounded-xl space-y-3">
            <p className="font-semibold">
              Your Profile
            </p>

            <input
              value={profile.skills || ""}
              className="w-full bg-slate-800 p-2 rounded"
              placeholder="Skills"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills: e.target.value,
                })
              }
            />

            <input
              value={profile.role || ""}
              className="w-full bg-slate-800 p-2 rounded"
              placeholder="Role"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  role: e.target.value,
                })
              }
            />

            <input
              value={profile.district || ""}
              className="w-full bg-slate-800 p-2 rounded"
              placeholder="District"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  district: e.target.value,
                })
              }
            />

            <select
              value={profile.transport || "bike"}
              className="w-full bg-slate-800 p-2 rounded"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  transport: e.target.value,
                })
              }
            >
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>

            <button
              onClick={handleProfileUpdate}
              className="bg-cyan-600 w-full py-2 rounded"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-2 space-y-6">
          {/* SEARCH */}
          <input
            className="w-full bg-slate-900 p-3 rounded"
            placeholder="Search NGOs or emergencies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* NGO / REQUEST LIST */}
          <div className="grid grid-cols-2 gap-6">
            {ngos.length === 0 ? (
              <p className="text-slate-400">
                No matching NGOs or requests found.
              </p>
            ) : (
              ngos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="bg-slate-900 p-4 rounded-xl"
                >
                  <p className="font-semibold">
                    {ngo.title || ngo.name}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    Need: {ngo.required_skills}
                  </p>

                  <button
                    onClick={() =>
                      handleAssign(ngo.id)
                    }
                    className="mt-3 bg-green-600 px-3 py-1 rounded text-sm"
                  >
                    Join Mission
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;