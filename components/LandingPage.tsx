
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-8 bg-white/80 backdrop-blur-xl sticky top-0 z-[100] border-b border-gray-100">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-12 h-12 bg-primary-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-primary-200 group-hover:rotate-12 transition-transform">
              <i className="fas fa-bolt text-2xl"></i>
            </div>
            <span className="text-3xl font-black tracking-tighter text-gray-900">LeadFlow<span className="text-primary-600">AI</span></span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#" className="hover:text-primary-600 transition-colors">Solutions</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Scraper Engine</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Docs</a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-[11px] font-black uppercase tracking-widest text-gray-900 hover:text-primary-600 transition-colors hidden sm:block">Log In</button>
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-gray-200"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-widest mb-10 border border-primary-100 shadow-sm animate-bounce">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Gemini 3 Pro + Bright Data Integrated
            </div>
            
            <h1 className="text-6xl lg:text-[5.5rem] font-black text-gray-900 leading-[0.9] mb-10 tracking-tighter">
              Automate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                Revenue Pipeline.
              </span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-xl mb-14 leading-relaxed font-medium">
              Find, scrape, and analyze prospects from Bengaluru to Bharat. Our AI doesn't just find emails—it extracts deep behavioral and wealth signals from the live web.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={onStart}
                className="px-12 py-6 bg-primary-600 text-white rounded-[2rem] text-sm font-black hover:bg-primary-700 transition-all shadow-[0_20px_40px_-10px_rgba(14,165,233,0.4)] flex items-center justify-center gap-4 group uppercase tracking-widest"
              >
                Launch Pipeline
                <i className="fas fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </button>
              <div className="flex items-center gap-4 px-8 border-2 border-gray-100 rounded-[2rem] bg-white group hover:border-primary-200 transition-all cursor-pointer" onClick={onStart}>
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                   ))}
                 </div>
                 <div className="text-left">
                   <p className="text-[10px] font-black text-gray-900 uppercase">Trusted by 2k+</p>
                   <p className="text-[9px] font-bold text-gray-400">Indian Sales Teams</p>
                 </div>
              </div>
            </div>
          </div>

          {/* AI Terminal Simulation */}
          <div className="flex-1 w-full relative">
            <div className="absolute -inset-10 bg-primary-500/10 blur-[100px] rounded-full animate-pulse"></div>
            <div className="relative bg-gray-900 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-[8px] border-white p-2 overflow-hidden group">
              {/* Floating Indicator Cards */}
              <div className="absolute top-10 -right-12 z-30 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 animate-float">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Surplus Scan</p>
                </div>
                <p className="text-sm font-black text-emerald-600 tracking-tight">₹50L+ Verified</p>
              </div>

              <div className="absolute bottom-20 -left-12 z-30 bg-white p-5 rounded-2xl shadow-2xl border border-gray-100 animate-float-delayed">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                    <i className="fas fa-microscope text-xs"></i>
                  </div>
                  <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Aesthetic Analysis</p>
                </div>
                <p className="text-sm font-black text-indigo-600 tracking-tight">Modern Executive</p>
              </div>

              <div className="bg-[#0c0c0e] rounded-[2.5rem] p-8 font-mono text-xs overflow-hidden h-[500px]">
                <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
                  </div>
                  <span className="text-white/20 ml-4 font-black tracking-widest">LIVE_SCRAPER_CORE_V3</span>
                </div>
                <div className="space-y-4">
                  <TerminalLine color="text-primary-400" text="[SYSTEM] Initializing Bright Data Scraping Browser..." />
                  <TerminalLine color="text-white/40" text="[SCAN] Target: Bengaluru Fintech Segment (Tier 1)" />
                  <TerminalLine color="text-emerald-400" text="[SUCCESS] Found: Chintan Doshi (Founder)" />
                  <TerminalLine color="text-white/40" text="[GEMINI] Grounding search across 12 source domains..." />
                  <TerminalLine color="text-indigo-400" text="[SIGNAL] Wealth Surplus Detected: Tier 1 High" />
                  <TerminalLine color="text-white/20" text="------------------------------------------------" />
                  <TerminalLine color="text-primary-400" text="[SYSTEM] Triggering Deep Analysis on LinkedIn Profile..." />
                  <TerminalLine color="text-white/40" text="[SCAN] Tech Stack: AWS, SAP, React detected from bio." />
                  <TerminalLine color="text-emerald-400" text="[SUCCESS] Verified Link: linkedin.com/in/cd-founder" />
                  <TerminalLine color="text-amber-400" text="[PRIORITY] Setting Score: 92% (HOT LEAD)" />
                  <div className="animate-pulse flex items-center gap-2 text-primary-500 mt-4">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span>Ready for CRM Sync...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Ticker */}
      <section className="py-20 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-12">The Bharat Sales Engine Powered By</p>
          <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <div className="flex items-center gap-2">
                <i className="fas fa-brain text-2xl"></i>
                <span className="text-xl font-black tracking-tighter">Gemini 3 Pro</span>
             </div>
             <div className="flex items-center gap-2">
                <i className="fas fa-spider text-2xl"></i>
                <span className="text-xl font-black tracking-tighter">Bright Data</span>
             </div>
             <div className="flex items-center gap-2">
                <i className="fas fa-cloud-bolt text-2xl"></i>
                <span className="text-xl font-black tracking-tighter">Salesforce</span>
             </div>
             <div className="flex items-center gap-2">
                <i className="fas fa-database text-2xl"></i>
                <span className="text-xl font-black tracking-tighter">PostgreSQL</span>
             </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em] mb-6">Unrivaled Intelligence</h2>
            <h3 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-8">Stop manual prospecting. Start data-driven selling.</h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">We combine world-class LLMs with resilient web-scraping to give you the most accurate profiles in India.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <ImprovedFeatureCard 
               icon="fa-binoculars"
               title="Regional Search Grounding"
               description="Using Gemini 3 Pro Search tools to verify real news, recent funding, and office expansions in 500+ Indian cities."
               color="text-primary-600"
               bg="bg-primary-50"
            />
            <ImprovedFeatureCard 
               icon="fa-bolt-lightning"
               title="Bright Data Deep Scan"
               description="Bypass anti-bot systems to scrape high-fidelity behavioral data from LinkedIn, Instagram, and corporate registries."
               color="text-indigo-600"
               bg="bg-indigo-50"
            />
            <ImprovedFeatureCard 
               icon="fa-indian-rupee-sign"
               title="Wealth Tier Logic"
               description="Our proprietary AI models estimate disposable income and surplus based on career trajectories and lifestyle signals."
               color="text-emerald-600"
               bg="bg-emerald-50"
            />
          </div>
        </div>
      </section>

      {/* "How it Works" Visualized */}
      <section className="py-32 bg-gray-900 text-white rounded-[4rem] mx-6 mb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600/10 blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
               <h3 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.4em] mb-8">Operational Flow</h3>
               <h4 className="text-5xl font-black tracking-tighter leading-tight mb-12">From a URL to a <br /> CRM-Ready Segment.</h4>
               <div className="space-y-10">
                 <StepItem number="01" title="Analyze Core Business" desc="Our AI reads your website to understand your B2B/B2C hybrid model and products." />
                 <StepItem number="02" title="Identify the Cohort" desc="Select target industries and regions. Gemini identifies the specific individuals who matter." />
                 <StepItem number="03" title="Deep Scraper Activation" desc="Bright Data crawls for real-time behavioral signals, posts, and verified socials." />
                 <StepItem number="04" title="Export & Close" desc="Verify the insights in our audit dashboard and push directly to your sales stack." />
               </div>
            </div>
            <div className="flex-1 bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-3xl group">
               <div className="p-8 bg-white text-gray-900 rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:scale-105">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white">
                      <i className="fas fa-check"></i>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase">Verification Complete</p>
                     <p className="text-xl font-black">Lead Verified: Chintan D.</p>
                   </div>
                 </div>
                 <div className="space-y-4">
                   <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-emerald-500"></div>
                   </div>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">92% Match to ICP</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: Integrations Ecosystem */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">One-Click Connectivity</h2>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                Integrates with the <br />tools you already love.
              </h3>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Sync enriched lead data directly to your existing workflow. No CSV exports, no manual entry. Just seamless, automated pipeline population.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <IntegrationStat label="API Uptime" value="99.99%" />
                <IntegrationStat label="Sync Speed" value="< 200ms" />
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-6 relative">
              <div className="absolute inset-0 bg-indigo-500/5 blur-[80px] -z-10"></div>
              <IntegrationCard icon="fab fa-salesforce" name="Salesforce" color="text-[#00a1e0]" />
              <IntegrationCard icon="fab fa-hubspot" name="HubSpot" color="text-[#ff7a59]" />
              <IntegrationCard icon="fab fa-slack" name="Slack" color="text-[#4a154b]" />
              <IntegrationCard icon="fas fa-envelope" name="Gmail" color="text-[#ea4335]" />
              <IntegrationCard icon="fas fa-database" name="Notion" color="text-[#000000]" />
              <IntegrationCard icon="fab fa-whatsapp" name="WhatsApp" color="text-[#25d366]" />
              <IntegrationCard icon="fas fa-plug" name="Zapier" color="text-[#ff4f00]" />
              <IntegrationCard icon="fas fa-code" name="Webhooks" color="text-gray-400" />
              <IntegrationCard icon="fab fa-microsoft" name="Dynamics" color="text-[#00a4ef]" />
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: Testimonials / Social Proof */}
      <section className="py-32 bg-[#fafafa] border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-6">User Stories</h2>
            <h3 className="text-5xl font-black text-gray-900 tracking-tighter">Winning with Intelligence.</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <TestimonialCard 
              quote="The depth of behavioral insights we get from LeadFlow is unmatched. We saw a 40% jump in meeting bookings within 3 weeks."
              author="Arjun Mehta"
              role="VP Growth, Fintech Unicorn"
              metric="40% Growth"
              avatar="https://i.pravatar.cc/150?u=arjun"
            />
            <TestimonialCard 
              quote="Bright Data + Gemini is a lethal combination. We can now target UHNIs in tier-2 cities with pin-point accuracy."
              author="Sushmita Rao"
              role="Head of Sales, Luxury Real Estate"
              metric="₹20Cr Pipeline"
              avatar="https://i.pravatar.cc/150?u=sushmita"
            />
            <TestimonialCard 
              quote="The automated ICP analysis saved us months of market research. We launched in 4 new regions in half the usual time."
              author="Vikram Singh"
              role="Founder, SaaS Platform"
              metric="12d Launch Time"
              avatar="https://i.pravatar.cc/150?u=vikram"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                  <i className="fas fa-bolt"></i>
                </div>
                <span className="text-2xl font-black tracking-tighter">LeadFlow AI</span>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed">Making Indian business more predictable with AI-driven market intelligence and automated prospecting.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6">Product</h5>
                <ul className="space-y-4 text-sm font-bold text-gray-400">
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Scraper API</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6">Company</h5>
                <ul className="space-y-4 text-sm font-bold text-gray-400">
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Security</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6">Support</h5>
                <ul className="space-y-4 text-sm font-bold text-gray-400">
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Enterprise</a></li>
                  <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400">© 2024 LeadFlow AI India. All rights reserved.</p>
            <div className="flex gap-8">
               <i className="fab fa-twitter text-gray-400 hover:text-gray-900 cursor-pointer"></i>
               <i className="fab fa-linkedin text-gray-400 hover:text-gray-900 cursor-pointer"></i>
               <i className="fab fa-instagram text-gray-400 hover:text-gray-900 cursor-pointer"></i>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(15px) translateX(-10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const TerminalLine: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <div className="flex gap-4">
    <span className="text-white/10 shrink-0">12:34:02</span>
    <span className={`${color} font-medium`}>{text}</span>
  </div>
);

