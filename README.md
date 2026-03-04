# OriginAI-Demo2

A modern TypeScript web application built with Vite, featuring a responsive UI with Tailwind CSS styling and professional code quality tools.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)

## 🎯 Overview

OriginAI-Demo2 is a demonstration project showcasing modern web development practices with TypeScript, Vite, and a comprehensive tooling setup for code quality and styling.

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Linting**: ESLint
- **Code Analysis**: Knip
- **Bundler**: Configured with Vite
- **Deployment**: Cloudflare Workers (Wrangler)

## 📁 Project Structure

```
OriginAI-Demo2/
├── src/                    # Source files
├── public/                 # Static assets
├── docs/                   # Documentation
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint rules
├── tsconfig.json           # TypeScript configuration
├── knip.json               # Dead code analysis config
└── wrangler.json           # Cloudflare Workers config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/demo-account91/OriginAI-Demo2.git
   cd OriginAI-Demo2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 💻 Development

Start the development server with hot module reloading:

```bash
npm run dev
```

This will start Vite's development server, typically available at `http://localhost:5173`.

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

Analyze unused code and dependencies:

```bash
npm run knip
```

## 📦 Building for Production

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## ☁️ Deployment

This project is configured for deployment to Cloudflare Workers. Use Wrangler to deploy:

```bash
wrangler deploy
```

For more information, see the [wrangler.json](./wrangler.json) configuration file.

## 🎨 Styling

The project uses Tailwind CSS for utility-first CSS styling. Customize your design by editing:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS processing

## 📖 Documentation

Additional documentation can be found in the [`docs/`](./docs/) directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is currently unlicensed. See your repository settings for license information.

---

**Created**: March 4, 2026
