import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Twitter, Github, Linkedin, Youtube, Heart } from 'lucide-react';

const footerLinks = {
  'Emergency Resources': [
    'Emergency Contacts',
    'Disaster Preparedness Guide',
    'Evacuation Routes',
    'First Aid Resources',
  ],
  'Platform': [
    'Dashboard',
    'Simulations',
    'Community Network',
  ],
  'Company': [
    'About Us',
    'Careers',
    'Press',
    'Contact',
  ],
  'Legal': [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'Accessibility',
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                DisasterVerse
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering communities with AI-driven disaster management and emergency response solutions.
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative p-6 rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-red-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-red-400" />
              <h4 className="text-white font-semibold">24/7 Emergency Hotline</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs text-gray-400">Global Emergency</div>
                  <div className="text-white font-semibold">+91-8954612054</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs text-gray-400">Email Support</div>
                  <div className="text-white font-semibold">sos@disasterverse.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs text-gray-400">Headquarters</div>
                  <div className="text-white font-semibold">Kolkata,West Bengal,India</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © 2026 DisasterVerse. All rights reserved. Built with{' '}
              <Heart className="w-4 h-4 inline text-red-400" /> for a safer world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400">All systems operational</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
