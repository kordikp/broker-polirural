# Farm2Market Broker Platform for PoliRural

## Project Overview

This project is a prototype of a digital broker platform designed to connect local farmers with potential buyers in rural areas, with a focus on the Czech Republic, Bavaria, and surrounding regions. The platform aims to support sustainable agriculture and strengthen local food systems.

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

This project is automatically deployed to GitHub Pages using GitHub Actions. Any changes pushed to the main branch will trigger a new deployment.

### GitHub Pages Configuration

To ensure proper deployment to GitHub Pages, follow these steps:

1. Go to your GitHub repository settings
2. Navigate to the "Pages" section in the sidebar
3. Under "Build and deployment", set the source to "GitHub Actions"
4. Make sure the GitHub Actions workflow has the necessary permissions:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"
   - Save the changes

You can access the live demo at: https://kordikp.github.io/broker-polirural/

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages
- `/src/lib`: Utilities and mock data
- `/src/hooks`: Custom React hooks

## About PoliRural

PoliRural is an initiative focused on rural development and policy innovation across Europe. This broker platform prototype demonstrates how digital technologies can support rural economies and sustainable agriculture.

## License

MIT
