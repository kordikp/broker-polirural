import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Created images directory');
}

// Function to download an image
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    
    console.log(`Downloading ${url} to ${filePath}`);
    
    const file = fs.createWriteStream(filePath);
    
    const handleResponse = (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const newUrl = response.headers.location;
        console.log(`Redirecting to ${newUrl}`);
        
        // Determine protocol for the new URL
        const redirectProtocol = newUrl.startsWith('https') ? https : http;
        redirectProtocol.get(newUrl, handleResponse).on('error', (err) => {
          fs.unlink(filePath, () => {}); // Delete the file if there was an error
          reject(err);
        });
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve(filePath);
      });
    };
    
    // Determine protocol
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, handleResponse).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
};

// Images to download
const images = [
  // Hero image - farm-related
  {
    url: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
    filename: 'hero-image.jpg'
  },
  // Success stories - people/farmers
  {
    url: 'https://images.pexels.com/photos/2382895/pexels-photo-2382895.jpeg',
    filename: 'success-story-1.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/2889741/pexels-photo-2889741.jpeg',
    filename: 'success-story-2.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/2382892/pexels-photo-2382892.jpeg',
    filename: 'success-story-3.jpg'
  },
  // Product images - actual products
  {
    url: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg',
    filename: 'product-vegetables.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg',
    filename: 'product-lumber.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg',
    filename: 'product-cheese.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
    filename: 'product-corn.jpg'
  },
  // Farm pattern is already created as SVG
];

// Download all images
const downloadAllImages = async () => {
  try {
    for (const image of images) {
      try {
        await downloadImage(image.url, image.filename);
      } catch (error) {
        console.error(`Error downloading ${image.filename}:`, error.message);
      }
    }
    console.log('All images processed');
  } catch (error) {
    console.error('Error in download process:', error);
  }
};

downloadAllImages(); 