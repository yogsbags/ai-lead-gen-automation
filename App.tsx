
import React, { useState } from 'react';
import { AppState, ICP, Lead, CohortSelection } from './types';
import LandingPage from './components/LandingPage';
import ICPGenerator from './components/ICPGenerator';
import CohortSelector from './components/CohortSelector';
import Dashboard from './components/Dashboard';
import { fetchProspectsFromSearch } from './services/geminiService';
import { enrichLeadWithBrightData } from './services/brightDataService';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.LANDING);
  const [userICP, setUserICP] = useState<ICP | null>(null);
  const [activeCohort, setActiveCohort] = useState<CohortSelection | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingStage, setLoadingStage] = useState<'IDLE' | 'SEARCHING' | 'SCRAPING'>('IDLE');

  const handleStartOnboarding = () => {
    setCurrentState(AppState.ONBOARDING);
  };

  const handleICPComplete = (icp: ICP) => {
    setUserICP(icp);
    setCurrentState(AppState.SEGMENT_SELECTION);
  };

  const handleCohortSelection = async (cohort: CohortSelection) => {
    if (!userICP) return;
    setActiveCohort(cohort);
    setCurrentState(AppState.DASHBOARD);
    
    // Stage 1: Discovery via Gemini Search Grounding
    setLoadingStage('SEARCHING');
    try {
      const initialLeads = await fetchProspectsFromSearch(userICP, cohort);
      setLeads(initialLeads);

      // Stage 2: Deep Enrichment via Bright Data
      setLoadingStage('SCRAPING');
      const enrichedLeads = await Promise.all(
        initialLeads.map(lead => enrichLeadWithBrightData(lead))
      );
      setLeads(enrichedLeads);
    } catch (e) {
      console.error("Workflow failed", e);
    } finally {
      setLoadingStage('IDLE');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900">
      {currentState === AppState.LANDING && (
        <LandingPage onStart={handleStartOnboarding} />
      )}

      {currentState === AppState.ONBOARDING && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
           <ICPGenerator onComplete={handleICPComplete} />
        </div>
      )}

      {currentState === AppState.SEGMENT_SELECTION && userICP && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
           <CohortSelector 
             icp={userICP} 
             onStartSearch={handleCohortSelection} 
             onBack={() => setCurrentState(AppState.ONBOARDING)} 
           />
        </div>
      )}

      {currentState === AppState.DASHBOARD && (
        <>
          {loadingStage !== 'IDLE' && leads.length === 0 ? (
            <div className="h-screen w-screen bg-white flex flex-col items-center justify-center p-12 text-center">
              <div className="w-32 h-32 relative mb-12">
                <div className="absolute inset-0 border-8 border-primary-50 border-t-primary-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-primary-600">
                  <i className={`fas ${loadingStage === 'SEARCHING' ? 'fa-satellite-dish' : 'fa-spider'} text-4xl`}></i>
                </div>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                {loadingStage === 'SEARCHING' ? 'Discovery Phase' : 'Deep Scraper Active'}
              </h2>
              <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                {loadingStage === 'SEARCHING' 
                  ? `Gemini is finding real LinkedIn profiles for ${activeCohort?.persona} in ${activeCohort?.geography}...`
                  : `Bright Data is now extracting deep visual and behavioral signals from the identified profiles...`}
              </p>
            </div>
          ) : (
            <Dashboard initialLeads={leads} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
