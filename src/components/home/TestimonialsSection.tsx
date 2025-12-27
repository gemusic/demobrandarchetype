import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Isabelle Moreau",
    location: "Paris, 7ème",
    rating: 5,
    text: "Notre canapé Atlas XL a transformé notre salon. Après 3 ans d'utilisation quotidienne avec deux enfants, il est toujours aussi impeccable. La qualité des finitions est exceptionnelle.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    product: "Canapé Atlas XL",
  },
  {
    id: 2,
    name: "Jean-Pierre Durand",
    location: "Lyon",
    rating: 5,
    text: "J'ai travaillé avec des architectes d'intérieur pendant 20 ans. ARCHETYPES est la seule marque que je recommande systématiquement. Le rapport qualité-prix est imbattable pour ce niveau de craft.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    product: "Table Monolithe",
  },
  {
    id: 3,
    name: "Claire Fontaine",
    location: "Bordeaux",
    rating: 5,
    text: "La Lampe Aura a changé l'atmosphère de ma chambre. Cette lumière diffuse, ce papier washi... c'est une œuvre d'art fonctionnelle. Je contemple cette lampe chaque soir.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    product: "Lampe Aura",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-32 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Témoignages
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-4 tracking-tight">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 text-muted-foreground font-light max-w-xl mx-auto">
            Des intérieurs transformés, des histoires partagées
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-background p-8 border border-border hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/80 leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Product tag */}
              <p className="text-xs tracking-wider uppercase text-muted-foreground mb-6">
                À propos du {testimonial.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
