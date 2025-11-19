# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring a terminal-inspired UI design with Catppuccin color scheme.

## 🚀 Features

- **Terminal-Inspired Design**: Clean, minimalist interface with terminal aesthetics
- **Dark/Light Theme**: Toggle between Catppuccin dark and light themes
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Sections**: 
  - Personal information with profile photo
  - About me section
  - Education timeline
  - Projects showcase
  - Experience details
- **Nerd Font Icons**: Beautiful iconography using Symbols Nerd Font
- **Modern Tech Stack**: Built with Next.js 14, React 18, and TypeScript

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme**: Catppuccin color palette
- **Fonts**: Victor Mono, Symbols Nerd Font
- **Icons**: Nerd Font symbols

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── sections/          # Page sections
│   ├── PersonalInfo.tsx   # Profile section
│   ├── Portfolio.tsx      # Main portfolio component
│   ├── ThemeSwitcher.tsx  # Theme toggle
│   └── ...                # Other components
├── data/                  # JSON data files
│   ├── about_me.json      # About section content
│   ├── education.json     # Education timeline
│   ├── experience.json    # Work experience
│   ├── personal_info.json # Personal details
│   ├── projects.json      # Projects data
│   ├── socials.json       # Social media links
│   └── technologies.json  # Tech stack
└── public/                # Static assets
    ├── fonts/             # Font files
    └── hmanzano1012.jpg   # Profile photo
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Adding Your Information

Update the JSON files in the `data/` directory:

- `personal_info.json` - Your contact information
- `about_me.json` - About section content
- `education.json` - Education timeline
- `experience.json` - Work experience
- `projects.json` - Your projects
- `socials.json` - Social media links
- `technologies.json` - Technologies you use

### Profile Photo

Replace `public/hmanzano1012.jpg` with your own profile photo. The image will be automatically optimized by Next.js.

### Theme Customization

The project uses Catppuccin color schemes. You can customize colors in `tailwind.config.ts` or modify the theme switching logic in `components/ThemeSwitcher.tsx`.

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Responsive grid layouts
- Adaptive typography
- Mobile-optimized navigation
- Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

You can also deploy to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is private and personal. Please respect the intellectual property.

## 📞 Contact

For questions or suggestions, please reach out through the contact information in the portfolio.

---

Built with ❤️ using Next.js and Catppuccin colors.