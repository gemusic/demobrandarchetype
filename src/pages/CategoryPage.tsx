import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AiNudge } from "@/components/ai/AiNudge";
import { cn } from "@/lib/utils";

const filters = {
  type: {
    label: "Architecture de l'Assise",
    options: ["Sectionnel", "Profond", "Lounge", "Élévation", "Compact", "Grand Format"],
  },
  composition: {
    label: "L'Essence Structurelle",
    options: ["Hévéa", "Noyer Américain", "Métal Lourd", "Composite A1"],
  },
  revetement: {
    label: "La Peau Sensorielle",
    options: ["Velours Fumé", "Lin Brut", "Laine Mélangée T7", "Cuir Pleine Fleur", "Coton Organique", "Microfibre S2", "Tweed Écossais", "Alcantara"],
  },
  modularite: {
    label: "Point d'Accrochage",
    options: ["Simple", "Double", "Axiale"],
  },
  budget: {
    label: "Intention Financière",
    options: ["2 000 € - 4 000 €", "4 000 € - 6 000 €", "6 000 € - 10 000 €", "10 000 € +"],
  },
};

const products = [
  { id: 1, name: "Module Sectionnel Hévéa Alpha-V", price: 3450, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800" },
  { id: 2, name: "Module Sectionnel Bêta-V", price: 3890, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800" },
  { id: 3, name: "Assise Profonde Noyer T2", price: 4250, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800" },
  { id: 4, name: "Lounge Élévation Métal L", price: 5670, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800" },
  { id: 5, name: "Module Compact Hévéa C1", price: 2190, image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800" },
  { id: 6, name: "Grand Format Atlas XL", price: 7890, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800" },
  { id: 7, name: "Sectionnel Double Axiale", price: 6340, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?q=80&w=800" },
  { id: 8, name: "Module Lin Brut Omega", price: 3120, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800" },
  { id: 9, name: "Assise Cuir Pleine Fleur", price: 8450, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800" },
  { id: 10, name: "Lounge Velours Fumé Delta", price: 4890, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800" },
  { id: 11, name: "Module Tweed Écossais", price: 3670, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800" },
  { id: 12, name: "Compact Microfibre S2", price: 2890, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800" },
];

const CategoryPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showAiNudge, setShowAiNudge] = useState(false);
  const [filterInteractions, setFilterInteractions] = useState(0);

  // Détection de friction : après 3 interactions avec les filtres
  useEffect(() => {
    if (filterInteractions >= 3 && !showAiNudge) {
      const timer = setTimeout(() => setShowAiNudge(true), 500);
      return () => clearTimeout(timer);
    }
  }, [filterInteractions, showAiNudge]);

  const toggleFilter = (category: string, option: string) => {
    setFilterInteractions(prev => prev + 1);
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option];
      return { ...prev, [category]: updated };
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Titre */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
              Fondation : Les Assises Modulaires
            </h1>
            <p className="mt-4 text-muted-foreground font-light">
              Explorer les 32 archétypes d'assises disponibles. Filtrer par essence, intention et modularité.
            </p>
          </div>

          {/* Barre de filtres */}
          <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm uppercase tracking-wider color-transition hover:opacity-60"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtrer / Trier
              <ChevronDown className={cn("h-4 w-4 transition-transform", isFilterOpen && "rotate-180")} />
            </button>
            <span className="text-sm text-muted-foreground">
              {products.length} pièces
            </span>
          </div>

          {/* Panneau de filtres */}
          <div className={cn(
            "overflow-hidden transition-all duration-500",
            isFilterOpen ? "max-h-[600px] opacity-100 mb-8" : "max-h-0 opacity-0"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-6 border-b border-border">
              {Object.entries(filters).map(([key, { label, options }]) => (
                <div key={key}>
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    {label}
                  </h4>
                  <div className="space-y-2">
                    {options.map(option => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm cursor-pointer color-transition hover:opacity-60"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters[key]?.includes(option) || false}
                          onChange={() => toggleFilter(key, option)}
                          className="w-4 h-4 border-foreground/30 accent-foreground"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Nudge - Clarification des filtres */}
            {showAiNudge && (
              <AiNudge
                title="Analyse Cognitive : Clarification Structurelle"
                ctaText="Afficher Garantie > 10 ans"
                onCtaClick={() => {
                  toggleFilter("composition", "Hévéa");
                  setShowAiNudge(false);
                }}
                className="mt-6"
              >
                <p>
                  Vous examinez la composition et le revêtement. Pour les Assises, 
                  la <strong>Composition (Hévéa)</strong> détermine la durée de vie (&gt;15 ans), 
                  tandis que le <strong>Revêtement (Velours)</strong> affecte la garantie (5 ans).
                </p>
              </AiNudge>
            )}
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-sm md:text-base leading-snug group-hover:opacity-60 color-transition">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  À partir de {product.price.toLocaleString('fr-FR')} €
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
