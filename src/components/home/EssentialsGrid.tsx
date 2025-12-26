import { Link } from "react-router-dom";

const essentials = [
  {
    id: 1,
    title: "Série Atlas",
    subtitle: "Collection",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Le Velours Fumé",
    subtitle: "Tissu",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Accoudoir C",
    subtitle: "Module",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Le Bureau Nomade",
    subtitle: "Aménagement",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Œuvres de V. Delannay",
    subtitle: "Artiste",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Matériaux Locaux",
    subtitle: "Engagement",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Le Canapé Modulo 3",
    subtitle: "Produit Phare",
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Guide de la Modularité",
    subtitle: "Guide",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
  },
];

export function EssentialsGrid() {
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
          {essentials.map((item, index) => (
            <Link
              key={item.id}
              to="/category"
              className="group relative aspect-[3/4] overflow-hidden hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-background/70 mb-1">
                  {item.subtitle}
                </p>
                <h3 className="font-serif text-sm md:text-lg text-background">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
