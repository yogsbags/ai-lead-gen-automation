
import React, { useState, useMemo, useEffect } from 'react';
import { ICP, CohortSelection } from '../types';

interface CohortSelectorProps {
  icp: ICP;
  onStartSearch: (cohort: CohortSelection) => void;
  onBack: () => void;
}

const CohortSelector: React.FC<CohortSelectorProps> = ({ icp, onStartSearch, onBack }) => {
  const isB2C = icp.businessModel === 'B2C';
  const isHybrid = icp.businessModel === 'Hybrid';

  const [viewMode, setViewMode] = useState<'B2B' | 'B2C'>(isB2C ? 'B2C' : 'B2B');

  const options = useMemo(() => {
    if (viewMode === 'B2B' && icp.corporateProfile) {
      return {
        col1Label: 'Industry Cluster',
        col1Items: icp.corporateProfile.industries || [],
        col2Label: 'Region',
        col2Items: icp.corporateProfile.geographies || [],
        col3Label: 'Persona',
        col3Items: icp.corporateProfile.jobTitles || [],
      };
    } else if (icp.consumerProfile) {
      // For B2C, we want explicit wealth tiers
      const tiers = icp.consumerProfile.wealthTiers && icp.consumerProfile.wealthTiers.length > 0 
        ? icp.consumerProfile.wealthTiers 
        : ['Mass Affluent', 'Affluent', 'HNIs', 'UHNIs'];

      return {
        col1Label: 'Lifestyle Segment',
        col1Items: icp.consumerProfile.lifestyleSegments || [],
        col2Label: 'Region / Target Interest',
        col2Items: icp.consumerProfile.interests || [],
        col3Label: 'Wealth Tier (Wealth Segment)',
        col3Items: tiers,
      };
    }
    return null;
  }, [viewMode, icp]);

  const [selection, setSelection] = useState<CohortSelection>({
    industry: options?.col1Items?.[0] || 'General',
    geography: options?.col2Items?.[0] || 'India',
    persona: options?.col3Items?.[0] || 'Target User'
  });

  // Reset selection when switching view mode
  useEffect(() => {
    if (options) {
      setSelection({
        industry: options.col1Items?.[0] || 'General',
        geography: options.col2Items?.[0] || 'India',
        persona: options.col3Items?.[0] || 'Target User'
      });
    }
  }, [viewMode, options]);

  if (!options) return null;

  return (
    <div className="max-w-5xl w-full bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 p-8 md:p-14 overflow-hidden animate-in fade-in zoom-in duration-500">
      {/* Header with View Toggle for Hybrid */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="w-12 h-12 rounded-2xl hover:bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 transition-all hover:text-gray-900">
             <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Select Search Cohort</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Refine your intelligent search parameters</p>
          </div>
        </div>

        {isHybrid && (
          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <button 
              onClick={() => setViewMode('B2B')}
              className={`px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${viewMode === 'B2B' ? 'bg-white text-primary-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <i className="fas fa-building mr-2"></i>
              B2B LEADS
            </button>
            <button 
              onClick={() => setViewMode('B2C')}
              className={`px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${viewMode === 'B2C' ? 'bg-white text-primary-600 shadow-md ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <i className="fas fa-user-tag mr-2"></i>
              B2C SEGMENTS
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
        {/* Column 1 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{options.col1Label}</label>
          </div>
          <div className="flex flex-col gap-2.5">
            {(options.col1Items || []).map(item => (
              <button 
                key={item}
                onClick={() => setSelection(prev => ({ ...prev, industry: item }))}
                className={`px-6 py-4 rounded-2xl text-sm font-bold border-2 text-left transition-all ${selection.industry === item ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm' : 'border-transparent bg-gray-50/50 text-gray-500 hover:border-gray-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{options.col2Label}</label>
          </div>
          <div className="flex flex-col gap-2.5">
            {(options.col2Items || []).map(item => (
              <button 
                key={item}
                onClick={() => setSelection(prev => ({ ...prev, geography: item }))}
                className={`px-6 py-4 rounded-2xl text-sm font-bold border-2 text-left transition-all ${selection.geography === item ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm' : 'border-transparent bg-gray-50/50 text-gray-500 hover:border-gray-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{options.col3Label}</label>
          </div>
          <div className="flex flex-col gap-2.5">
            {(options.col3Items || []).map(item => (
              <button 
                key={item}
                onClick={() => setSelection(prev => ({ ...prev, persona: item }))}
                className={`px-6 py-4 rounded-2xl text-sm font-bold border-2 text-left transition-all ${selection.persona === item ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm' : 'border-transparent bg-gray-50/50 text-gray-500 hover:border-gray-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-10 bg-gray-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-transparent opacity-50"></div>
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <h4 className="text-primary-400 font-black text-[11px] uppercase tracking-[0.25em]">Strategic Scraper Deployment</h4>
          </div>
          <p className="text-lg font-bold opacity-90 leading-relaxed max-w-xl">
            Crawl for <span className="text-white underline decoration-primary-500 decoration-2 underline-offset-4">{selection.industry}</span> signals 
            in <span className="text-white underline decoration-indigo-500 decoration-2 underline-offset-4">{selection.geography}</span> targeting the <span className="text-white underline decoration-emerald-500 decoration-2 underline-offset-4">{selection.persona}</span> segment.
          </p>
        </div>
        <button 
          onClick={() => onStartSearch(selection)}
          className="px-12 py-6 bg-primary-600 text-white rounded-[1.5rem] font-black text-base uppercase tracking-widest hover:bg-primary-500 shadow-[0_20px_40px_-10px_rgba(14,165,233,0.5)] transition-all active:scale-95 flex items-center gap-4 shrink-0 relative z-10 hover:-translate-y-1"
        >
          Launch Scraper
          <i className="fas fa-satellite text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default CohortSelector;
