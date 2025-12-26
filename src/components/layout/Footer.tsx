import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo et philosophie */}
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-lg tracking-[0.2em] uppercase">
              Archetypes
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              L'archétype n'est pas une forme. C'est l'essence de la forme. 
              Nous créons des pièces qui transcendent le temps.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category" className="color-transition hover:opacity-60">Fondation</Link></li>
              <li><Link to="/category" className="color-transition hover:opacity-60">Structure</Link></li>
              <li><Link to="/category" className="color-transition hover:opacity-60">Expression</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="color-transition hover:opacity-60">Contact</Link></li>
              <li><Link to="/" className="color-transition hover:opacity-60">FAQ</Link></li>
              <li><Link to="/" className="color-transition hover:opacity-60">Livraison</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Archetypes. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground">
            Fabriqué en Europe avec intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
