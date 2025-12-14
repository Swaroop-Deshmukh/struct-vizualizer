import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, Search } from "lucide-react";

interface LocationResult {
  lat: number;
  lng: number;
  address: string;
  display_name: string;
}

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: LocationResult) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function LocationSearch({
  value,
  onChange,
  onSelect,
  placeholder = "Search for a location...",
  icon,
  className = "",
}: LocationSearchProps) {
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchLocations = async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      
      const formattedResults: LocationResult[] = data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        address: item.display_name,
        display_name: item.display_name,
      }));
      
      setResults(formattedResults);
      setShowResults(true);
    } catch (error) {
      console.error("Location search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Debounce the API call
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchLocations(newValue);
    }, 300);
  };

  const handleSelectLocation = (location: LocationResult) => {
    onChange(location.display_name);
    onSelect(location);
    setShowResults(false);
    setResults([]);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon || <Search className="h-4 w-4 text-muted-foreground" />}
        </div>
        <Input
          value={value}
          onChange={handleInputChange}
          onFocus={() => results.length > 0 && setShowResults(true)}
          className="pl-10 pr-10 h-14 text-base bg-secondary/50 border-0"
          placeholder={placeholder}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(result)}
              className="w-full px-4 py-3 text-left hover:bg-secondary/50 flex items-start gap-3 border-b border-border last:border-0 transition-colors"
            >
              <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <span className="text-sm text-foreground line-clamp-2">
                {result.display_name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
