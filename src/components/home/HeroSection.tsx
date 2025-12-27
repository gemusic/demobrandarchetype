import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-interior.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Image de fond - Pièce décorée avec plusieurs meubles */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background"
        />
        <img
          src={heroImage}
          alt="Intérieur luxueux avec mobilier contemporain modulaire ARCHETYPES"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight animate-fade-in">
          L'Archétype n'est pas une forme.
          <br />
          <span className="italic">C'est l'essence de la forme.</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-foreground/80 font-light max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Explorez nos collections. Des milliers de combinaisons modulaires 
          pour construire l'espace qui révèle votre intention.
        </p>

        <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Link to="/category">
            <Button variant="hero" size="xl">
              Découvrir nos Collections
            </Button>
          </Link>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-foreground/20" />
      </div>
    </section>
  );
}
