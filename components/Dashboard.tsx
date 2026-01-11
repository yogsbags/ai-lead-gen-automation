
import React, { useState, useMemo } from 'react';
import { MOCK_LEADS } from '../constants';
import { Lead } from '../types';
import LeadDrawer from './LeadDrawer';

interface DashboardProps {
  initialLeads?: Lead[];
}

type DashboardView = 'dashboard' | 'icps' | 'leads' | 'signals' | 'settings';

const Dashboard: React.FC<DashboardProps> = ({ initialLeads = [] }) => {
  const displayLeads = initialLeads.length > 0 ? initialLeads : MOCK_LEADS;
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<DashboardView>('dashboard');

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
            label="Dashboard" 
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
        <header className="h-24 bg-white border-b px-10 flex items-center justify-between sticky top-0 z-10 shadow-sm">
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
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#e3f9e5] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1db328] border border-[#d1f2d4]">
               <i className="fas fa-microscope text-[10px]"></i>
               Deep Scraper Active
            </div>
            <div className="relative cursor-pointer group">
              <i className="fas fa-bell text-gray-300 text-lg group-hover:text-gray-900 transition-colors"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="h-12 w-12 bg-gray-900 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg hover:scale-105 transition-all cursor-pointer">JD</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10">
          
          {activeView === 'dashboard' || activeView === 'leads' ? (
            <>
              {/* Stats Section */}
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
                  {filteredLeads.length === 0 && (
                    <div className="p-32 text-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                        <i className="fas fa-search-minus text-4xl"></i>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">No matching nodes found</h3>
                      <p className="text-gray-400 mt-2">Try adjusting your deep search query.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-[#eeeeee] rounded-[3rem] p-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-xl shadow-gray-200/40">
              <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 text-primary-600">
                <i className={`fas ${
                  activeView === 'icps' ? 'fa-brain' : 
                  activeView === 'signals' ? 'fa-rss' : 'fa-cog'
                } text-4xl`}></i>
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight capitalize">{activeView.replace('_', ' ')} View</h3>
              <p className="text-gray-500 mt-4 text-lg font-medium max-w-md mx-auto leading-relaxed">
                {activeView === 'icps' ? 'Your generated Market Intelligence Maps and Ideal Customer Profiles will appear here for longitudinal tracking.' :
                 activeView === 'signals' ? 'Real-time behavioral triggers and market movement signals extracted by the scraper engine.' :
                 'Manage your API keys, Bright Data scraping zones, and Gemini 3 Pro reasoning configurations.'}
              </p>
              <button 
                onClick={() => setActiveView('dashboard')}
                className="mt-10 px-8 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>

      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

const SidebarItem: React.FC<{ 
  icon: string; 
  label: string; 
  active?: boolean; 
  badge?: string;
  onClick: () => void;
}> = ({ icon, label, active, badge, onClick }) => (
  <button 
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all outline-none ${
      active 
      ? 'bg-[#f0f7ff] text-[#0070f3] shadow-inner ring-1 ring-blue-100' 
      : 'text-gray-500 hover:bg-[#fafafa] hover:text-gray-900'
    }`}
  >
    <div className="flex items-center gap-4">
      <i className={`fas ${icon} text-xl ${active ? 'text-[#0070f3]' : 'text-gray-200'}`}></i>
      {label}
    </div>
    {badge && <span className="text-[10px] bg-white border border-[#eeeeee] px-2.5 py-1 rounded-lg text-gray-900 font-black shadow-sm">{badge}</span>}
  </button>
);

const StatCard: React.FC<{ label: string; value: string; trend: string; color?: string }> = ({ label, value, trend, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-[#eeeeee] shadow-sm hover:shadow-2xl transition-all group cursor-default">
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
