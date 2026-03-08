import { Request, Response } from 'express';
import SiteTemplate from '../models/SiteTemplate';
import { generateSiteMarkup } from '../services/geminiService';

// Generate a new site template using Gemini API
export const generateSite = async (req: Request, res: Response) => {
  try {
    const { nonprofitName, mission } = req.body;
    if (!nonprofitName || !mission) {
      return res.status(400).json({ message: 'nonprofitName and mission are required' });
    }
    const templateHtml = await generateSiteMarkup({ nonprofitName, mission });
    const template = new SiteTemplate({ nonprofitName, mission, templateHtml });
    await template.save();
    res.json({ templateHtml });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Error generating site' });
  }
};