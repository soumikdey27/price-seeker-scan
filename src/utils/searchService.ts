
import { Product } from '@/types/product';
import { SearchType } from '@/types/search';

// Mock product data generator
const generateMockProducts = (query: string, sites: string[]): Product[] => {
  const productNames = [
    `${query} - Premium Edition`,
    `${query} - Standard Model`,
    `${query} - Pro Version`,
    `${query} - Basic Edition`,
    `${query} - Deluxe Package`,
    `${query} - Enhanced Model`,
  ];

  const products: Product[] = [];

  sites.forEach((site, siteIndex) => {
    const numProducts = Math.floor(Math.random() * 3) + 2; // 2-4 products per site
    
    for (let i = 0; i < numProducts; i++) {
      const basePrice = 50 + Math.random() * 500;
      const siteMultiplier = {
        amazon: 1.0,
        ebay: 0.85,
        walmart: 0.9,
        bestbuy: 1.1,
        target: 0.95,
      }[site] || 1.0;

      products.push({
        id: `${site}-${i}-${Date.now()}`,
        name: productNames[Math.floor(Math.random() * productNames.length)],
        price: Math.round(basePrice * siteMultiplier * 100) / 100,
        rating: 3.5 + Math.random() * 1.5,
        reviews: Math.floor(Math.random() * 1000) + 50,
        imageUrl: `https://picsum.photos/400/400?random=${siteIndex * 10 + i}`,
        url: `https://${site}.com/product/${query.replace(/\s+/g, '-').toLowerCase()}`,
        site: site,
        availability: Math.random() > 0.1 ? 'in-stock' : 'limited',
      });
    }
  });

  return products;
};

export const searchProducts = async (
  query: string,
  sites: string[],
  type: SearchType,
  file?: File
): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (type === 'image' && file) {
    console.log('Processing image search for file:', file.name);
    // In a real implementation, you would upload the image to an AI service
    // to identify the product and extract search terms
    query = 'Identified Product from Image';
  }

  // Generate mock data
  const products = generateMockProducts(query, sites);
  
  console.log(`Generated ${products.length} products for query: ${query}`);
  return products;
};
