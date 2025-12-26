import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Fondation", href: "/category" },
  { name: "Structure", href: "/category" },
  { name: "Expression", href: "/category" },
  { name: "Manifeste", href: "/" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Menu burger - Navigation cachée */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            <button className="p-2 color-transition hover:opacity-60" aria-label="Rechercher">
              <Search className="h-5 w-5" strokeWidth={1} />
            </button>
            <Link 
              to="/cart" 
              className="p-2 color-transition hover:opacity-60 relative"
              aria-label="Panier"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1} />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-foreground text-background text-[10px] flex items-center justify-center font-medium">
                1
              </span>
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
        </nav>
      </div>
    </header>
  );
}
