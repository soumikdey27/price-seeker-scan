
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SearchType } from '@/types/search';
import { Upload, Search, Image } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string, type: SearchType, file?: File) => void;
  isLoading: boolean;
}

const ProductSearch = ({ onSearch, isLoading }: ProductSearchProps) => {
  const [searchType, setSearchType] = useState<SearchType>('text');
  const [textQuery, setTextQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchType === 'text' && textQuery.trim()) {
      onSearch(textQuery, 'text');
    } else if (searchType === 'image' && selectedFile) {
      onSearch(selectedFile.name, 'image', selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  return (
    <Card className="p-8 backdrop-blur-sm bg-white/80 shadow-xl border-0">
      <div className="space-y-6">
        {/* Search Type Toggle */}
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setSearchType('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                searchType === 'text'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search size={18} />
              Text Search
            </button>
            <button
              type="button"
              onClick={() => setSearchType('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                searchType === 'image'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Image size={18} />
              Image Search
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {searchType === 'text' ? (
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium text-gray-700">
                Search for a product
              </label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  value={textQuery}
                  onChange={(e) => setTextQuery(e.target.value)}
                  placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24, MacBook Pro..."
                  className="h-12 pr-12 text-lg"
                  disabled={isLoading}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload product image
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : selectedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
                
                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <Image className="text-green-600" size={32} />
                    </div>
                    <p className="text-green-700 font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-green-600">Image ready for search</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="text-gray-500" size={32} />
                    </div>
                    <p className="text-gray-700">Drop an image here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={
              isLoading ||
              (searchType === 'text' && !textQuery.trim()) ||
              (searchType === 'image' && !selectedFile)
            }
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            {isLoading ? 'Searching...' : 'Search Products'}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ProductSearch;
