import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AiNudge } from "@/components/ai/AiNudge";
import { cn } from "@/lib/utils";
import { products, getProductsByCollection, Product } from "@/data/products";
import { getCollectionById, collections } from "@/data/collections";

const filters = {
  type: {
    label: "Architecture de l'Assise",
    options: ["Canapé", "Fauteuil", "Méridienne", "Pouf", "Banquette", "Table", "Bureau", "Luminaire"],
  },
  material: {
    label: "L'Essence Structurelle",
    options: ["Hévéa", "Noyer", "Chêne", "Frêne", "Marbre", "Verre", "Laiton"],
  },
  revetement: {
    label: "La Peau Sensorielle",
    options: ["Velours", "Lin", "Cuir", "Laine", "Coton Bio"],
  },
  budget: {
    label: "Intention Financière",
    options: ["Moins de 1 000 €", "1 000 € - 3 000 €", "3 000 € - 5 000 €", "Plus de 5 000 €"],
  },
};

const CategoryPage = () => {
  const { collection } = useParams<{ collection?: string }>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showAiNudge, setShowAiNudge] = useState(false);
  const [filterInteractions, setFilterInteractions] = useState(0);

  const currentCollection = collection as Product['collection'] | undefined;
  const collectionData = currentCollection ? getCollectionById(currentCollection) : null;

  // Get products based on collection or all products
  const baseProducts = useMemo(() => {
    if (currentCollection) {
      return getProductsByCollection(currentCollection);
    }
    return products;
  }, [currentCollection]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Filter by category/type
    if (selectedFilters.type?.length > 0) {
      result = result.filter(p => 
        selectedFilters.type.some(type => 
          p.category.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Filter by budget
    if (selectedFilters.budget?.length > 0) {
      result = result.filter(p => {
        return selectedFilters.budget.some(budget => {
          if (budget === "Moins de 1 000 €") return p.price < 1000;
          if (budget === "1 000 € - 3 000 €") return p.price >= 1000 && p.price < 3000;
          if (budget === "3 000 € - 5 000 €") return p.price >= 3000 && p.price < 5000;
          if (budget === "Plus de 5 000 €") return p.price >= 5000;
          return true;
        });
      });
    }

    return result;
  }, [baseProducts, selectedFilters]);

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

  const pageTitle = collectionData 
    ? `${collectionData.name} : ${collectionData.tagline}`
    : "Toutes les Collections";

  const pageDescription = collectionData
    ? collectionData.description
    : "Explorer l'ensemble de nos créations. Chaque pièce est le fruit d'un savoir-faire artisanal et d'une vision design exigeante.";

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Collection Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 mb-12">
            <Link
              to="/category"
              className={cn(
                "text-sm uppercase tracking-wider color-transition hover:opacity-60",
                !currentCollection && "border-b border-foreground"
              )}
            >
              Tout Voir
            </Link>
            {collections.map(col => (
              <Link
                key={col.id}
                to={`/category/${col.id}`}
                className={cn(
                  "text-sm uppercase tracking-wider color-transition hover:opacity-60",
                  currentCollection === col.id && "border-b border-foreground"
                )}
              >
                {col.name}
              </Link>
            ))}
          </nav>

          {/* Titre */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
              {pageTitle}
            </h1>
            <p className="mt-4 text-muted-foreground font-light max-w-2xl mx-auto">
              {pageDescription}
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
              {filteredProducts.length} pièce{filteredProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Panneau de filtres */}
          <div className={cn(
            "overflow-hidden transition-all duration-500",
            isFilterOpen ? "max-h-[600px] opacity-100 mb-8" : "max-h-0 opacity-0"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-6 border-b border-border">
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
                  toggleFilter("material", "Hévéa");
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
            {filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden mb-4 bg-accent/30">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.featured && (
                    <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] uppercase tracking-wider px-2 py-1">
                      Signature
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-sm md:text-base leading-snug group-hover:opacity-60 color-transition">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  À partir de {product.price.toLocaleString('fr-FR')} €
                </p>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Aucun produit ne correspond à vos critères.</p>
              <button
                onClick={() => setSelectedFilters({})}
                className="mt-4 text-sm underline hover:no-underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
