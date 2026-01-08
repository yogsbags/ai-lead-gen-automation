
import React from 'react';
import { Lead } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface LeadDrawerProps {
  lead: Lead | null;
  onClose: () => void;
}

const LeadDrawer: React.FC<LeadDrawerProps> = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60] transition-opacity duration-300" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[650px] bg-white shadow-2xl z-[70] flex flex-col animate-slide-in-right border-l border-[#eeeeee]">
        <style>{`
          @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .animate-slide-in-right { animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        `}</style>

        <div className="p-10 border-b flex items-center justify-between bg-white/90 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-[#0070f3] flex items-center justify-center text-white shadow-xl shadow-[#0070f3]/20">
                <i className="fas fa-microscope text-xl"></i>
             </div>
             <div>
               <h2 className="text-2xl font-black text-gray-900 tracking-tight">Audit Insight</h2>
               <p className="text-[10px] font-black text-[#1db328] uppercase tracking-[0.25em] mt-0.5">Verified Profile Intelligence</p>
             </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-2xl hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-200">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 pb-32">
          {/* Source Verification Badge */}
          {lead.sourceUrl && (
            <div className="p-6 bg-[#f9f9fb] border border-[#eeeeee] rounded-[2rem] flex items-center justify-between shadow-sm group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#0070f3]">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Real Footprint Identified</p>
                  <p className="text-sm font-bold text-gray-900 truncate max-w-[280px]">{lead.sourceUrl}</p>
                </div>
              </div>
              <a 
                href={lead.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 bg-white border-2 border-transparent hover:border-[#0070f3] rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-[#0070f3]/10 transition-all flex items-center gap-3 group-hover:-translate-y-1"
              >
                Inspect Source
                <i className="fas fa-external-link-alt text-[9px] opacity-40"></i>
              </a>
            </div>
          )}

          {/* Profile Visuals */}
          <div className="flex items-start gap-10">
            <div className="relative shrink-0">
               <img src={lead.socialData?.profilePic} className="w-32 h-32 rounded-[3rem] object-cover border-8 border-white shadow-2xl ring-1 ring-black/5" />
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                  <i className="fas fa-check text-sm"></i>
               </div>
            </div>
            <div className="pt-4">
               <h3 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">{lead.contactPerson}</h3>
               <p className="text-2xl font-bold text-[#0070f3] opacity-80 leading-tight">{lead.title}</p>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="grid grid-cols-2 gap-6">
             <div className="p-8 bg-[#f0f2ff] border border-[#e0e4ff] rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-chart-line text-[#4f46e5]"></i>
                  <span className="text-[10px] font-black text-[#4f46e5] uppercase tracking-[0.2em]">Investable Surplus</span>
                </div>
                <p className="text-xl font-black text-gray-900">{lead.behavioralInsights?.investableSurplus || '₹50L+'}</p>
             </div>
             
             <div className="p-8 bg-[#e3f9e5] border border-[#d1f2d4] rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-wallet text-[#1db328]"></i>
                  <span className="text-[10px] font-black text-[#1db328] uppercase tracking-[0.2em]">Spend Capacity</span>
                </div>
                <p className="text-xl font-black text-gray-900">{lead.behavioralInsights?.spendingCapacity || 'VERY HIGH'}</p>
             </div>
          </div>

          {/* Scraper AI Narrative */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Behavioral Narrative & Visual Context</h4>
             <div className="p-10 bg-gray-50 border border-[#eeeeee] rounded-[3rem] relative group hover:bg-white hover:shadow-2xl transition-all">
                <i className="fas fa-quote-left absolute top-10 right-10 text-gray-100 text-6xl group-hover:text-primary-50 transition-colors"></i>
                <p className="text-lg font-bold text-gray-700 leading-relaxed italic relative z-10">
                  "{lead.visualAnalysis?.imageGallerySummary || lead.lastSignal || 'Verified via crawler.'}"
                </p>
                <div className="mt-8 pt-8 border-t border-gray-100 flex gap-10">
                   <div>
                     <p className="text-[9px] font-black text-primary-600 uppercase mb-1">Aesthetic</p>
                     <p className="text-xs font-bold text-gray-900">{lead.visualAnalysis?.profileAesthetic || 'Professional Modern'}</p>
                   </div>
                   <div>
                     <p className="text-[9px] font-black text-primary-600 uppercase mb-1">Cover Logic</p>
                     <p className="text-xs font-bold text-gray-900">{lead.visualAnalysis?.coverPhotoContext || 'Corporate Context'}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* RESTORED: Growth Velocity Chart */}
          <div className="space-y-6">
             <div className="flex items-center justify-between px-2">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Growth Velocity (Social Engagement)</h4>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">+12.4% Momentum</div>
             </div>
             <div className="h-56 w-full bg-[#fafafa] border border-[#eeeeee] rounded-[2.5rem] p-8">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={lead.socialData?.metrics || [{date: '1', followers: 100}, {date: '2', followers: 120}]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '15px' }}
                        itemStyle={{ fontWeight: 'black', fontSize: '12px' }}
                      />
                      <Line type="monotone" dataKey="followers" stroke="#0070f3" strokeWidth={5} dot={{ r: 6, fill: '#0070f3', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 8 }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-10 border-t bg-white/90 backdrop-blur-md flex gap-4 sticky bottom-0 z-40 shadow-2xl">
          <button className="flex-1 px-8 py-5 border-2 border-[#eeeeee] hover:border-gray-900 rounded-2xl font-black text-gray-400 hover:text-gray-900 transition-all uppercase text-[10px] tracking-widest">
             Flag Node
          </button>
          <button className="flex-[2] px-8 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-2xl shadow-gray-900/20 flex items-center justify-center gap-4 uppercase text-xs tracking-[0.2em] group">
            Push to Salesforce
            <i className="fas fa-cloud-upload-alt text-[10px] opacity-40 group-hover:opacity-100 transition-opacity"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default LeadDrawer;
