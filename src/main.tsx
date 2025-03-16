import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './main-styles.css'  // Import our custom CSS

createRoot(document.getElementById("root")!).render(<App />);
