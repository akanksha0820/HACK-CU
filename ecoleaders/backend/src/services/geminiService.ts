import axios from 'axios';

interface GenerateSiteParams {
  nonprofitName: string;
  mission: string;
}

/**
 * Generates a website template for a nonprofit organization using Google Gemini.
 * If the API key is missing or the request fails, falls back to a simple HTML template.
 */
export async function generateSiteMarkup(params: GenerateSiteParams): Promise<string> {
  const { nonprofitName, mission } = params;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Gemini API key not set; using fallback template');
    return fallbackTemplate(nonprofitName, mission);
  }
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const prompt = [
      'You are an expert front‑end developer. Generate a complete HTML document for a modern, responsive nonprofit website.',
      `The organization is named "${nonprofitName}". Its mission: ${mission}.`,
      'The site must include: a navigation bar, a hero section, sections for About, Programs, Get Involved, and Contact.',
      'Use Tailwind CSS classes inline for styling. Do not include any external images or scripts except Tailwind CDN. Keep the design clean and accessible.',
    ].join('\n\n');
    const body = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };
    const response = await axios.post(url, body);
    const generated = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generated) return generated;
    return fallbackTemplate(nonprofitName, mission);
  } catch (err: any) {
    console.error('Gemini API error', err.response?.data || err.message);
    return fallbackTemplate(nonprofitName, mission);
  }
}

function fallbackTemplate(nonprofitName: string, mission: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nonprofitName} – ${mission}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans leading-normal tracking-normal text-gray-800">
  <nav class="bg-green-600 p-4 text-white">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">${nonprofitName}</h1>
      <ul class="flex space-x-4">
        <li><a href="#about" class="hover:underline">About</a></li>
        <li><a href="#programs" class="hover:underline">Programs</a></li>
        <li><a href="#get-involved" class="hover:underline">Get Involved</a></li>
        <li><a href="#contact" class="hover:underline">Contact</a></li>
      </ul>
    </div>
  </nav>
  <header class="bg-green-100 py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Welcome to ${nonprofitName}</h2>
      <p class="max-w-xl mx-auto">${mission}</p>
    </div>
  </header>
  <section id="about" class="py-12">
    <div class="container mx-auto">
      <h3 class="text-2xl font-semibold mb-4">About Us</h3>
      <p>We are a nonprofit dedicated to making a positive impact in our community. Add your story here.</p>
    </div>
  </section>
  <section id="programs" class="bg-gray-100 py-12">
    <div class="container mx-auto">
      <h3 class="text-2xl font-semibold mb-4">Our Programs</h3>
      <p>Describe your key programs and initiatives.</p>
    </div>
  </section>
  <section id="get-involved" class="py-12">
    <div class="container mx-auto">
      <h3 class="text-2xl font-semibold mb-4">Get Involved</h3>
      <p>Explain how supporters can volunteer, donate, or partner with you.</p>
    </div>
  </section>
  <section id="contact" class="bg-gray-100 py-12">
    <div class="container mx-auto">
      <h3 class="text-2xl font-semibold mb-4">Contact Us</h3>
      <p>Email: info@example.org</p>
    </div>
  </section>
</body>
</html>`;
}