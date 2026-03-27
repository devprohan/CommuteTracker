import React, { useState } from "react";
// 🛠️ FIX: Agar dashboard.jsx aur components/ dono 'src' folder ke andar hain
import Navbar from "./components/Navbar"; 
import MapLocator from "./MapLocator"; 
import { Briefcase, MapPin, Navigation, Loader2 } from "lucide-react";

function Dashboard() {
  const [workplace, setWorkplace] = useState({
    name: "Sitabuldi, Nagpur",
    lat: 21.1458,
    lng: 79.0882,
  });

  const [tempInput, setTempInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateWorkplace = async (e) => {
    e.preventDefault();
    if (!tempInput) return;
    setLoading(true);
    try {
      // Nagpur specific search taaki Nagpur se bahar na jaye
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${tempInput}, Nagpur`
      );
      const data = await response.json();
      if (data.length > 0) {
        setWorkplace({
          name: data[0].display_name.split(',')[0],
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      } else {
        alert("Bhai, Nagpur mein ye jagah nahi mili!");
      }
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* User Panel (Sidebar) */}
        <div className="w-80 bg-white border-r border-slate-200 p-6 shadow-sm z-20 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-amber-500 text-white rounded-lg">
              <Briefcase size={22} />
            </div>
            <h2 className="font-bold text-2xl text-slate-800 tracking-tight">User Panel</h2>
          </div>

          <form onSubmit={handleUpdateWorkplace} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Update Workplace
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="e.g. MIHAN, Nagpur"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  value={tempInput}
                  onChange={(e) => setTempInput(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Navigation size={18} />}
              {loading ? "Searching..." : "Update Map"}
            </button>
          </form>

          <div className="mt-auto p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">Target Location</p>
            <p className="text-sm text-slate-700 font-bold">{workplace.name}</p>
          </div>
        </div>

        {/* Dynamic Map Component */}
        <div className="flex-1 relative">
          <MapLocator externalWorkplace={workplace} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;