# Gist Answers Clone

A pixel-perfect Next.js clone of the Gist Answers landing page (https://gist.ai/answers/).

## Features

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Responsive Design** - mobile-first approach
- ✅ **Interactive Components**:
  - Modal for "Get Started" CTA
  - Accordion for FAQ section
  - Dropdown navigation menu
  - Smooth scroll animations
- ✅ **Optimized Images** with Next.js Image component
- ✅ **Custom Color Palette** matching the original design
- ✅ **Gradient Backgrounds** and modern UI elements

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
gistanswersai2/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main Answers page
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation header
│   │   └── Footer.tsx      # Footer with links
│   ├── sections/
│   │   └── HeroSection.tsx # Hero CTA section
│   └── ui/
│       ├── Button.tsx      # Reusable button component
│       ├── Modal.tsx       # Get Started modal
│       └── Accordion.tsx   # FAQ accordion
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    └── images/             # Static images
```

## Key Components

### Header
- Sticky navigation with dropdown menu
- Product suite navigation
- Contact CTA button
- Mobile-responsive

### Hero Section
- Gradient background
- Main headline and CTA
- "Ask anything" visual

### Features Section
- 4 feature blocks with images
- Alternating layout
- Rounded corners and shadows

### FAQ Accordion
- Expandable Q&A items
- Smooth animations
- Allow multiple open items

### Modal
- Get Started options
- Gist Console link
- WordPress plugin download
- Book demo CTA

### Footer
- Multi-column layout
- Social media links
- Product links
- Legal links

## Color Palette

- **Primary**: `#ffffff` (white)
- **Secondary**: `#4e4e4e` (gray)
- **Dark**: `#291C39`
- **Purple**: `#6F4D9B` (Grimace)
- **Perrywinkle**: `#7F71FA`
- **Orange**: `#FA9946`
- **Grey**: `#f6f6f6`

## Fonts

- **Inter** - Primary font family (Google Fonts)

## Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Framework**: Next.js 14.2.18
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## License

This is a clone project created for educational purposes.

## Credits

Original design and content: [Gist AI](https://gist.ai/)
