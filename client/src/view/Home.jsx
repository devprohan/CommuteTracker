import Navbar from './../components/Navbar.jsx'
import { Link } from 'react-router'
import { MapPinHouse, ArrowRight, Zap } from 'lucide-react'

function Home() {
  // Mock image data for Nagpur
  const cityImages = [
    {
      id: 1,
      title: "Nagpur Hubs",
      desc: "Find flats near MIHAN, Sitabuldi & IT Park.",
      image: "https://images.unsplash.com/photo-1596402377464-a690f91854f3?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Commute Smart",
      desc: "Save hours daily. Filter by travel time.",
      image: "https://images.unsplash.com/photo-1610411139474-bd6177e779a5?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Verified Listings",
      desc: "Curated & trusted properties across Nagpur.",
      image: "https://images.unsplash.com/photo-1628156111397-987820126a11?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* 🚀 Hero Section */}
      <div className="container mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center pt-12 pb-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-inner shadow-amber-200">
          📍 Specialized for Nagpur City Commute
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 mb-6 tracking-tighter leading-none">
          Nagpur's <span className="text-amber-500">Commute-First</span> <br /> Property Search.
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Stop guessing your daily travel time. Find the perfect flat based on exactly how long it takes to reach your workplace in Nagpur.
          Save time, reduce stress.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/dashboard"
            className="group flex items-center gap-3 bg-slate-950 text-white px-10 py-5 rounded-3xl font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 active:scale-95"
          >
            Explore Nagpur Map
            <Zap className="text-amber-400 group-hover:scale-125 transition-transform" size={24} />
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-2 bg-white text-slate-900 border-2 border-slate-200 px-10 py-5 rounded-3xl font-bold text-xl hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-95"
          >
            How it works
            <ArrowRight size={22} className="text-slate-400" />
          </Link>
        </div>

        {/* Cards Section */}
        <section className="mt-28 w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cityImages.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl bg-white p-4 shadow-lg border border-slate-100 transition-all hover:shadow-2xl hover:shadow-amber-100 hover:border-amber-200"
              >
                {/* Image */}
                <div className="aspect-4/3 overflow-hidden rounded-2xl mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-2 transition-transform duration-300 group-hover:-translate-y-2">
                  <h3 className="font-bold text-2xl text-slate-900 mb-2 tracking-tight flex items-center gap-2">
                    <MapPinHouse size={20} className="text-amber-600" />
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home