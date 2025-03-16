# Farm2Market Broker Platform for PoliRural

## Project Overview

This project is a prototype of a digital broker platform designed to connect local farmers with potential buyers in rural areas, with a focus on the Czech Republic, Bavaria, and surrounding regions. The platform aims to support sustainable agriculture and strengthen local food systems.

## Live Demo

**View the live application at: [https://brokerdemo.netlify.app/](https://brokerdemo.netlify.app/)**

## Key Features

- **AI Assistant**: Intelligent chat interface to help farmers and buyers navigate the platform
- **Interactive Map**: Visualize local farms and buyers in the Šumava region (Czech Republic, Germany, Austria)
- **Market Predictions**: AI-powered market trend analysis and price forecasting
- **Smart Matching**: Automated matching of farmers with potential buyers based on products and needs
- **Email Agent**: Automated email campaign management for connecting with potential partners

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- Leaflet (for maps)
- React Router

## Getting Started

```sh
# Clone the repository
git clone https://github.com/kordikp/broker-polirural.git

# Navigate to the project directory
cd broker-polirural

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment

This project can be deployed using multiple methods:

### 1. Netlify Deployment (Primary)

The project is deployed on Netlify with continuous deployment from the main branch:

1. The `netlify.toml` file contains the build configuration
2. The `netlify-build.sh` script handles the build process
3. Automated deployment occurs on every push to the main branch

**Live Netlify deployment: [https://brokerdemo.netlify.app/](https://brokerdemo.netlify.app/)**

### 2. GitHub Pages Deployment

The project is also automatically deployed to GitHub Pages using GitHub Actions. Any changes pushed to the main branch will trigger a new deployment.

#### GitHub Pages Configuration

To ensure proper deployment to GitHub Pages, follow these steps:

1. Go to your GitHub repository settings
2. Navigate to the "Pages" section in the sidebar
3. Under "Build and deployment", set the source to "GitHub Actions"
4. Make sure the GitHub Actions workflow has the necessary permissions:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"
   - Save the changes

You can access the GitHub Pages demo at: https://kordikp.github.io/broker-polirural/

### 3. Vercel Deployment

Vercel configuration is provided in the `vercel.json` file, which ensures proper routing for the SPA application.

## CSS Styling System

The project uses a carefully layered CSS styling system:

1. **Reset CSS** (`src/reset.css`): Resets browser default styles
2. **Farm Colors** (`src/farm-colors.css`): Defines theme color variables and classes
3. **Main Styles** (`src/main-styles.css`): Contains core layout and component styles
4. **App Styles** (`src/App.css`): Application-specific overrides
5. **Component Styles**: Individual component CSS files

CSS files are imported in the correct order in `App.tsx` to ensure proper cascading and priority.

## Latest Updates

- Fixed styling issues with consistent color application throughout the application
- Enhanced footer component to ensure proper text contrast on dark backgrounds
- Implemented CSS reset and proper styling hierarchy for predictable rendering
- Added multi-platform deployment support with primary deployment on Netlify
- Enhanced map loading experience with better visual indicators
- Added automated email agent with conversation tracking
- Improved cross-border visualization with country-specific markers

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages
- `/src/lib`: Utilities and mock data
- `/src/hooks`: Custom React hooks
- `/public`: Static assets
- `/dist`: Build output (generated)

## About PoliRural

PoliRural is an initiative focused on rural development and policy innovation across Europe. This broker platform prototype demonstrates how digital technologies can support rural economies and sustainable agriculture.

## License

MIT
