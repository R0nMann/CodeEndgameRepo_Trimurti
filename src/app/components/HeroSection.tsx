import { motion } from 'motion/react';
import { Zap, Globe, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Lightning Effects */}
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent"
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Floating Icons */}
          <div className="flex justify-center gap-8 mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-500/30"
            >
              <Globe className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-500/30"
            >
              <Zap className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="p-4 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg border border-red-500/30"
            >
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            DisasterVerse
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 mb-12 font-light tracking-wide">
            Train. Predict. Respond. Survive.
          </p>

          {/* Globe Visualization */}
          <motion.div
            className="relative w-64 h-64 mx-auto mb-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />
            <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
            <div className="absolute inset-8 rounded-full border border-cyan-400/10" />

            {/* Alert Pins */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5"
                style={{
                  transform: `rotate(${angle}deg) translateY(-80px)`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 border border-cyan-400/50"
            >
              Launch Simulation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent backdrop-blur-lg rounded-full text-cyan-400 font-semibold border-2 border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
            >
              View Live Alerts
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}
