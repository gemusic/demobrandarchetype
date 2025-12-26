import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Logo et philosophie */}
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-lg tracking-[0.2em] uppercase">
              Archetypes
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Des pièces conçues pour durer des décennies. 
              Fabriquées en Europe par des artisans qui partagent notre exigence.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/fondation" className="color-transition hover:opacity-60">Fondation</Link></li>
              <li><Link to="/category/structure" className="color-transition hover:opacity-60">Structure</Link></li>
              <li><Link to="/category/expression" className="color-transition hover:opacity-60">Expression</Link></li>
              <li><Link to="/manifeste" className="color-transition hover:opacity-60">Manifeste</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="color-transition hover:opacity-60">Contact</Link></li>
              <li><Link to="/faq" className="color-transition hover:opacity-60">FAQ</Link></li>
              <li><Link to="/livraison" className="color-transition hover:opacity-60">Livraison & Retours</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>bonjour@archetypes.fr</li>
              <li>+33 1 42 56 78 90</li>
              <li className="pt-2">
                12 Rue du Faubourg<br />
                Saint-Antoine<br />
                75012 Paris
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Archetypes. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>Paiement sécurisé</span>
            <span>•</span>
            <span>Livraison Europe</span>
            <span>•</span>
            <span>Retours 60 jours</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
