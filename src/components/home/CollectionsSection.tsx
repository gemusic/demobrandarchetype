import { Link } from "react-router-dom";
import { collections } from "@/data/collections";

export function CollectionsSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Nos univers
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight mt-4">
            Trois collections. Une vision.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/category/${collection.id}`}
              className="group relative aspect-[3/4] overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs tracking-[0.2em] uppercase text-background/60">
                  {collection.productCount} pièces
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-background mt-2">
                  {collection.name}
                </h3>
                <p className="text-sm text-background/80 mt-2 max-w-xs">
                  {collection.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
