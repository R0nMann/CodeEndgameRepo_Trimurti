import { motion } from 'motion/react';
import { Bot, Send, Sparkles, MessageCircle, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

const suggestedPrompts = [
  'What should I do during a flood?',
  'Nearest emergency shelter',
  'Earthquake safety checklist',
  'How to prepare emergency kit',
];

const tips = [
  {
    icon: Shield,
    title: 'Stay Informed',
    description: 'Enable emergency alerts and monitor local weather conditions.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Act Fast',
    description: 'Follow evacuation orders immediately without hesitation.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: MessageCircle,
    title: 'Stay Connected',
    description: 'Keep emergency contacts updated and devices charged.',
    color: 'from-purple-500 to-pink-500',
  },
];

export function AIAssistant() {
  const [message, setMessage] = useState('');

  return (
    <section id="ai-assistant" className="py-20 px-4 bg-gradient-to-b from-blue-950/50 to-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Disaster Assistant
          </h2>
          <p className="text-gray-400 text-lg">Get instant help and guidance during emergencies</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl backdrop-blur-lg bg-slate-900/50 border border-purple-500/20 overflow-hidden">
              {/* AI Avatar */}
              <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.4)',
                        '0 0 40px rgba(236, 72, 153, 0.6)',
                        '0 0 20px rgba(168, 85, 247, 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Bot className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      DisasterBot
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-400">AI Emergency Assistant</div>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-semibold">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 h-96 overflow-y-auto space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl rounded-tl-none p-4">
                      <p className="text-gray-300">
                        Hello! I'm your AI Disaster Assistant. I can help you with emergency preparedness,
                        real-time alerts, and safety guidelines. How can I assist you today?
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">Just now</div>
                  </div>
                </motion.div>
              </div>

              {/* Suggested Prompts */}
              <div className="px-6 pb-4">
                <div className="text-sm text-gray-400 mb-3">Suggested questions:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setMessage(prompt)}
                      className="px-3 py-2 text-sm bg-slate-800/50 border border-purple-500/20 rounded-full text-gray-300 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-6 border-t border-purple-500/20 bg-slate-900/30">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything about disaster preparedness..."
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Emergency Tips</h3>
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tip.color}/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`} />
                <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center flex-shrink-0`}>
                      <tip.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{tip.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Voice Assistant UI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative mt-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg" />
              <div className="relative p-8 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-cyan-500/20 text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px rgba(6, 182, 212, 0.4)',
                      '0 0 40px rgba(6, 182, 212, 0.6)',
                      '0 0 20px rgba(6, 182, 212, 0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <MessageCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold text-white mb-2">Voice Assistant</h4>
                <p className="text-gray-400 mb-4">
                  Activate voice commands for hands-free emergency assistance
                </p>
                <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300">
                  Enable Voice Mode
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
