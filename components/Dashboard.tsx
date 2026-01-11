
import React, { useState } from 'react';
import { MOCK_LEADS } from '../constants';
import { Lead, ICP } from '../types';
import LeadDrawer from './LeadDrawer';

interface DashboardProps {
  initialLeads?: Lead[];
  userICP: ICP | null;
}

type DashboardView = 'dashboard' | 'icps' | 'leads' | 'signals' | 'settings';

const Dashboard: React.FC<DashboardProps> = ({ initialLeads = [], userICP }) => {
  const displayLeads = initialLeads.length > 0 ? initialLeads : MOCK_LEADS;
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<DashboardView>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const filteredLeads = displayLeads.filter(l => 
    l.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.lastSignal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityInfo = (score: number) => {
    if (score >= 85) return { label: 'HOT', color: 'bg-rose-50 text-rose-600 border-rose-100' };
    if (score >= 70) return { label: 'WARM', color: 'bg-amber-50 text-amber-600 border-amber-100' };
    return { label: 'COOL', color: 'bg-blue-50 text-blue-600 border-blue-100' };
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans w-full">
      {/* Sidebar */}
      <aside className="w-72 border-r flex flex-col z-20 bg-white">
        <div className="p-8 border-b flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0070f3] rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-bolt text-lg"></i>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">LeadFlow<span className="text-[#0070f3] font-black">AI</span></span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <SidebarItem 
            icon="fa-th-large" 
            label="Overview" 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')}
          />
          <SidebarItem 
            icon="fa-brain" 
            label="My ICPs" 
            active={activeView === 'icps'} 
            onClick={() => setActiveView('icps')}
          />
          <SidebarItem 
            icon="fa-users" 
            label="Leads Table" 
            badge={displayLeads.length.toString()} 
            active={activeView === 'leads'} 
            onClick={() => setActiveView('leads')}
          />
          <SidebarItem 
            icon="fa-rss" 
            label="Signals" 
            badge="12" 
            active={activeView === 'signals'} 
            onClick={() => setActiveView('signals')}
          />
          <SidebarItem 
            icon="fa-cog" 
            label="Settings" 
            active={activeView === 'settings'} 
            onClick={() => setActiveView('settings')}
          />
        </nav>
        <div className="p-6">
          <div className="p-6 bg-gradient-to-br from-[#0070f3] to-[#0051af] rounded-[2rem] text-white shadow-2xl shadow-[#0070f3]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Enterprise Plan</p>
            <p className="text-sm font-bold">{displayLeads.length} leads analyzed</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
        {/* Header */}
        <header className="h-24 bg-white border-b px-10 flex items-center justify-between sticky top-0 z-[50] shadow-sm">
          <div className="relative w-full max-w-2xl group">
            <input 
              type="text" 
              placeholder={`Search ${activeView === 'icps' ? 'market maps' : 'deep profiles'}...`}
              className="w-full pl-14 pr-6 py-4 bg-[#f5f5f7] rounded-2xl text-sm font-medium border-2 border-transparent focus:border-[#0070f3] focus:bg-white focus:ring-8 focus:ring-[#0070f3]/5 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#0070f3] transition-colors"></i>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#e3f9e5] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1db328] border border-[#d1f2d4] whitespace-nowrap hidden lg:flex">
               <i className="fas fa-microscope text-[10px]"></i>
               Deep Scraper Active
            </div>
            
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${showNotifications ? 'bg-blue-50 text-[#0070f3]' : 'text-gray-300 hover:text-gray-900'}`}
              >
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                   <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">Alerts</h4>
                      <button className="text-[10px] font-bold text-[#0070f3]">Clear All</button>
                   </div>
                   <div className="space-y-4">
                      <NotificationItem icon="fa-bolt" text="12 New leads extracted from Mumbai" time="2m ago" />
                      <NotificationItem icon="fa-rss" text="Wealth signal hit for Chintan D." time="15m ago" />
                      <NotificationItem icon="fa-check-circle" text="Bright Data sync completed" time="1h ago" />
                   </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="h-12 w-12 bg-gray-900 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                JD
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                   <div className="mb-4 pb-4 border-b border-gray-50 text-left">
                      <p className="text-sm font-black text-gray-900">John Doe</p>
                      <p className="text-[10px] font-bold text-gray-400">john@venture.in</p>
                   </div>
                   <div className="space-y-2">
                      <ProfileMenuItem icon="fa-user" label="My Account" />
                      <ProfileMenuItem icon="fa-shield-halved" label="Security" />
                      <ProfileMenuItem icon="fa-sign-out-alt" label="Logout" color="text-rose-500" />
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content View Routing */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10" onClick={() => { setShowNotifications(false); setShowProfileMenu(false); }}>
          
          {(activeView === 'dashboard' || activeView === 'leads') && (
            <>
              {/* Overview Stats */}
              <div className="grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <StatCard label="Identified Nodes" value={displayLeads.length.toString()} trend="Live" />
                <StatCard label="Avg Spend Capacity" value="HIGH" trend="+12% YoY" color="text-emerald-600" />
                <StatCard label="Wealth Clusters" value="4 Tier 1" trend="Stable" color="text-[#0070f3]" />
                <StatCard label="Signal Hits" value="1.2k" trend="Verified" color="text-rose-600" />
              </div>

              {/* Table Container */}
              <div className="bg-white border border-[#eeeeee] rounded-[2.5rem] shadow-xl shadow-gray-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-gray-50/30 border-b border-[#f5f5f7] text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">
                        <th className="px-10 py-8">Prospect / Brand</th>
                        <th className="px-10 py-8">Behavioral Logic</th>
                        <th className="px-10 py-8">Financial Profile</th>
                        <th className="px-10 py-8 text-right">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f5f5f7]">
                      {filteredLeads.map(lead => {
                        const priority = getPriorityInfo(lead.enrichmentScore);
                        return (
                          <tr 
                            key={lead.id} 
                            className="group hover:bg-[#f9f9fb] cursor-pointer transition-all active:scale-[0.99]"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-5">
                                <div className="relative">
                                   <img src={lead.socialData?.profilePic} className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-xl ring-1 ring-gray-100 group-hover:scale-110 transition-transform" />
                                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div>
                                  <p className="text-base font-black text-gray-900 tracking-tight mb-0.5">{lead.contactPerson}</p>
                                  <p className="text-[10px] font-black text-[#0070f3] uppercase tracking-widest leading-none">{lead.title}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-8">
                              <div className="px-5 py-4 bg-[#f0f2ff] border border-[#e0e4ff] rounded-2xl max-w-[420px] shadow-sm group-hover:border-indigo-200 transition-colors">
                                 <p className="text-[11px] font-black text-[#4f46e5] uppercase tracking-tight leading-relaxed">
                                   {lead.lastSignal}
                                 </p>
                              </div>
                            </td>
                            <td className="px-10 py-8">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SPEND:</span>
                                   <span className="text-[11px] font-black text-[#1db328] uppercase">{lead.behavioralInsights?.spendingCapacity || 'HIGH'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SURPLUS:</span>
                                   <span className="text-[11px] font-black text-[#4f46e5] uppercase">{lead.behavioralInsights?.investableSurplus || '₹30L+'}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <div className="flex flex-col items-end gap-1">
                                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-tighter shadow-sm transition-all group-hover:scale-105 ${priority.color}`}>
                                    {lead.enrichmentScore}% {priority.label}
                                  </span>
                               </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeView === 'icps' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h3 className="text-2xl font-black text-gray-900 tracking-tight px-2">Generated Market Maps</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userICP && (
                    <MarketMapCard 
                      title={userICP.valueProposition.split('.')[0].slice(0, 40) + '...'} 
                      model={userICP.businessModel} 
                      leads={displayLeads.length.toString()} 
                      date="Generated Just Now" 
                      color="bg-primary-600" 
                    />
                  )}
                  <MarketMapCard title="Razorpay X Enterprise" model="B2B" leads="1.1k" date="Oct 20, 2024" color="bg-indigo-600 opacity-60" />
                  <MarketMapCard title="Indie Wealth Mgmt" model="B2C" leads="850" date="Oct 18, 2024" color="bg-emerald-600 opacity-60" />
                  <button className="h-full min-h-[300px] border-4 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center justify-center gap-4 group hover:border-primary-200 hover:bg-primary-50/20 transition-all">
                     <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                        <i className="fas fa-plus text-2xl"></i>
                     </div>
                     <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Build New Market Map</p>
                  </button>
               </div>
            </div>
          )}

          {activeView === 'signals' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h3 className="text-2xl font-black text-gray-900 tracking-tight px-2 mb-4">Real-time Triggers</h3>
               <SignalFeedItem title="Regional Expansion" type="Growth" desc="Razorpay just opened a new office in Ahmedabad. 14 Target accounts detected." time="2m ago" />
               <SignalFeedItem title="Funding Event" type="Venture" desc="Scrut Automation raised $10M Series A. CXOs now tagged as 'High Surplus'." time="1h ago" />
               <SignalFeedItem title="Wealth Trigger" type="UHNW" desc="Chintan Doshi mentioned in 'Financial Times' Top 10 Investors. Priority upgraded to 95%." time="4h ago" />
               <SignalFeedItem title="Job Movement" type="Hiring" desc="New VP Growth at Scripbox identified. Integration trigger sent to CRM." time="Yesterday" />
            </div>
          )}

          {activeView === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
               <h3 className="text-2xl font-black text-gray-900 tracking-tight px-2">System Config</h3>
               <SettingsSection title="API Configuration">
                  <SettingsField label="Gemini 3 Pro Key" type="password" value="••••••••••••••••" />
                  <SettingsField label="Bright Data Zone" type="text" value="premium_social_scraper_v1" />
               </SettingsSection>
               <SettingsSection title="Scraper Preferences">
                  <SettingsToggle label="Real-time Search Grounding" checked={true} />
                  <SettingsToggle label="Deep Image Aesthetic Analysis" checked={true} />
                  <SettingsToggle label="Wealth Surplus Logic (India)" checked={true} />
               </SettingsSection>
               <div className="flex justify-end pt-8">
                  <button className="px-10 py-5 bg-[#0070f3] text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-600 transition-all">
                     Save All Config
                  </button>
               </div>
            </div>
          )}
        </div>
      </main>

      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

