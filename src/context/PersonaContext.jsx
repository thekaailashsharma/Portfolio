import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';

const PersonaContext = createContext(null);

const PERSONAS = {
  'product-managers': {
    type: 'persona',
    label: 'Product Managers',
    heroSubtitle: 'I think in systems, not features. 200K+ DAU, 4 global Top 100 products, cross-border PM experience.',
    sectionOrder: ['timeline', 'about', 'systems', 'writing', 'speaking'],
    resume: { label: 'For Innovators', href: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
    ogTitle: 'Kailash Sharma — For Product Managers',
    ogDescription: 'Product builder with 200K+ DAU scale, 4 global Top 100 products, and cross-border PM experience.',
  },
  'engineers': {
    type: 'persona',
    label: 'Engineers',
    heroSubtitle: 'I ship production systems, not side projects. Kotlin, Swift, AI — I go where the problem needs me.',
    sectionOrder: ['systems', 'timeline', 'about', 'speaking', 'writing'],
    resume: { label: 'For Generalists', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
    ogTitle: 'Kailash Sharma — For Engineering Teams',
    ogDescription: 'SDE at 200K+ DAU scale. Production Kotlin, Swift, AI systems. 62+ public repos.',
  },
  'event-organizers': {
    type: 'persona',
    label: 'Event Organizers',
    heroSubtitle: '10+ conferences. I bring energy and real stories, not slides. Builder-first talks that actually help people ship.',
    sectionOrder: ['speaking', 'writing', 'timeline', 'systems', 'about'],
    resume: { label: 'For Event Organizers', href: 'https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing' },
    ogTitle: 'Kailash Sharma — Speaker & Mentor',
    ogDescription: '10+ conferences including DevFest, Swift Mumbai, GDG MAD. Builder-first talks grounded in real execution.',
  },
  'startups': {
    type: 'persona',
    label: 'Startups',
    heroSubtitle: '4 products at Global Top 100. Zero-to-one is my default mode. I ship MVPs in weeks, not months.',
    sectionOrder: ['systems', 'about', 'timeline', 'speaking', 'writing'],
    resume: { label: 'For Innovators', href: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
    ogTitle: 'Kailash Sharma — For Startups',
    ogDescription: 'Zero-to-one builder. 4 global Top 100 products, shipped MVPs in weeks, won national hackathons.',
  },
  'investors': {
    type: 'persona',
    label: 'Investors',
    heroSubtitle: 'Building at the intersection of product, AI, and scale. Track record of shipping things people actually use.',
    sectionOrder: ['about', 'systems', 'timeline', 'writing', 'speaking'],
    resume: { label: 'For Innovators', href: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
    ogTitle: 'Kailash Sharma — For Investors',
    ogDescription: 'Product builder at 200K+ DAU. AI architect. 2× Google Top 100 globally. Building at the intersection of product and scale.',
  },
  'collaborators': {
    type: 'persona',
    label: 'Collaborators',
    heroSubtitle: '370+ contributors. Open source, community-first building. Let\'s create something that matters.',
    sectionOrder: ['writing', 'speaking', 'timeline', 'systems', 'about'],
    resume: { label: 'For Generalists', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
    ogTitle: 'Kailash Sharma — For Collaborators',
    ogDescription: 'Open source builder. 370+ global contributors. Community-first approach to product and AI.',
  },
};

const KNOWLEDGE_SUMMARY = `Kailash Sharma: SDE at Shaadi.com (200K+ DAU, India's largest matrimony platform). AI Architect at Open Paws (370+ global contributors). PM at Leadbeam.ai (US B2B CRM) and My Irish Cousin (Irish travel product). Android dev at Fold Money (Google Play Best App 2024). Built Tripify (AI travel, 600+ users), Waste2Wealth (Top 100 globally, 1st at Mumbai Hacks), Wowdrobe (Top 100 globally, Titan finalist), Evolve with AI (AI keyboard, Google Featured). 2x Google Solution Challenge Top 100. Speaker at 10+ conferences. Writes on Substack about product thinking and AI. Skills: Kotlin, Swift, Jetpack Compose, AI/ML, product strategy. Based in Mumbai.`;

async function generateCompanyPersona(companySlug) {
  const cacheKey = `persona-${companySlug}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try { return JSON.parse(cached); } catch { /* regenerate */ }
  }

  const companyName = companySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('No API key');

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are helping personalize a portfolio website for a specific company. Given this person's background:

${KNOWLEDGE_SUMMARY}

Generate a personalized 2-sentence pitch for why this person would be valuable at "${companyName}". Also pick the 5 sections in order of relevance from: [about, timeline, systems, speaking, writing].

IMPORTANT: Be specific about what connects this person to ${companyName}. Reference actual skills, projects, or experience that align.

Respond in valid JSON only, no markdown:
{"pitch": "...", "sections": ["...", "...", "...", "...", "..."]}`,
    });

    const text = response.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const data = JSON.parse(text);

    const persona = {
      type: 'company',
      label: companyName,
      heroSubtitle: data.pitch,
      sectionOrder: data.sections,
      resume: { label: 'For Generalists', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
      ogTitle: `Kailash Sharma — For ${companyName}`,
      ogDescription: data.pitch,
    };

    localStorage.setItem(cacheKey, JSON.stringify(persona));
    return persona;
  } catch {
    const companyName2 = companySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      type: 'company',
      label: companyName2,
      heroSubtitle: `Builder of products, AI systems, and teams. Here\'s why I\'d be a great fit at ${companyName2}.`,
      sectionOrder: ['about', 'timeline', 'systems', 'speaking', 'writing'],
      resume: { label: 'For Generalists', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
      ogTitle: `Kailash Sharma — For ${companyName2}`,
      ogDescription: `Product builder, AI architect, and engineer. Personalized portfolio for ${companyName2}.`,
    };
  }
}

export function PersonaProvider({ children }) {
  const { slug } = useParams();
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) {
      setPersona(null);
      return;
    }

    if (PERSONAS[slug]) {
      setPersona(PERSONAS[slug]);
      return;
    }

    setLoading(true);
    generateCompanyPersona(slug).then((p) => {
      setPersona(p);
      setLoading(false);
    });
  }, [slug]);

  const value = useMemo(() => ({ persona, loading, slug }), [persona, loading, slug]);

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext) || { persona: null, loading: false, slug: null };
}

export { PERSONAS };
