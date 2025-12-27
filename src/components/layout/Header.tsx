import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { searchProducts, Product } from "@/data/products";

const navigation = [
  { name: "Fondation", href: "/category/fondation" },
  { name: "Structure", href: "/category/structure" },
  { name: "Expression", href: "/category/expression" },
  { name: "Manifeste", href: "/manifeste" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchProducts(searchQuery);
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length >= 2) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Menu burger */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsSearchOpen(false);
            }}
            className="p-2 -ml-2 color-transition hover:opacity-60"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1} />
            )}
          </button>

          {/* Logo central */}
          <Link 
            to="/" 
            className="absolute left-1/2 -translate-x-1/2 font-serif text-xl tracking-[0.2em] uppercase"
          >
            Archetypes
          </Link>

          {/* Actions droite */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMenuOpen(false);
              }}
              className="p-2 color-transition hover:opacity-60" 
              aria-label="Rechercher"
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" strokeWidth={1} />
              ) : (
                <Search className="h-5 w-5" strokeWidth={1} />
              )}
            </button>
            <Link 
              to="/cart" 
              className="p-2 color-transition hover:opacity-60 relative"
              aria-label="Panier"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-foreground text-background text-[10px] flex items-center justify-center font-medium">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menu déroulant */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-background border-b border-border overflow-hidden transition-all duration-500 ease-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <ul className="space-y-4">
            {navigation.map((item, index) => (
              <li 
                key={item.name}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block font-serif text-2xl tracking-wide color-transition hover:opacity-60",
                    location.pathname === item.href && "opacity-60"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Secondary links */}
          <div className="mt-8 pt-8 border-t border-border">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground color-transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground color-transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="text-sm text-muted-foreground hover:text-foreground color-transition">
                  Livraison
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-background border-b border-border overflow-hidden transition-all duration-500 ease-out",
          isSearchOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <form onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, une collection..."
              className="w-full bg-transparent border-b border-foreground py-4 text-xl font-light focus:outline-none placeholder:text-muted-foreground"
            />
          </form>

          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="mt-6 space-y-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Suggestions
              </p>
              <ul className="space-y-3">
                {searchResults.map(product => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center gap-4 group"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-12 h-12 object-cover bg-accent/30"
                      />
                      <div>
                        <p className="font-serif group-hover:opacity-60 color-transition">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.price.toLocaleString('fr-FR')} €
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick links */}
          {searchQuery.length === 0 && (
            <div className="mt-8 space-y-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Collections
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/category/fondation" 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-sm border border-border px-4 py-2 hover:bg-accent color-transition"
                >
                  Fondation
                </Link>
                <Link 
                  to="/category/structure" 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-sm border border-border px-4 py-2 hover:bg-accent color-transition"
                >
                  Structure
                </Link>
                <Link 
                  to="/category/expression" 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-sm border border-border px-4 py-2 hover:bg-accent color-transition"
                >
                  Expression
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
