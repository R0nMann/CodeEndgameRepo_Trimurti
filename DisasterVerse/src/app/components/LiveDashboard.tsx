import { motion } from 'motion/react';
import { CloudRain, Zap, Wind, Droplets, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weatherData = [
  { time: '00:00', rainfall: 5, temp: 22 },
  { time: '04:00', rainfall: 12, temp: 21 },
  { time: '08:00', rainfall: 25, temp: 23 },
  { time: '12:00', rainfall: 38, temp: 26 },
  { time: '16:00', rainfall: 45, temp: 25 },
  { time: '20:00', rainfall: 32, temp: 23 },
];

const alerts = [
  { id: 1, type: 'Flood', location: 'Mumbai, India', severity: 'High', active: 234 },
  { id: 2, type: 'Thunderstorm', location: 'Texas, USA', severity: 'Medium', active: 156 },
  { id: 3, type: 'Hurricane', location: 'Florida, USA', severity: 'Critical', active: 892 },
  { id: 4, type: 'Rainfall', location: 'Bangkok, Thailand', severity: 'Low', active: 67 },
];

const severityColors = {
  Critical: 'from-red-500 to-orange-500',
  High: 'from-orange-500 to-yellow-500',
  Medium: 'from-yellow-500 to-cyan-500',
  Low: 'from-cyan-500 to-blue-500',
};

export function LiveDashboard() {
  return (
    <section id="dashboard" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-blue-950/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Live Disaster Dashboard
          </h2>
          <p className="text-gray-400 text-lg">Real-time monitoring and analytics</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: CloudRain, label: 'Active Alerts', value: '1,349', color: 'cyan' },
            { icon: Zap, label: 'Thunderstorms', value: '42', color: 'yellow' },
            { icon: Droplets, label: 'Flood Zones', value: '187', color: 'blue' },
            { icon: Wind, label: 'Wind Speed', value: '85 km/h', color: 'purple' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-4`} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Rainfall Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl" />
            <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-cyan-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                Rainfall Statistics
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={weatherData}>
                  <defs>
                    <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area type="monotone" dataKey="rainfall" stroke="#06b6d4" fillOpacity={1} fill="url(#rainfallGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Temperature Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl" />
            <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-orange-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Temperature Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(251, 146, 60, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="temp" stroke="#fb923c" strokeWidth={3} dot={{ fill: '#fb923c' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Alert Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            Active Disaster Alerts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${severityColors[alert.severity as keyof typeof severityColors]}/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`} />
                <div className="relative p-5 rounded-xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-lg font-semibold text-white">{alert.type}</div>
                      <div className="text-sm text-gray-400">{alert.location}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${severityColors[alert.severity as keyof typeof severityColors]} text-white`}>
                      {alert.severity}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {alert.active} people affected
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
