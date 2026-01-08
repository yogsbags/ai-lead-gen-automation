
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">LeadFlow<span className="text-primary-600">AI</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-primary-600 transition-colors">Product</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Resources</a>
        </div>
        <button 
          onClick={onStart}
          className="px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-md"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-6 border border-primary-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          India's #1 Sales Automation Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 max-w-4xl leading-tight mb-8">
          Accelerate your Pipeline <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
            from Bengaluru to Bharat.
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed font-medium">
          The all-in-one platform for the Indian B2B ecosystem. We map your market, build your ICP in ₹ Crores, and track Indian signals to close deals faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-primary-600 text-white rounded-2xl text-lg font-black hover:bg-primary-700 transition-all shadow-2xl shadow-primary-200"
          >
            Start Your Free Trial
          </button>
          <button className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl text-lg font-black hover:bg-gray-50 transition-all">
            Book a Demo
          </button>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="mt-24 w-full max-w-6xl relative">
          <div className="absolute -inset-10 bg-primary-500/10 blur-3xl rounded-full"></div>
          <img 
            src="https://picsum.photos/1200/600?random=10" 
            alt="LeadFlow AI Dashboard" 
            className="rounded-3xl shadow-2xl border-4 border-white relative z-10"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Built for the Modern Indian Revenue Team</h2>
            <p className="text-gray-500 font-medium text-lg">Stop manual cold calling. Start data-driven selling.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              icon="fa-indian-rupee-sign"
              title="Regional Intelligence"
              description="Segment leads by Indian Tier cities, revenue in Crores, and regional market presence."
            />
            <FeatureCard 
              icon="fa-whatsapp"
              title="Multi-Channel Enrichment"
              description="Find LinkedIn profiles and verified business contacts. Ready for WhatsApp and Email outreach."
            />
            <FeatureCard 
              icon="fa-signal"
              title="Bharat Signals"
              description="Track India-specific triggers like GST registration, new office launches in Pune/Hyd, and VC funding."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
              <i className="fas fa-bolt text-lg"></i>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">LeadFlow AI</span>
          </div>
          <div className="flex gap-12 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Team</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Blog</a>
          </div>
          <div className="text-xs font-medium text-gray-500">
            © 2024 LeadFlow AI India. Made with ❤️ for Indian Builders.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group">
    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-8 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
      <i className={`fas ${icon} text-2xl`}></i>
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
