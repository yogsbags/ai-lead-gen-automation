
import React, { useState } from 'react';
import { generateICPFromUrl } from '../services/geminiService';
import { ICP } from '../types';

interface ICPGeneratorProps {
  onComplete: (icp: ICP) => void;
}

const ICPGenerator: React.FC<ICPGeneratorProps> = ({ onComplete }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [icp, setIcp] = useState<ICP | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'B2B' | 'B2C'>('B2B');

  const handleGenerate = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    try {
      const result = await generateICPFromUrl(url);
      setIcp(result);
      if (result.businessModel === 'B2C') {
        setActiveTab('B2C');
      } else {
        setActiveTab('B2B');
      }
    } catch (e) {
      setError('Failed to analyze website. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (icp) {
    const isHybrid = icp.businessModel === 'Hybrid';

    return (
      <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-8 md:p-12 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gray-900 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl">
              <i className={`fas ${icp.businessModel === 'B2C' ? 'fa-user-tag' : icp.businessModel === 'B2B' ? 'fa-building' : 'fa-layer-group'} text-2xl text-primary-400`}></i>
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Market Intel Map</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-md text-[9px] font-black uppercase tracking-widest">{icp.businessModel} Model</span>
                 <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Analysis Complete</p>
              </div>
            </div>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-2xl">
            {(isHybrid || (icp.businessModel === 'B2B' && icp.consumerProfile) || (icp.businessModel === 'B2C' && icp.corporateProfile)) && (
              <>
                <button 
                  onClick={() => setActiveTab('B2B')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'B2B' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  CORPORATE (B2B)
                </button>
                <button 
                  onClick={() => setActiveTab('B2C')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'B2C' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  CONSUMER (B2C)
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Offerings & Strategy */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-sm font-black text-primary-400 uppercase tracking-[0.2em] mb-6">Offerings</h3>
              <ul className="space-y-4 relative z-10">
                {(icp.productsAndServices || []).map((product, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 shrink-0 mt-0.5 border border-primary-500/30">
                      <span className="text-[10px] font-black">{idx + 1}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-100">{product}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary-600 rounded-[2.5rem] p-8 text-white">
              <h3 className="text-[10px] font-black text-primary-200 uppercase tracking-[0.2em] mb-4">Outbound Strategy</h3>
              <p className="text-sm font-bold leading-relaxed">{icp.outboundStrategy}</p>
            </div>
          </div>

          {/* Right: Detailed Audience Profile */}
          <div className="lg:col-span-8 space-y-8">
            {/* Core Value Prop */}
            <div className="p-10 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <i className="fas fa-quote-right text-8xl"></i>
               </div>
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Mission Statement</h3>
               <p className="text-3xl font-black text-gray-900 leading-[1.1] mb-2">{icp.valueProposition}</p>
            </div>

            {/* Profile Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'B2B' && icp.corporateProfile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InsightGrid icon="fa-user-tie" title="Decision Makers" items={icp.corporateProfile.jobTitles} color="text-primary-600" />
                  <InsightGrid icon="fa-building-columns" title="Industries" items={icp.corporateProfile.industries} color="text-indigo-600" />
                  <InsightGrid icon="fa-triangle-exclamation" title="Corporate Pains" items={icp.corporateProfile.painPoints} color="text-rose-500" />
                  <InsightGrid icon="fa-meteor" title="B2B Intent Signals" items={icp.corporateProfile.buyingTriggers} color="text-amber-500" />
                  
                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <StatMini label="Headcount" value={icp.corporateProfile.companySize} />
                    <StatMini label="Target Revenue" value={icp.corporateProfile.revenueRange} />
                    <StatMini label="Regions" value={icp.corporateProfile.geographies?.[0] || 'N/A'} />
                  </div>
                </div>
              ) : activeTab === 'B2C' && icp.consumerProfile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
                     <div className="flex flex-col md:flex-row gap-8 justify-between">
                        <div>
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Demographics</h4>
                          <p className="text-xl font-black text-gray-900">{icp.consumerProfile.demographics}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Income Class</h4>
                          <p className="text-xl font-black text-primary-600">{icp.consumerProfile.incomeBracket}</p>
                        </div>
                     </div>
                  </div>
                  <InsightGrid icon="fa-heart" title="Consumer Interests" items={icp.consumerProfile.interests} color="text-pink-600" />
                  <InsightGrid icon="fa-tags" title="Lifestyle Segments" items={icp.consumerProfile.lifestyleSegments} color="text-emerald-600" />
                  <InsightGrid icon="fa-bolt" title="Purchase Behavior" items={[icp.consumerProfile.purchasingBehavior]} color="text-blue-600" />
                  <InsightGrid icon="fa-users" title="Influencers" items={icp.consumerProfile.keyInfluencers} color="text-purple-600" />
                </div>
              ) : (
                <div className="p-12 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                  <i className="fas fa-search-nodes text-4xl text-gray-200 mb-4"></i>
                  <p className="text-gray-400 font-bold">No detailed {activeTab} profile data found for this URL.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 border-t border-gray-50 pt-10">
          <button 
            onClick={() => setIcp(null)}
            className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black hover:text-gray-900 hover:border-gray-200 transition-all uppercase text-xs tracking-widest"
          >
            Start Over
          </button>
          <button 
            onClick={() => onComplete(icp)}
            className="flex-1 px-10 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black shadow-2xl transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest"
          >
            Launch Intelligent Pipeline
            <i className="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 p-16 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800"></div>
      
      <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-10 text-primary-600 shadow-inner border border-gray-100 group">
        <i className="fas fa-link text-4xl group-hover:scale-110 transition-transform"></i>
      </div>
      <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">Sync Your Brain</h2>
      <p className="text-gray-400 mb-12 text-lg font-medium leading-relaxed max-w-sm mx-auto">
        Input your URL. Whether you're <span className="text-gray-900 font-bold">B2B</span>, <span className="text-gray-900 font-bold">B2C</span>, or <span className="text-gray-900 font-bold">Hybrid</span>, we'll map your entire market.
      </p>
      
      <div className="relative mb-8">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://company.in"
          className="w-full px-8 py-7 rounded-[2rem] border-2 border-gray-50 bg-gray-50/50 text-gray-900 placeholder:text-gray-300 focus:border-primary-500 focus:bg-white focus:ring-8 focus:ring-primary-500/5 outline-none transition-all text-xl font-bold"
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black border border-rose-100 flex items-center justify-center gap-2">
          <i className="fas fa-warning"></i>
          {error}
        </div>
      )}

      <button 
        onClick={handleGenerate}
        disabled={loading || !url}
        className={`w-full py-7 rounded-[2rem] text-white font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl ${
          loading || !url 
          ? 'bg-gray-200 cursor-not-allowed text-gray-400 shadow-none' 
          : 'bg-primary-600 hover:bg-primary-700 shadow-primary-200 hover:-translate-y-1'
        }`}
      >
        {loading ? (
          <>
            <i className="fas fa-circle-notch animate-spin"></i>
            Identifying Offerings...
          </>
        ) : (
          <>
            Analyze & Build
            <i className="fas fa-bolt"></i>
          </>
        )}
      </button>
    </div>
  );
};

const InsightGrid: React.FC<{ icon: string; title: string; items?: string[]; color: string }> = ({ icon, title, items = [], color }) => (
  <div className="p-6 rounded-[2rem] border border-gray-50 bg-gray-50/20 hover:bg-white hover:shadow-xl transition-all group">
    <div className={`w-10 h-10 bg-white shadow-sm border border-gray-50 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 group-hover:text-gray-600 transition-colors">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {(items || []).map(item => (
        <span key={item} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const StatMini: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-gray-900">{value}</p>
  </div>
);

export default ICPGenerator;
