import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  BarChart3,
  Fingerprint,
  Award,
  Circle,
  Zap,
} from "lucide-react";
import axios from "axios";

const VolunteerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  ====================================
  FETCH VOLUNTEER PROFILE
  ====================================
  */

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/volunteers/${id}`)
      .then((res) => {
        setProfile(res.data.data);
      })
      .catch((err) => {
        console.log("Profile fetch failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading volunteer profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Volunteer not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* TOP */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate("/volunteer-dashboard")}
            className="flex items-center text-sm text-cyan-400"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs text-slate-400">
              System Active
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
              <div className="w-24 h-24 rounded-full border border-slate-700 flex items-center justify-center mx-auto mb-6">
                <Fingerprint
                  size={32}
                  className="text-cyan-500"
                />
              </div>

              <h2 className="text-xl font-bold text-white">
                {profile.name}
              </h2>

              <p className="text-xs text-cyan-400 mt-2 uppercase">
                {profile.role || "Volunteer"}
              </p>

              <div className="mt-8 space-y-3 text-sm text-left">
                <p>
                  <strong>Email:</strong>{" "}
                  {profile.email || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {profile.phone || "N/A"}
                </p>

                <p>
                  <strong>District:</strong>{" "}
                  {profile.district || "N/A"}
                </p>

                <p>
                  <strong>State:</strong>{" "}
                  {profile.state || "N/A"}
                </p>

                <p>
                  <strong>Transport:</strong>{" "}
                  {profile.transport || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                <Globe
                  size={16}
                  className="mr-2 text-cyan-500"
                />
                Skills
              </h3>

              <p className="text-sm text-slate-400">
                {profile.skills || "No skills added yet"}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Availability",
                  val: profile.availability
                    ? "Available"
                    : "Busy",
                  icon: <Zap size={14} />,
                },
                {
                  label: "Trust",
                  val: "98%",
                  icon: <ShieldCheck size={14} />,
                },
                {
                  label: "Impact",
                  val: "High",
                  icon: <Award size={14} />,
                },
                {
                  label: "Status",
                  val: "Active",
                  icon: <Circle size={14} />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-2xl"
                >
                  <div className="text-cyan-500 mb-2">
                    {item.icon}
                  </div>

                  <p className="text-lg font-bold text-white">
                    {item.val}
                  </p>

                  <p className="text-xs text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <BarChart3
                  size={18}
                  className="mr-2 text-cyan-500"
                />
                Volunteer Summary
              </h3>

              <p className="text-slate-400">
                This volunteer is actively supporting
                community missions and can be assigned
                based on skills, transport availability,
                and district proximity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;