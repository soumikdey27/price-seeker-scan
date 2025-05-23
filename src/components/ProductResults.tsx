
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types/product';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ProductResultsProps {
  products: Product[];
}

type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'site';

const ProductResults = ({ products }: ProductResultsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [filteredSite, setFilteredSite] = useState<string>('all');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      case 'site':
        return a.site.localeCompare(b.site);
      default:
        return 0;
    }
  });

  const filteredProducts = filteredSite === 'all' 
    ? sortedProducts 
    : sortedProducts.filter(product => product.site === filteredSite);

  const uniqueSites = [...new Set(products.map(p => p.site))];

  const getSiteColor = (site: string) => {
    const colors = {
      amazon: 'bg-orange-100 text-orange-700 border-orange-200',
      ebay: 'bg-blue-100 text-blue-700 border-blue-200',
      walmart: 'bg-blue-100 text-blue-700 border-blue-200',
      bestbuy: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      target: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[site as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getSiteEmoji = (site: string) => {
    const emojis = {
      amazon: '🛒',
      ebay: '🏪',
      walmart: '🏬',
      bestbuy: '💻',
      target: '🎯',
    };
    return emojis[site as keyof typeof emojis] || '🛍️';
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-xl border-0">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Found {filteredProducts.length} products
            </h2>
            <p className="text-gray-600">
              Showing results from {uniqueSites.length} e-commerce sites
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">
                  <div className="flex items-center gap-2">
                    <ArrowUp size={16} />
                    Price: Low to High
                  </div>
                </SelectItem>
                <SelectItem value="price-desc">
                  <div className="flex items-center gap-2">
                    <ArrowDown size={16} />
                    Price: High to Low
                  </div>
                </SelectItem>
                <SelectItem value="rating-desc">
                  <div className="flex items-center gap-2">
                    ⭐ Rating: High to Low
                  </div>
                </SelectItem>
                <SelectItem value="site">
                  <div className="flex items-center gap-2">
                    🏪 Site Name
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filteredSite} onValueChange={setFilteredSite}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {uniqueSites.map(site => (
                  <SelectItem key={site} value={site}>
                    {getSiteEmoji(site)} {site.charAt(0).toUpperCase() + site.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getSiteColor(product.site)}`}>
                  {getSiteEmoji(product.site)} {product.site.charAt(0).toUpperCase() + product.site.slice(1)}
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviews})
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => window.open(product.url, '_blank')}
                >
                  View on {product.site.charAt(0).toUpperCase() + product.site.slice(1)}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search for a different product.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductResults;
