import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { LRUCache } from '../utils/lruCache';

const dummyData = [
  { "id": 1, "name": "React Query" },
  { "id": 2, "name": "React Hooks" },
  { "id": 3, "name": "React Router" },
  { "id": 4, "name": "React State Management" },
  { "id": 5, "name": "React Performance Optimization" },
  { "id": 6, "name": "React Tutorial" },
  { "id": 7, "name": "React Best Practices" },
  { "id": 8, "name": "React vs Vue" },
  { "id": 9, "name": "React Interview Questions" },
  { "id": 10, "name": "React Roadmap" },
  { "id": 11, "name": "Next.js Server Components" },
  { "id": 12, "name": "Next.js API Routes" },
  { "id": 13, "name": "Next.js Middleware" },
  { "id": 14, "name": "Next.js Authentication" },
  { "id": 15, "name": "Next.js Performance Optimization" },
  { "id": 16, "name": "Next.js Tutorial" },
  { "id": 17, "name": "Next.js vs React" },
  { "id": 18, "name": "Next.js SEO Best Practices" },
  { "id": 19, "name": "Next.js Roadmap" },
  { "id": 20, "name": "Next.js Interview Questions" },
  { "id": 21, "name": "TypeScript Basics" },
  { "id": 22, "name": "TypeScript Interfaces" },
  { "id": 23, "name": "TypeScript Generics" },
  { "id": 24, "name": "TypeScript Utility Types" },
  { "id": 25, "name": "TypeScript vs JavaScript" },
  { "id": 26, "name": "TypeScript Tutorial" },
  { "id": 27, "name": "TypeScript Best Practices" },
  { "id": 28, "name": "TypeScript Roadmap" },
  { "id": 29, "name": "TypeScript Interview Questions" },
  { "id": 30, "name": "TypeScript Performance Optimization" },
  { "id": 31, "name": "Node.js Streams" },
  { "id": 32, "name": "Node.js Event Loop" },
  { "id": 33, "name": "Node.js File System" },
  { "id": 34, "name": "Node.js Authentication" },
  { "id": 35, "name": "Node.js WebSockets" },
  { "id": 36, "name": "Node.js Tutorial" },
  { "id": 37, "name": "Node.js Best Practices" },
  { "id": 38, "name": "Node.js vs Deno" },
  { "id": 39, "name": "Node.js Performance Optimization" },
  { "id": 40, "name": "Node.js Interview Questions" },
  { "id": 41, "name": "Redux Toolkit" },
  { "id": 42, "name": "Redux Middleware" },
  { "id": 43, "name": "Redux Thunk" },
  { "id": 44, "name": "Redux Saga" },
  { "id": 45, "name": "Redux vs Context API" },
  { "id": 46, "name": "Redux Tutorial" },
  { "id": 47, "name": "Redux Best Practices" },
  { "id": 48, "name": "Redux Performance Optimization" },
  { "id": 49, "name": "Redux Interview Questions" },
  { "id": 50, "name": "Redux Roadmap" },
  { "id": 51, "name": "Tailwind CSS Grid" },
  { "id": 52, "name": "Tailwind CSS Flexbox" },
  { "id": 53, "name": "Tailwind CSS Animations" },
  { "id": 54, "name": "Tailwind CSS Responsive Design" },
  { "id": 55, "name": "Tailwind CSS Dark Mode" },
  { "id": 56, "name": "Tailwind CSS Tutorial" },
  { "id": 57, "name": "Tailwind CSS Best Practices" },
  { "id": 58, "name": "Tailwind CSS vs Bootstrap" },
  { "id": 59, "name": "Tailwind CSS Performance Optimization" },
  { "id": 60, "name": "Tailwind CSS Interview Questions" }
];

interface DataItem {
  id: number;
  name: string;
}

interface SearchResult {
  item: DataItem;
  highlightedName: React.ReactNode;
}

const searchCache = new LRUCache<string, SearchResult[]>(10);

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearchTerm = useDebounce(inputValue, 300);

  const highlightMatch = (name: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm.trim()) return name;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = name.split(regex);
    return parts.map((part, index) =>
      regex.test(part)
        ? <strong key={index} className="font-bold text-blue-700">{part}</strong>
        : part
    );
  };

  const filterData = (searchTerm: string): SearchResult[] => {
    if (!searchTerm.trim()) return [];
    const cachedResults = searchCache.get(searchTerm.toLowerCase());
    if (cachedResults) return cachedResults;

    const filtered = dummyData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const searchResults = filtered.map(item => ({
      item,
      highlightedName: highlightMatch(item.name, searchTerm)
    }));

    searchCache.set(searchTerm.toLowerCase(), searchResults);
    return searchResults;
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchResults = filterData(debouncedSearchTerm);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (results.length > 0 || inputValue.trim()) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const clearSearch = () => {
    setInputValue('');
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (item: DataItem) => {
    setInputValue(item.name);
    setIsOpen(false);
    console.log('Selected:', item);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative bg-white rounded-lg shadow-lg transition-all duration-200 ${
        isFocused ? 'shadow-xl ring-2 ring-blue-500 ring-opacity-50' : 'shadow-md'
      }`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
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
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Results */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map(result => (
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
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              No results found for "{debouncedSearchTerm}"
            </div>
          )}
        </div>
      )}

      {/* Info */}
      {results.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{debouncedSearchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchInput;
