
export type BusinessModel = 'B2B' | 'B2C' | 'Hybrid';

export interface ICP {
  businessModel: BusinessModel;
  productsAndServices: string[];
  valueProposition: string;
  outboundStrategy: string;
  
  corporateProfile?: {
    industries: string[];
    companySize: string;
    revenueRange: string;
    jobTitles: string[];
    geographies: string[];
    painPoints: string[];
    techStackPreference: string[];
    buyingTriggers: string[];
  };

  consumerProfile?: {
    demographics: string;
    incomeBracket: string;
    wealthTiers: string[];
    interests: string[];
    lifestyleSegments: string[];
    purchasingBehavior: string;
    keyInfluencers: string[];
  };
}

export interface CohortSelection {
  industry: string;
  geography: string;
  persona: string;
}

export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  title: string;
  email: string;
  location: string;
  techStack: string[];
  revenue: string;
  enrichmentScore: number;
  lastSignal: string;
  socialScore: number;
  website?: string;
  sourceUrl?: string; // The real URL found via search grounding
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    other?: string;
  };
  description?: string;
  prospectType: 'B2B' | 'B2C';
  
  visualAnalysis?: {
    profileAesthetic: string;
    coverPhotoContext: string;
    imageGallerySummary: string;
  };
  behavioralInsights?: {
    spendingCapacity: string;
    investableSurplus: string;
    lifestyleIndications: string;
    purchasingPropensity: string;
  };
  demographicsExtended?: {
    ageRange: string;
    maritalStatus: string;
    education: string;
  };

  socialData?: {
    bio: string;
    profilePic: string;
    banner: string;
    recentPosts: {
      id: string;
      image?: string;
      text: string;
      likes: number;
      date: string;
    }[];
    metrics: {
      date: string;
      followers: number;
      engagement: number;
    }[];
  };
}

export enum AppState {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  SEGMENT_SELECTION = 'SEGMENT_SELECTION',
  DASHBOARD = 'DASHBOARD'
}
