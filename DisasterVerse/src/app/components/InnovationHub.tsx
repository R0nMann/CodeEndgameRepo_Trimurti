import { motion } from 'motion/react';
import { Lightbulb, Award, Code, Users, TrendingUp, Star } from 'lucide-react';

const innovations = [
  {
    id: 1,
    title: 'AI Flood Prediction Model',
    author: 'ClimateAI Team',
    description: 'Machine learning system that predicts flood patterns 72 hours in advance with 94% accuracy.',
    category: 'AI & ML',
    votes: 1247,
    status: 'Implemented',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Drone Emergency Response Network',
    author: 'RescueTech',
    description: 'Autonomous drone fleet for rapid disaster assessment and supply delivery to isolated areas.',
    category: 'Hardware',
    votes: 892,
    status: 'Testing',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Blockchain Disaster Relief Fund',
    author: 'CryptoRelief',
    description: 'Transparent, decentralized system for tracking and distributing disaster relief donations.',
    category: 'Blockchain',
    votes: 756,
    status: 'In Development',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'IoT Early Warning System',
    author: 'SensorNet',
    description: 'Network of environmental sensors providing real-time disaster threat detection.',
    category: 'IoT',
    votes: 634,
    status: 'Prototype',
    color: 'from-orange-500 to-red-500',
  },
];

export function InnovationHub() {
  return (
    <section id="innovation-hub" className="py-20 px-4 bg-gradient-to-b from-slate-950 to-blue-950/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Open Innovation Hub
          </h2>
          <p className="text-gray-400 text-lg">Community-driven solutions for disaster management</p>
        </motion.div>

        {/* Featured Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Lightbulb, label: 'Active Projects', value: '127' },
            { icon: Users, label: 'Contributors', value: '3,456' },
            { icon: Award, label: 'Implemented', value: '42' },
            { icon: TrendingUp, label: 'In Development', value: '85' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative p-6 rounded-xl backdrop-blur-lg bg-slate-900/50 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 text-center">
                <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Innovation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${innovation.color}/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
              <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                      {innovation.title}
                    </h3>
                    <p className="text-sm text-gray-400">by {innovation.author}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${innovation.color} text-white`}>
                    {innovation.category}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {innovation.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300">
                      <Star className="w-5 h-5" />
                      <span className="font-semibold">{innovation.votes}</span>
                    </button>
                    <span className="text-sm text-gray-500">votes</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    innovation.status === 'Implemented' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    innovation.status === 'Testing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    innovation.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {innovation.status}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hackathon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
          <div className="relative p-8 md:p-12 rounded-3xl backdrop-blur-lg bg-slate-900/50 border border-green-500/20 text-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="inline-block mb-6"
            >
              <Award className="w-16 h-16 text-yellow-400" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Next Disaster Tech Hackathon
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Collaborate with innovators worldwide to build cutting-edge solutions for disaster prevention and response.
              $100,000 in prizes and grants available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full text-white font-semibold shadow-lg shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300"
              >
                <Code className="w-5 h-5 inline mr-2" />
                Register Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent backdrop-blur-lg rounded-full text-green-400 font-semibold border-2 border-green-500 hover:bg-green-500/10 transition-all duration-300"
              >
                View Past Winners
              </motion.button>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { label: 'Start Date', value: 'June 15, 2026' },
                { label: 'Duration', value: '48 Hours' },
                { label: 'Format', value: 'Virtual + In-Person' },
              ].map((detail) => (
                <div key={detail.label} className="text-center">
                  <div className="text-sm text-gray-400 mb-1">{detail.label}</div>
                  <div className="text-lg font-semibold text-white">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
