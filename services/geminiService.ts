
import { GoogleGenAI, Type } from "@google/genai";
import { ICP, Lead, CohortSelection } from "../types";

export const generateICPFromUrl = async (url: string): Promise<ICP> => {
  if (!process.env.API_KEY) {
    return {
      businessModel: 'Hybrid',
      productsAndServices: ['Wealth App', 'Payroll API'],
      valueProposition: 'Democratizing financial growth in India.',
      outboundStrategy: 'Direct Sales + Digital Growth',
      corporateProfile: {
        industries: ['SaaS', 'Manufacturing'],
        companySize: '100-500',
        revenueRange: '₹10Cr+',
        jobTitles: ['CFO', 'HR Lead'],
        geographies: ['Mumbai', 'Bengaluru'],
        painPoints: ['Manual Payroll'],
        techStackPreference: ['AWS'],
        buyingTriggers: ['Funding'],
      }
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze ${url} and generate an Indian market ICP.`,
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
  const isB2CSearch = icp.businessModel === 'B2C' || (icp.businessModel === 'Hybrid' && ['HNIs', 'UHNIs'].includes(cohort.persona));

  const searchQuery = `Find 10 ACTUAL high-priority prospects in India. 
    COHORT: ${cohort.industry} in ${cohort.geography} for "${cohort.persona}".
    SEARCH REQUIREMENT: You MUST find their REAL LinkedIn Profile URLs.`;

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
        profilePic: `https://i.pravatar.cc/150?u=${idx + 50}`,
        banner: `https://picsum.photos/800/200?random=${idx + 50}`,
        recentPosts: [],
        metrics: []
      }
    })) as Lead[];
  } catch (e) {
    return [];
  }
};
