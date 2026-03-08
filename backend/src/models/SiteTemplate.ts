import { Schema, model, Document } from 'mongoose';

export interface ISiteTemplate extends Document {
  nonprofitName: string;
  mission: string;
  templateHtml: string;
  generatedAt: Date;
}

const siteTemplateSchema = new Schema<ISiteTemplate>({
  nonprofitName: { type: String, required: true },
  mission: { type: String, required: true },
  templateHtml: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
});

export default model<ISiteTemplate>('SiteTemplate', siteTemplateSchema);