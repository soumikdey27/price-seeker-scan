
import { useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import SiteSelector from '@/components/SiteSelector';
import ProductResults from '@/components/ProductResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SearchType } from '@/types/search';
import { Product } from '@/types/product';
import { searchProducts } from '@/utils/searchService';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string, type: SearchType, file?: File) => {
    if (selectedSites.length < 3) {
      alert('Please select at least 3 e-commerce sites');
      return;
    }

    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      const results = await searchProducts(query, selectedSites, type, file);
      setProducts(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSiteToggle = (siteId: string) => {
    setSelectedSites(prev => {
      if (prev.includes(siteId)) {
        return prev.filter(id => id !== siteId);
      } else if (prev.length < 5) {
        return [...prev, siteId];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            PriceHunter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best deals across multiple e-commerce platforms. Search by text or upload an image to compare prices instantly.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto space-y-8">
          <ProductSearch onSearch={handleSearch} isLoading={isLoading} />
          
          <SiteSelector 
            selectedSites={selectedSites} 
            onSiteToggle={handleSiteToggle}
          />

          {/* Loading State */}
          {isLoading && (
            <LoadingSpinner 
              query={searchQuery} 
              selectedSites={selectedSites}
            />
          )}

          {/* Results */}
          {!isLoading && products.length > 0 && (
            <ProductResults products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
