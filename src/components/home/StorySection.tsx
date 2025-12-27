import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden animate-slide-up">
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1200&auto=format&fit=crop"
              alt="Atelier ARCHETYPES - Artisan travaillant le bois"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="lg:pl-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Notre Histoire
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-4 tracking-tight leading-tight">
              L'excellence artisanale,
              <br />
              <span className="italic">réinventée</span>
            </h2>
            
            <div className="mt-8 space-y-6 text-foreground/70 leading-relaxed">
              <p>
                ARCHETYPES est né d'une conviction : le mobilier contemporain 
                peut allier exigence esthétique, durabilité et accessibilité.
              </p>
              <p>
                Nos pièces sont conçues à Paris et fabriquées par des ateliers 
                familiaux au Portugal et en Italie. Chaque meuble porte la 
                signature de son artisan et une garantie de 10 à 25 ans.
              </p>
              <p>
                Nous refusons l'obsolescence programmée. Nos tissus sont 
                déhoussables, nos pièces réparables, nos bois issus de forêts 
                gérées durablement.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-center">
              <div>
                <p className="font-serif text-4xl">15+</p>
                <p className="text-xs tracking-wider uppercase text-muted-foreground mt-1">
                  Années de garantie
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl">12</p>
                <p className="text-xs tracking-wider uppercase text-muted-foreground mt-1">
                  Ateliers partenaires
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl">98%</p>
                <p className="text-xs tracking-wider uppercase text-muted-foreground mt-1">
                  Clients satisfaits
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link to="/manifeste">
                <Button variant="outline" size="lg" className="group">
                  Découvrir notre manifeste
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
