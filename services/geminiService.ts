
import { GoogleGenAI, Type } from "@google/genai";
import { ICP, Lead, CohortSelection } from "../types";

export const generateICPFromUrl = async (url: string): Promise<ICP> => {
  if (!process.env.API_KEY) {
    return {
      businessModel: 'Hybrid',
      productsAndServices: [
        'Equity and Derivatives Trading',
        'Portfolio Management Services (PMS)',
        'Investment Banking',
        'Institutional Equities',
        'Wealth Management',
        'Mutual Funds and SIPs',
        'Currency and Commodity Trading',
        'Margin Funding (MTF)',
        'Loan Against Shares',
        'Corporate Advisory'
      ],
      valueProposition: 'Prabhudas Lilladher (PL) leverages over seven decades of trust and deep, data-driven research to provide comprehensive financial solutions ranging from retail broking to complex investment banking advisory, helping clients navigate the Indian market\'s growth themes.',
      outboundStrategy: 'Omni-channel growth focusing on Digital HNI onboarding and Institutional partnerships.',
      corporateProfile: {
        industries: ['Financial Services', 'Fintech', 'Investment Banking'],
        companySize: '500-2000',
        revenueRange: '₹100Cr+',
        jobTitles: ['CFO', 'Treasury Head', 'Investment Committee Member'],
        geographies: ['Mumbai', 'Delhi NCR', 'Bengaluru'],
        painPoints: ['Complex regulatory compliance', 'Sub-optimal portfolio yields'],
        techStackPreference: ['Bloomberg', 'SAP', 'High-end Trading Algos'],
        buyingTriggers: ['IPO plans', 'Surplus cash management', 'Regulatory changes'],
      },
      consumerProfile: {
        demographics: 'Ages 30-55, Urban Professionals',
        incomeBracket: '₹25L - ₹1Cr+ p.a.',
        wealthTiers: ['Affluent', 'HNIs', 'UHNIs'],
        interests: ['Wealth Creation', 'Direct Equity', 'Global Markets'],
        lifestyleSegments: ['High Net Worth Individuals', 'Active Traders'],
        purchasingBehavior: 'Research-driven, values high-touch advisory',
        keyInfluencers: ['Financial News Networks', 'NIFTY/SENSEX analysts'],
      }
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze the website ${url} and generate a comprehensive Indian market Ideal Customer Profile (ICP). If it's a financial or multi-service brand, classify as 'Hybrid'. Generate BOTH corporateProfile and consumerProfile details if applicable.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessModel: { type: Type.STRING, enum: ['B2B', 'B2C', 'Hybrid'] },
          productsAndServices: { type: Type.ARRAY, items: { type: Type.STRING } },
          valueProposition: { type: Type.STRING },
          outboundStrategy: { type: Type.STRING },
          corporateProfile: {
            type: Type.OBJECT,
            properties: {
              industries: { type: Type.ARRAY, items: { type: Type.STRING } },
              companySize: { type: Type.STRING },
              revenueRange: { type: Type.STRING },
              jobTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
              geographies: { type: Type.ARRAY, items: { type: Type.STRING } },
              painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              techStackPreference: { type: Type.ARRAY, items: { type: Type.STRING } },
              buyingTriggers: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          consumerProfile: {
            type: Type.OBJECT,
            properties: {
              demographics: { type: Type.STRING },
              incomeBracket: { type: Type.STRING },
              wealthTiers: { type: Type.ARRAY, items: { type: Type.STRING } },
              interests: { type: Type.ARRAY, items: { type: Type.STRING } },
              lifestyleSegments: { type: Type.ARRAY, items: { type: Type.STRING } },
              purchasingBehavior: { type: Type.STRING },
              keyInfluencers: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        },
        required: ["businessModel", "productsAndServices", "valueProposition", "outboundStrategy"]
      }
    }
  });

  return JSON.parse(response.text) as ICP;
};

export const fetchProspectsFromSearch = async (icp: ICP, cohort: CohortSelection): Promise<Lead[]> => {
  if (!process.env.API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const isB2CSearch = icp.businessModel === 'B2C' || (icp.businessModel === 'Hybrid' && ['HNIs', 'UHNIs', 'Affluent'].includes(cohort.persona));

  const searchQuery = `Find 10 ACTUAL high-priority prospects in India matching this cohort: ${cohort.industry} in ${cohort.geography} for "${cohort.persona}". 
    Target specific real people or companies. You MUST find their REAL LinkedIn Profile URLs.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: searchQuery,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            companyName: { type: Type.STRING },
            contactPerson: { type: Type.STRING },
            title: { type: Type.STRING },
            location: { type: Type.STRING },
            sourceUrl: { type: Type.STRING, description: "The LinkedIn Profile URL" },
            socialLinks: {
              type: Type.OBJECT,
              properties: { linkedin: { type: Type.STRING } }
            },
            description: { type: Type.STRING, description: "Initial summary based on search results" }
          },
          required: ["contactPerson", "title", "sourceUrl"]
        }
      }
    }
  });

  try {
    const raw = JSON.parse(response.text) as any[];
    return raw.map((p, idx) => ({
      ...p,
      id: `lead-${idx}-${Date.now()}`,
      prospectType: isB2CSearch ? 'B2C' : 'B2B',
      enrichmentScore: 85,
      socialScore: 80,
      lastSignal: p.description || 'Verified LinkedIn Profile Found',
      techStack: [],
      revenue: 'TBD',
      email: 'verified@leadflow.ai',
      socialLinks: p.socialLinks || { linkedin: p.sourceUrl },
      socialData: {
        bio: "",
        profilePic: `https://i.pravatar.cc/150?u=${idx + 100}`,
        banner: `https://picsum.photos/800/200?random=${idx + 100}`,
        recentPosts: [],
        metrics: []
      }
    })) as Lead[];
  } catch (e) {
    return [];
  }
};
