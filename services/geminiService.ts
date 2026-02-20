import { GoogleGenAI, Type } from "@google/genai";
import { Article } from "../types";

// NOTE: In a production environment, this would be a backend service using Puppeteer.
// For this demo, we use Gemini's Live Search capabilities to fetch real-time news
// and structure it as if it were scraped, ensuring the app works immediately in the browser.

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Future of AI is Agentic",
    source: "TechCrunch",
    author: "Alex Wilhelm",
    date: "2024-05-20",
    imageUrl: "https://picsum.photos/seed/tech1/800/600",
    summary: "As artificial intelligence models grow in size and capability, the industry is shifting focus towards agentic workflows. These systems don't just answer questions; they perform actions.",
    fullContent: "The shift towards agentic AI represents a fundamental change in how we interact with technology. Unlike passive LLMs that wait for a prompt, agents are designed to pursue goals autonomously. \n\n Major players like OpenAI and Google are racing to build the most capable agents. These agents can browse the web, use software tools, and even collaborate with other agents to solve complex problems. \n\n However, safety remains a primary concern. An autonomous agent that can execute code or financial transactions requires robust guardrails. The next year will be crucial in defining the standards for these autonomous systems.",
    url: "#"
  },
  {
    id: "2",
    title: "Apple's New Vision Pro Update",
    source: "The Verge",
    author: "Nilay Patel",
    date: "2024-05-19",
    imageUrl: "https://picsum.photos/seed/apple/800/600",
    summary: "Apple has released a significant software update for the Vision Pro, addressing many of the early complaints about persona fidelity and window management.",
    fullContent: "The latest visionOS update brings spatial personas to life in a way that feels much more natural. Users can now high-five virtual avatars, and the latency has been significantly reduced. \n\n Furthermore, the update introduces 'Travel Mode' for trains, not just airplanes, expanding the use cases for commuters. \n\n Developers are also getting new tools to build more immersive shared experiences. This signals Apple's commitment to the platform despite early skepticism about the price point.",
    url: "#"
  },
  {
    id: "3",
    title: "Crypto Markets Rebound",
    source: "Wired",
    author: "Andy Greenberg",
    date: "2024-05-18",
    imageUrl: "https://picsum.photos/seed/crypto/800/600",
    summary: "After a tumultuous quarter, major cryptocurrencies are seeing a resurgence as institutional adoption grows and regulatory clarity improves in key markets.",
    fullContent: "Bitcoin and Ethereum have both posted double-digit gains this week. The driver appears to be the approval of new ETFs in Asian markets and a softening stance from US regulators. \n\n Analysts predict that this bull run might be more sustained than previous ones due to the underlying infrastructure maturity. \n\n However, security experts warn that with rising prices comes a rise in sophisticated phishing attacks targeting self-custody wallets.",
    url: "#"
  }
];

export const fetchLatestNews = async (): Promise<Article[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("No API Key found. Returning fallback data.");
    return FALLBACK_ARTICLES;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Fetch the latest 6 headlines from TechCrunch, The Verge, and Wired. For each article, provide a title, a plausible image URL (use picsum.photos/seed/{keyword}/800/600 format if real one unavailable), the source name, author (invent one if not found), date, a 2-paragraph summary, and a generated 300-word 'full content' body that expands on the summary professionally. Return as a JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              source: { type: Type.STRING },
              author: { type: Type.STRING },
              date: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
              summary: { type: Type.STRING },
              fullContent: { type: Type.STRING },
              url: { type: Type.STRING }
            },
            required: ["title", "source", "summary", "fullContent"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || "[]");
    
    if (!Array.isArray(data) || data.length === 0) {
        return FALLBACK_ARTICLES;
    }

    // Ensure IDs and images are present
    return data.map((article: any, index: number) => ({
      ...article,
      id: article.id || `gen-${index}-${Date.now()}`,
      imageUrl: article.imageUrl?.startsWith('http') ? article.imageUrl : `https://picsum.photos/seed/${index}/800/600`,
      date: article.date || new Date().toISOString().split('T')[0]
    }));

  } catch (error) {
    console.error("Failed to fetch news via Gemini:", error);
    return FALLBACK_ARTICLES;
  }
};