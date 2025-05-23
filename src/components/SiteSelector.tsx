
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface Site {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface SiteSelectorProps {
  selectedSites: string[];
  onSiteToggle: (siteId: string) => void;
}

const sites: Site[] = [
  { id: 'amazon', name: 'Amazon', logo: '🛒', color: 'from-orange-500 to-yellow-500' },
  { id: 'ebay', name: 'eBay', logo: '🏪', color: 'from-blue-500 to-green-500' },
  { id: 'walmart', name: 'Walmart', logo: '🏬', color: 'from-blue-600 to-blue-700' },
  { id: 'bestbuy', name: 'Best Buy', logo: '💻', color: 'from-yellow-500 to-blue-600' },
  { id: 'target', name: 'Target', logo: '🎯', color: 'from-red-500 to-red-600' },
];

const SiteSelector = ({ selectedSites, onSiteToggle }: SiteSelectorProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-xl border-0">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select E-commerce Sites
          </h3>
          <p className="text-sm text-gray-600">
            Choose 3-5 sites to compare prices ({selectedSites.length}/5 selected)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sites.map((site) => {
            const isSelected = selectedSites.includes(site.id);
            const isDisabled = !isSelected && selectedSites.length >= 5;

            return (
              <div
                key={site.id}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : isDisabled
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => !isDisabled && onSiteToggle(site.id)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisabled}
                    className="pointer-events-none"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{site.logo}</span>
                      <span className="font-medium text-gray-800">{site.name}</span>
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${site.color} opacity-10 pointer-events-none`} />
                )}
              </div>
            );
          })}
        </div>

        {selectedSites.length < 3 && (
          <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-700 text-sm">
              ⚠️ Please select at least 3 sites to start comparing prices
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SiteSelector;
