import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";

export function EssentialsGrid() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
            Les Essentiels de la Saison
          </h2>
          <p className="mt-4 text-muted-foreground font-light">
            Huit portes d'entrée vers l'excellence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group relative aspect-[3/4] overflow-hidden hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-background/70 mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-sm md:text-lg text-background">
                  {product.name}
                </h3>
                <p className="text-xs text-background/60 mt-1">
                  {product.price.toLocaleString('fr-FR')} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
