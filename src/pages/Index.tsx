
import SearchInput from '../components/SearchInput';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">SearchPro</h1>
          <p className="text-gray-600 text-lg">Advanced search with intelligent caching</p>
        </div>
        <SearchInput />
      </div>
    </div>
  );
};

export default Index;
