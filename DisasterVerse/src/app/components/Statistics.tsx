import { motion } from 'motion/react';
import { Users, AlertTriangle, Heart, Target } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { icon: Users, label: 'Lives Impacted', target: 2458762, suffix: '', color: 'from-blue-500 to-cyan-500' },
  { icon: AlertTriangle, label: 'Active Alerts', target: 1349, suffix: '', color: 'from-red-500 to-orange-500' },
  { icon: Heart, label: 'Rescue Volunteers', target: 48523, suffix: '', color: 'from-purple-500 to-pink-500' },
  { icon: Target, label: 'Simulations Completed', target: 892456, suffix: '', color: 'from-green-500 to-emerald-500' },
];

export function Statistics() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-950/50 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Impact Statistics
          </h2>
          <p className="text-gray-400 text-lg">Making a difference in disaster preparedness worldwide</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.target / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        setCount(stat.target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, stat.target]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-30 rounded-2xl blur-2xl transition-all duration-500`} />

      {/* Card */}
      <div className="relative p-8 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 text-center">
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}
          animate={{
            boxShadow: [
              '0 0 20px rgba(6, 182, 212, 0.3)',
              '0 0 40px rgba(6, 182, 212, 0.5)',
              '0 0 20px rgba(6, 182, 212, 0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <stat.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Counter */}
        <div className="text-4xl md:text-5xl font-bold text-white mb-3">
          {formatNumber(count)}
          {stat.suffix}
        </div>

        {/* Label */}
        <div className="text-gray-400 font-medium">
          {stat.label}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${stat.color}`}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
