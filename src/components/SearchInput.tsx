
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { LRUCache } from '../utils/lruCache';

// Dummy data as specified
const dummyData = [
  {"id":1,"name":"React Query"},
  {"id":2,"name":"React Hooks"},
  {"id":3,"name":"React Router"},
  {"id":4,"name":"React State Management"},
  {"id":5,"name":"React Performance Optimization"},
  {"id":6,"name":"React Tutorial"},
  {"id":7,"name":"React Best Practices"},
  {"id":8,"name":"React vs Vue"},
  {"id":9,"name":"React Interview Questions"},
  {"id":10,"name":"React Roadmap"},
  {"id":11,"name":"Next.js Server Components"},
  {"id":12,"name":"Next.js API Routes"},
  {"id":13,"name":"Next.js Middleware"},
  {"id":14,"name":"Next.js Authentication"},
  {"id":15,"name":"Next.js Performance Optimization"},
  {"id":16,"name":"Next.js Tutorial"},
  {"id":17,"name":"Next.js vs React"},
  {"id":18,"name":"Next.js SEO Best Practices"},
  {"id":19,"name":"Next.js Roadmap"},
  {"id":20,"name":"Next.js Interview Questions"},
  {"id":21,"name":"TypeScript Basics"},
  {"id":22,"name":"TypeScript Interfaces"},
  {"id":23,"name":"TypeScript Generics"},
  {"id":24,"name":"TypeScript Utility Types"},
  {"id":25,"name":"TypeScript vs JavaScript"},
  {"id":26,"name":"TypeScript Tutorial"},
  {"id":27,"name":"TypeScript Best Practices"},
  {"id":28,"name":"TypeScript Roadmap"},
  {"id":29,"name":"TypeScript Interview Questions"},
  {"id":30,"name":"TypeScript Performance Optimization"},
  {"id":31,"name":"Node.js Streams"},
  {"id":32,"name":"Node.js Event Loop"},
  {"id":33,"name":"Node.js File System"},
  {"id":34,"name":"Node.js Authentication"},
  {"id":35,"name":"Node.js WebSockets"},
  {"id":36,"name":"Node.js Tutorial"},
  {"id":37,"name":"Node.js Best Practices"},
  {"id":38,"name":"Node.js vs Deno"},
  {"id":39,"name":"Node.js Performance Optimization"},
  {"id":40,"name":"Node.js Interview Questions"},
  {"id":41,"name":"Redux Toolkit"},
  {"id":42,"name":"Redux Middleware"},
  {"id":43,"name":"Redux Thunk"},
  {"id":44,"name":"Redux Saga"},
  {"id":45,"name":"Redux vs Context API"},
  {"id":46,"name":"Redux Tutorial"},
  {"id":47,"name":"Redux Best Practices"},
  {"id":48,"name":"Redux Performance Optimization"},
  {"id":49,"name":"Redux Interview Questions"},
  {"id":50,"name":"Redux Roadmap"},
  {"id":51,"name":"Tailwind CSS Grid"},
  {"id":52,"name":"Tailwind CSS Flexbox"},
  {"id":53,"name":"Tailwind CSS Animations"},
  {"id":54,"name":"Tailwind CSS Responsive Design"},
  {"id":55,"name":"Tailwind CSS Dark Mode"},
  {"id":56,"name":"Tailwind CSS Tutorial"},
  {"id":57,"name":"Tailwind CSS Best Practices"},
  {"id":58,"name":"Tailwind CSS vs Bootstrap"},
  {"id":59,"name":"Tailwind CSS Performance Optimization"},
  {"id":60,"name":"Tailwind CSS Interview Questions"}
];

// Type definitions
interface DataItem {
  id: number;
  name: string;
}

interface SearchResult {
  item: DataItem;
  highlightedName: React.ReactNode;
}

// Initialize LRU cache with capacity of 10
const searchCache = new LRUCache<string, SearchResult[]>(10);

const SearchInput: React.FC = () => {
  // State management
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce the input value by 300ms for performance optimization
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  /**
   * Highlights matching substrings in the name with bold text
   * @param name - The original name string
   * @param searchTerm - The term to highlight
   * @returns React element with highlighted text
   */
  const highlightMatch = (name: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm.trim()) return name;

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = name.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return <strong key={index} className="font-bold text-blue-700">{part}</strong>;
      }
      return part;
    });
  };

  /**
   * Filters data based on search term with case-insensitive substring matching
   * @param searchTerm - The term to search for
   * @returns Array of search results with highlighted names
   */
  const filterData = (searchTerm: string): SearchResult[] => {
    if (!searchTerm.trim()) return [];

    // Check cache first for performance optimization
    const cachedResults = searchCache.get(searchTerm.toLowerCase());
    if (cachedResults) {
      console.log('Using cached results for:', searchTerm);
      return cachedResults;
    }

    // Filter data: case-insensitive substring matching
    const filtered = dummyData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Create search results with highlighted names
    const searchResults: SearchResult[] = filtered.map(item => ({
      item,
      highlightedName: highlightMatch(item.name, searchTerm)
    }));

    // Cache the results for future use
    searchCache.set(searchTerm.toLowerCase(), searchResults);
    console.log('Cached new results for:', searchTerm);

    return searchResults;
  };

  // Effect to handle debounced search
  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchResults = filterData(debouncedSearchTerm);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedSearchTerm]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle input blur with delay to allow clicking on results
  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Clear search input
  const clearSearch = () => {
    setInputValue('');
    setResults([]);
    setIsOpen(false);
  };

  // Handle result item selection
  const handleResultClick = (item: DataItem) => {
    setInputValue(item.name);
    setIsOpen(false);
    console.log('Selected:', item);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Container */}
      <div className={`relative bg-white rounded-lg shadow-lg transition-all duration-200 ${
        isFocused ? 'shadow-xl ring-2 ring-blue-500 ring-opacity-50' : 'shadow-md'
      }`}>
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for tutorials, guides, and more..."
          className="w-full pl-12 pr-12 py-4 text-lg border-0 rounded-lg focus:outline-none focus:ring-0 placeholder-gray-400"
          autoComplete="off"
        />

        {/* Clear Button */}
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.item.id}
              onClick={() => handleResultClick(result.item)}
              className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 flex items-center space-x-3"
            >
              <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                {result.highlightedName}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && debouncedSearchTerm && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 px-4 py-6 text-center">
          <p className="text-gray-500">No results found for "{debouncedSearchTerm}"</p>
        </div>
      )}

      {/* Search Info */}
      {results.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{debouncedSearchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchInput;
