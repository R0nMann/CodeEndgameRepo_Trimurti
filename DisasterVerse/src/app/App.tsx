import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveDashboard } from './components/LiveDashboard';
import { SimulationShowcase } from './components/SimulationShowcase';
import { AIAssistant } from './components/AIAssistant';
import { SOSNetwork } from './components/SOSNetwork';
import { InnovationHub } from './components/InnovationHub';
import { Statistics } from './components/Statistics';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LiveDashboard />
      <SimulationShowcase />
      <AIAssistant />
      <SOSNetwork />
      <InnovationHub />
      <Statistics />
      <Footer />
    </div>
  );
}