/* --- UI Helper Components --- */

const MarketMapCard: React.FC<{ title: string; model: string; leads: string; date: string; color: string }> = ({ title, model, leads, date, color }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between min-h-[300px] cursor-pointer text-left">
    <div>
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl group-hover:scale-110 transition-transform`}>
        <i className="fas fa-brain"></i>
      </div>
      <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2 line-clamp-2">{title}</h4>
      <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100">{model} Model</span>
    </div>
    <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Nodes</p>
        <p className="text-xl font-black text-gray-900">{leads}</p>
      </div>
      <p className="text-[10px] font-bold text-gray-400">{date}</p>
    </div>
  </div>
);

const SignalFeedItem: React.FC<{ title: string; type: string; desc: string; time: string }> = ({ title, type, desc, time }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-start gap-8 group hover:shadow-xl transition-all text-left">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
      type === 'Growth' ? 'bg-emerald-50 text-emerald-600' : 
      type === 'Venture' ? 'bg-indigo-50 text-indigo-600' :
      type === 'UHNW' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
    }`}>
      <i className={`fas ${
        type === 'Growth' ? 'fa-arrow-up-right-dots' : 
        type === 'Venture' ? 'fa-rocket' :
        type === 'UHNW' ? 'fa-crown' : 'fa-briefcase'
      } text-xl`}></i>
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg font-black text-gray-900 tracking-tight">{title}</h5>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
      <div className="mt-4 flex gap-3">
        <button className="text-[10px] font-black text-[#0070f3] uppercase tracking-widest hover:underline">See Deep Profile</button>
        <span className="text-gray-200">|</span>
        <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900">Archive</button>
      </div>
    </div>
  </div>
);

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm text-left">
    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 mb-10 pb-4 border-b border-gray-50">{title}</h4>
    <div className="space-y-8">
      {children}
    </div>
  </div>
);

