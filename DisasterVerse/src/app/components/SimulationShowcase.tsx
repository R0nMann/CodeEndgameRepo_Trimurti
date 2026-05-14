import { motion } from 'motion/react';
import { Play, Trophy, Target, Users } from 'lucide-react';

const simulations = [
  {
    id: 1,
    title: 'Flood Survival Challenge',
    description: 'Navigate through rising waters, rescue survivors, and reach safe zones before time runs out.',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80',
    players: '12.5K',
    highScore: '9,842',
    difficulty: 'Expert',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Thunderstorm Evacuation',
    description: 'Lead your community to safety during severe storms with lightning strikes and power outages.',
    image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80',
    players: '8.3K',
    highScore: '7,234',
    difficulty: 'Advanced',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Earthquake Response',
    description: 'Coordinate rescue operations, manage resources, and save lives in the aftermath of a major quake.',
    image: 'https://images.unsplash.com/photo-1621337468997-f8c0f9f6e314?w=800&q=80',
    players: '15.7K',
    highScore: '11,567',
    difficulty: 'Master',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'Wildfire Defense',
    description: 'Strategic firefighting simulation where you manage teams to contain spreading wildfires.',
    image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80',
    players: '6.2K',
    highScore: '5,891',
    difficulty: 'Intermediate',
    color: 'from-yellow-500 to-orange-500',
  },
];

export function SimulationShowcase() {
  return (
    <section id="simulations" className="py-20 px-4 bg-slate-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Roblox Disaster Simulations
          </h2>
          <p className="text-gray-400 text-lg">Train for real emergencies in immersive virtual environments</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {simulations.map((sim, index) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${sim.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-2xl transition-all duration-500`} />

              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={sim.image}
                    alt={sim.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  {/* Difficulty Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${sim.color} text-white shadow-lg`}>
                    {sim.difficulty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {sim.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {sim.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>{sim.players} players</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span>High: {sim.highScore}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>Mission Progress</span>
                      <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${sim.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 bg-gradient-to-r ${sim.color} rounded-lg text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <Play className="w-5 h-5" />
                    Enter Simulation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative p-8 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Global Leaderboard
            </h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'DisasterMaster_2026', score: '24,567', country: 'USA' },
                { rank: 2, name: 'StormChaser_Elite', score: '22,341', country: 'Japan' },
                { rank: 3, name: 'RescueHero_Pro', score: '21,089', country: 'Germany' },
                { rank: 4, name: 'SafetyFirst_99', score: '19,876', country: 'India' },
                { rank: 5, name: 'EmergencyAce', score: '18,234', country: 'Brazil' },
              ].map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                      player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-slate-900' :
                      player.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-slate-700 text-gray-300'
                    }`}>
                      {player.rank}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{player.name}</div>
                      <div className="text-gray-400 text-sm">{player.country}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 font-bold">{player.score}</div>
                    <div className="text-gray-400 text-sm">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