const ImprovedFeatureCard: React.FC<{ icon: string; title: string; description: string; color: string; bg: string }> = ({ icon, title, description, color, bg }) => (
  <div className="p-12 rounded-[3rem] border border-gray-100 bg-white hover:shadow-2xl hover:-translate-y-4 transition-all group relative overflow-hidden">
    <div className={`w-20 h-20 ${bg} rounded-[2rem] flex items-center justify-center mb-10 ${color} group-hover:scale-110 transition-transform`}>
      <i className={`fas ${icon} text-3xl`}></i>
    </div>
    <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter">{title}</h3>
    <p className="text-gray-500 font-medium leading-relaxed mb-6">{description}</p>
    <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${color} flex items-center gap-2 cursor-pointer`}>
       Learn More <i className="fas fa-arrow-right"></i>
    </div>
  </div>
);

const StepItem: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="flex gap-8 group">
    <span className="text-4xl font-black text-white/10 group-hover:text-primary-400 transition-colors leading-none">{number}</span>
    <div>
      <h5 className="text-xl font-bold mb-2">{title}</h5>
      <p className="text-gray-400 text-sm font-medium max-w-sm">{desc}</p>
    </div>
  </div>
);

const IntegrationCard: React.FC<{ icon: string; name: string; color: string }> = ({ icon, name, color }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-3">
    <i className={`${icon} text-3xl ${color}`}></i>
    <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{name}</span>
  </div>
);

const IntegrationStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-gray-900">{value}</p>
  </div>
);

const TestimonialCard: React.FC<{ quote: string; author: string; role: string; metric: string; avatar: string }> = ({ quote, author, role, metric, avatar }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
    <div className="flex items-center gap-4 mb-8">
      <img src={avatar} className="w-14 h-14 rounded-2xl object-cover border-2 border-primary-100" />
      <div>
        <h5 className="text-lg font-black text-gray-900 tracking-tight">{author}</h5>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{role}</p>
      </div>
    </div>
    <div className="relative mb-10">
      <i className="fas fa-quote-left text-primary-100 text-4xl absolute -top-4 -left-4"></i>
      <p className="text-lg font-bold text-gray-700 leading-relaxed italic relative z-10">"{quote}"</p>
    </div>
    <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
      <div className="px-4 py-2 bg-emerald-50 rounded-xl text-emerald-600 text-[10px] font-black uppercase tracking-widest">
        Impact: {metric}
      </div>
      <div className="flex text-amber-400 gap-1 text-[10px]">
        {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star"></i>)}
      </div>
    </div>
  </div>
);

export default LandingPage;
