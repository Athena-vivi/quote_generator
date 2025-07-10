# QuoteGenerator - Bible Quote Art Creator

Transform Bible quotes into beautiful, shareable AI-generated art.

## Features

- 🙏 Daily Bible quote recommendations
- 💭 Mood-based quote search
- 🎨 AI-powered background generation
- 📱 High-resolution image downloads
- 🔗 Social media sharing
- ❤️ Favorite quotes management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/quotegenerator.git
cd quotegenerator
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Fill in your API keys in `.env.local`:

#### Required API Keys

**Fal.ai API Key** (for AI image generation):
- Sign up at [fal.ai](https://fal.ai)
- Get your API key from the dashboard
- Add to `FAL_API_KEY` in `.env.local`

**ESV Bible API Key** (for Bible verses):
- Sign up at [ESV API](https://api.esv.org)
- Get your API key
- Add to `ESV_API_KEY` in `.env.local`

**OpenRouter API Key** (for mood analysis):
- Sign up at [OpenRouter](https://openrouter.ai)
- Get your API key
- Add to `OPENROUTER_API_KEY` in `.env.local`

#### Optional API Keys

**Google AdSense** (for monetization):
- Set up Google AdSense
- Add your publisher ID to `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`

**Google Analytics** (for analytics):
- Set up Google Analytics 4
- Add your measurement ID to `NEXT_PUBLIC_GA_MEASUREMENT_ID`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Required
FAL_API_KEY=your_fal_api_key_here
ESV_API_KEY=your_esv_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-your-publisher-id
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
\`\`\`

## API Keys Setup Guide

### 1. Fal.ai API Key
1. Visit [fal.ai](https://fal.ai)
2. Sign up for an account
3. Go to your dashboard
4. Generate an API key
5. Copy the key to `FAL_API_KEY` in your `.env.local`

### 2. ESV Bible API Key
1. Visit [ESV API](https://api.esv.org)
2. Sign up for a free account
3. Go to your account dashboard
4. Copy your API key
5. Add it to `ESV_API_KEY` in your `.env.local`

### 3. OpenRouter API Key
1. Visit [OpenRouter](https://openrouter.ai)
2. Sign up for an account
3. Go to your API keys section
4. Generate a new API key
5. Add it to `OPENROUTER_API_KEY` in your `.env.local`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Make sure to set all required environment variables in your deployment platform.

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Image Generation**: Fal.ai
- **Bible API**: ESV API
- **AI Text Processing**: OpenRouter
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email Athena1592025@outlook.com or create an issue on GitHub.

## Acknowledgments

- ESV Bible API for providing Bible verses
- Fal.ai for AI image generation
- OpenRouter for AI text processing
- shadcn/ui for beautiful components
