import { generateSiteMarkup } from './geminiService';

export async function generateNonprofitSite(intake: any) {
  // Wrap existing Gemini HTML generator but ensure structured prompt
  return generateSiteMarkup(intake);
}
