
import { Lead } from './types';

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    companyName: 'Founder',
    contactPerson: 'Chintan Doshi',
    title: 'FOUNDER',
    email: 'chintan@doshi.com',
    location: 'Mumbai, MH',
    techStack: ['Premium Trading Tools', 'FinTech'],
    revenue: '₹50L+ ANNUALLY',
    enrichmentScore: 86,
    lastSignal: 'VALUES CONTINUOUS LEARNING, LIKELY INVESTS IN PREMIUM TRADING TOOLS AND EDUCATION.',
    socialScore: 89,
    prospectType: 'B2C',
    behavioralInsights: {
      spendingCapacity: 'VERY HIGH',
      investableSurplus: 'HIGH (₹50L+ ANNUALLY)',
      lifestyleIndications: 'Premium Trading Enthusiast',
      purchasingPropensity: 'High'
    },
    visualAnalysis: {
      profileAesthetic: 'Professional Modern',
      coverPhotoContext: 'Trading Desk / Finance Conference',
      imageGallerySummary: 'Consistent engagement with financial markets and educational content.'
    },
    socialData: {
      bio: "Serial entrepreneur. Investing in the future of Bharat.",
      profilePic: "https://i.pravatar.cc/150?u=chintan",
      banner: "https://picsum.photos/800/200?random=1",
      recentPosts: [],
      metrics: [
        { date: 'Oct 1', followers: 1200, engagement: 4.5 },
        { date: 'Oct 15', followers: 1500, engagement: 5.2 }
      ]
    }
  },
  {
    id: '2',
    companyName: 'Partnerships & Alliances',
    contactPerson: 'Paras Kochhar',
    title: 'VICE PRESIDENT',
    email: 'paras.k@corp.com',
    location: 'Gurugram, HR',
    techStack: ['Enterprise SaaS', 'Algos'],
    revenue: '₹30L - ₹40L RANGE',
    enrichmentScore: 92,
    lastSignal: 'BUSY CORPORATE EXECUTIVE WHO TRADES AS A SERIOUS PASSION/SECONDARY INCOME STREAM.',
    socialScore: 95,
    prospectType: 'B2C',
    behavioralInsights: {
      spendingCapacity: 'HIGH',
      investableSurplus: 'HIGH (₹30L - ₹40L RANGE)',
      lifestyleIndications: 'Corporate Executive',
      purchasingPropensity: 'Medium-High'
    },
    visualAnalysis: {
      profileAesthetic: 'Corporate Minimalist',
      coverPhotoContext: 'Global Summit / Leadership Session',
      imageGallerySummary: 'Focused on professional growth and strategic alliances.'
    },
    socialData: {
      bio: "VP Partnerships. Passionate about market dynamics.",
      profilePic: "https://i.pravatar.cc/150?u=paras",
      banner: "https://picsum.photos/800/200?random=2",
      recentPosts: [],
      metrics: [
        { date: 'Oct 1', followers: 4500, engagement: 3.2 },
        { date: 'Oct 15', followers: 4800, engagement: 3.8 }
      ]
    }
  },
  {
    id: '3',
    companyName: 'Founder Director',
    contactPerson: 'Swapnaja Sharma',
    title: 'FOUNDER DIRECTOR',
    email: 'swapnaja@sharma.in',
    location: 'Bengaluru, KA',
    techStack: ['Disciplined Systems', 'Equity'],
    revenue: '₹25L+',
    enrichmentScore: 84,
    lastSignal: 'FOCUSES ON FINANCIAL INDEPENDENCE AND DISCIPLINED TRADING SYSTEMS.',
    socialScore: 81,
    prospectType: 'B2C',
    behavioralInsights: {
      spendingCapacity: 'HIGH',
      investableSurplus: 'MODERATE TO HIGH (₹25L+)',
      lifestyleIndications: 'Financial Independence Seeker',
      purchasingPropensity: 'High'
    },
    visualAnalysis: {
      profileAesthetic: 'Artistic Professional',
      coverPhotoContext: 'Co-working Space / Tech Hub',
      imageGallerySummary: 'Active in community building and financial literacy.'
    },
    socialData: {
      bio: "Founder Director. Building sustainable wealth.",
      profilePic: "https://i.pravatar.cc/150?u=swapnaja",
      banner: "https://picsum.photos/800/200?random=3",
      recentPosts: [],
      metrics: [
        { date: 'Oct 1', followers: 2200, engagement: 6.5 },
        { date: 'Oct 15', followers: 2500, engagement: 7.1 }
      ]
    }
  }
];
