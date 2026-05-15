import { motion } from 'motion/react';
import { MapPin, Radio, Heart, Users, Home, AlertCircle } from 'lucide-react';

const emergencyPins = [
  { id: 1, type: 'SOS', lat: 40, lng: 30, severity: 'critical' },
  { id: 2, type: 'Shelter', lat: 60, lng: 50, severity: 'safe' },
  { id: 3, type: 'SOS', lat: 25, lng: 70, severity: 'high' },
  { id: 4, type: 'Rescue', lat: 75, lng: 40, severity: 'active' },
  { id: 5, type: 'Shelter', lat: 45, lng: 80, severity: 'safe' },
  { id: 6, type: 'SOS', lat: 85, lng: 20, severity: 'medium' },
  { id: 7, type: 'Volunteer', lat: 30, lng: 45, severity: 'active' },
  { id: 8, type: 'Rescue', lat: 50, lng: 25, severity: 'active' },
];

const stats = [
  { icon: AlertCircle, label: 'Active SOS', value: '127', color: 'red' },
  { icon: Home, label: 'Shelters', value: '45', color: 'green' },
  { icon: Radio, label: 'Rescue Teams', value: '23', color: 'blue' },
  { icon: Users, label: 'Volunteers', value: '1,842', color: 'purple' },
];

export function SOSNetwork() {
  return (
    <section id="sos-network" className="py-20 px-4 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Community SOS Network
          </h2>
          <p className="text-gray-400 text-lg">Real-time emergency response and community support</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-${stat.color}-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`} />
              <div className="relative p-6 rounded-xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                <stat.icon className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-3`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl backdrop-blur-lg bg-slate-900/50 border border-cyan-500/20 overflow-hidden">
            {/* Map Container */}
            <div className="relative h-[500px] bg-gradient-to-br from-slate-800 to-slate-900">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

              {/* Map Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

              {/* Emergency Pins */}
              {emergencyPins.map((pin, index) => (
                <motion.div
                  key={pin.id}
                  className="absolute"
                  style={{
                    left: `${pin.lng}%`,
                    top: `${pin.lat}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Pulse Effect */}
                  {pin.type === 'SOS' && (
                    <motion.div
                      className={`absolute inset-0 w-8 h-8 -ml-4 -mt-4 rounded-full ${
                        pin.severity === 'critical' ? 'bg-red-500/30' :
                        pin.severity === 'high' ? 'bg-orange-500/30' :
                        'bg-yellow-500/30'
                      }`}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}

                  {/* Pin Marker */}
                  <motion.div
                    className={`relative w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center cursor-pointer ${
                      pin.type === 'SOS' ? 'bg-gradient-to-br from-red-500 to-orange-500 border-2 border-red-300' :
                      pin.type === 'Shelter' ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-green-300' :
                      pin.type === 'Rescue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-blue-300' :
                      'bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-300'
                    } shadow-lg`}
                    whileHover={{ scale: 1.3 }}
                  >
                    {pin.type === 'SOS' && <AlertCircle className="w-4 h-4 text-white" />}
                    {pin.type === 'Shelter' && <Home className="w-4 h-4 text-white" />}
                    {pin.type === 'Rescue' && <Radio className="w-4 h-4 text-white" />}
                    {pin.type === 'Volunteer' && <Users className="w-4 h-4 text-white" />}
                  </motion.div>

                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-12 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="px-3 py-2 bg-slate-900 border border-cyan-500/30 rounded-lg text-white text-xs whitespace-nowrap shadow-xl">
                      {pin.type} Point
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 p-4 rounded-xl backdrop-blur-lg bg-slate-900/80 border border-cyan-500/20">
                <div className="text-sm font-semibold text-white mb-3">Legend</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
                    <span className="text-gray-300">SOS Alert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500" />
                    <span className="text-gray-300">Safe Shelter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
                    <span className="text-gray-300">Rescue Zone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <span className="text-gray-300">Volunteer</span>
                  </div>
                </div>
              </div>

              {/* Live Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg bg-slate-900/80 border border-red-500/30">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-red-400 font-semibold">LIVE</span>
              </div>
            </div>

            {/* Map Controls */}
            <div className="p-6 border-t border-cyan-500/20 bg-slate-900/30">
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all duration-300 text-sm font-semibold">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Send SOS
                </button>
                <button className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all duration-300 text-sm font-semibold">
                  <Home className="w-4 h-4 inline mr-2" />
                  Find Shelter
                </button>
                <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all duration-300 text-sm font-semibold">
                  <Heart className="w-4 h-4 inline mr-2" />
                  Volunteer
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Flooding reported in Downtown', time: '2 min ago', type: 'warning', user: 'LocalResident_42' },
            { title: 'Shelter opening at Community Center', time: '5 min ago', type: 'info', user: 'RescueTeam_5' },
            { title: 'Power outage in North District', time: '8 min ago', type: 'alert', user: 'UtilityWatch' },
          ].map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 ${
                report.type === 'warning' ? 'bg-orange-500/20' :
                report.type === 'alert' ? 'bg-red-500/20' :
                'bg-blue-500/20'
              } rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`} />
              <div className="relative p-5 rounded-xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <MapPin className={`w-5 h-5 ${
                    report.type === 'warning' ? 'text-orange-400' :
                    report.type === 'alert' ? 'text-red-400' :
                    'text-blue-400'
                  }`} />
                  <span className="text-xs text-gray-400">{report.time}</span>
                </div>
                <h4 className="text-white font-semibold mb-2">{report.title}</h4>
                <p className="text-sm text-gray-400">Reported by {report.user}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