const SettingsField: React.FC<{ label: string; type: string; value: string }> = ({ label, type, value }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <label className="text-sm font-bold text-gray-500">{label}</label>
    <div className="flex-1 max-w-md relative">
      <input 
        type={type} 
        value={value} 
        readOnly
        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-bold text-gray-900 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
      />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#0070f3] uppercase">Edit</button>
    </div>
  </div>
);

const SettingsToggle: React.FC<{ label: string; checked: boolean }> = ({ label, checked }) => (
  <div className="flex items-center justify-between">
    <p className="text-sm font-bold text-gray-700">{label}</p>
    <button className={`w-14 h-8 rounded-full transition-all relative ${checked ? 'bg-[#1db328]' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${checked ? 'left-7' : 'left-1'}`}></div>
    </button>
  </div>
);

const SidebarItem: React.FC<{ icon: string; label: string; active?: boolean; badge?: string; onClick: () => void }> = ({ icon, label, active, badge, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all outline-none ${active ? 'bg-[#f0f7ff] text-[#0070f3] shadow-inner ring-1 ring-blue-100' : 'text-gray-500 hover:bg-[#fafafa] hover:text-gray-900'}`}>
    <div className="flex items-center gap-4">
      <i className={`fas ${icon} text-xl ${active ? 'text-[#0070f3]' : 'text-gray-200'}`}></i>
      {label}
    </div>
    {badge && <span className="text-[10px] bg-white border border-[#eeeeee] px-2.5 py-1 rounded-lg text-gray-900 font-black shadow-sm">{badge}</span>}
  </button>
);

const NotificationItem: React.FC<{ icon: string; text: string; time: string }> = ({ icon, text, time }) => (
  <div className="flex gap-4 group cursor-pointer text-left">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="flex-1">
      <p className="text-xs font-bold text-gray-900 leading-tight mb-1">{text}</p>
      <p className="text-[9px] font-black text-gray-300 uppercase">{time}</p>
    </div>
  </div>
);

const ProfileMenuItem: React.FC<{ icon: string; label: string; color?: string }> = ({ icon, label, color = 'text-gray-500' }) => (
  <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-left group`}>
    <i className={`fas ${icon} text-lg ${color} opacity-40 group-hover:opacity-100 transition-all`}></i>
    <span className={`text-xs font-bold ${color}`}>{label}</span>
  </button>
);

const StatCard: React.FC<{ label: string; value: string; trend: string; color?: string }> = ({ label, value, trend, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-[#eeeeee] shadow-sm hover:shadow-2xl transition-all group cursor-default text-left">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4 group-hover:text-[#0070f3] transition-colors">{label}</p>
    <div className="flex items-end justify-between">
       <p className={`text-4xl font-black tracking-tight ${color || 'text-gray-900'}`}>{value}</p>
       <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${trend === 'Live' ? 'bg-[#e3f9e5] text-[#1db328]' : 'bg-gray-50 text-gray-400'}`}>
         {trend}
       </div>
    </div>
  </div>
);

export default Dashboard;
