import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Package, Clock, RefreshCcw, Shield, MapPin } from "lucide-react";

const DeliveryPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Livraison & Retours
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
              Du premier clic à l'installation
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Nous prenons soin de vos pièces à chaque étape. 
              De nos ateliers jusqu'à votre intérieur.
            </p>
          </div>

          {/* Points clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: Truck,
                title: "Livraison offerte",
                description: "Dès 500 € d'achat en France métropolitaine",
              },
              {
                icon: RefreshCcw,
                title: "60 jours pour changer d'avis",
                description: "Retours gratuits, remboursement sous 5 jours",
              },
              {
                icon: Shield,
                title: "Installation incluse",
                description: "Pour toute commande supérieure à 2 000 €",
              },
            ].map((item, index) => (
              <div 
                key={item.title} 
                className="text-center p-8 border border-border animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="h-8 w-8 mx-auto mb-4" strokeWidth={1} />
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Délais de livraison */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <Clock className="h-6 w-6" strokeWidth={1} />
              <h2 className="font-serif text-2xl">Délais de livraison</h2>
            </div>
            
            <div className="border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-6 text-sm font-normal text-muted-foreground">Type de produit</th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-muted-foreground">Délai estimé</th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-muted-foreground hidden md:table-cell">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Objets décoratifs", delay: "5-10 jours", detail: "Vases, bougeoirs, petits objets" },
                    { type: "Luminaires", delay: "10-14 jours", detail: "Lampes, suspensions, appliques" },
                    { type: "Petits meubles en stock", delay: "14-21 jours", detail: "Tables basses, consoles, étagères" },
                    { type: "Assises modulaires", delay: "21-35 jours", detail: "Canapés, fauteuils, méridiennes" },
                    { type: "Grandes pièces sur mesure", delay: "42-56 jours", detail: "Tables Monolithe, configurations XL" },
                  ].map((row, i) => (
                    <tr key={row.type} className={i !== 4 ? "border-b border-border" : ""}>
                      <td className="py-4 px-6 text-sm">{row.type}</td>
                      <td className="py-4 px-6 text-sm font-medium">{row.delay}</td>
                      <td className="py-4 px-6 text-sm text-muted-foreground hidden md:table-cell">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              * Les délais sont indiqués en jours ouvrés à compter de la confirmation de commande. 
              Le délai exact est précisé sur chaque fiche produit.
            </p>
          </section>

          {/* Zones de livraison */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <MapPin className="h-6 w-6" strokeWidth={1} />
              <h2 className="font-serif text-2xl">Zones de livraison</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border p-6">
                <h3 className="font-serif text-lg mb-4">France métropolitaine</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Livraison standard offerte dès 500 €</li>
                  <li>• Livraison express disponible (+50 €)</li>
                  <li>• Installation à domicile offerte dès 2 000 €</li>
                  <li>• Créneaux de livraison sur rendez-vous</li>
                </ul>
              </div>
              <div className="border border-border p-6">
                <h3 className="font-serif text-lg mb-4">Europe & International</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• UE, Suisse, Royaume-Uni : frais calculés au panier</li>
                  <li>• Monaco, Andorre : tarifs France métropolitaine</li>
                  <li>• Autres destinations : devis sur demande</li>
                  <li>• Formalités douanières incluses (UE)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Processus d'installation */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <Package className="h-6 w-6" strokeWidth={1} />
              <h2 className="font-serif text-2xl">Notre processus d'installation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Prise de rendez-vous", description: "Nous vous contactons pour planifier une date qui vous convient." },
                { step: "02", title: "Livraison", description: "Nos équipes livrent vos pièces avec soin, dans leur emballage d'origine." },
                { step: "03", title: "Installation", description: "Montage complet, ajustements et mise en place selon vos souhaits." },
                { step: "04", title: "Évacuation", description: "Nous repartons avec tous les emballages pour un recyclage responsable." },
              ].map((item, index) => (
                <div key={item.step} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-4xl font-serif text-muted-foreground/30">{item.step}</span>
                  <h3 className="font-serif text-lg mt-2 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Politique de retour */}
          <section className="mb-24 bg-muted/30 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <RefreshCcw className="h-6 w-6" strokeWidth={1} />
              <h2 className="font-serif text-2xl">Politique de retour</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-lg mb-4">60 jours pour changer d'avis</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nous comprenons qu'une pièce doit se vivre. C'est pourquoi nous vous offrons 60 jours 
                  après réception pour retourner votre achat, sans justification.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Retour gratuit en France métropolitaine</li>
                  <li>✓ Remboursement sous 5 jours ouvrés</li>
                  <li>✓ Enlèvement à domicile pour les pièces volumineuses</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-4">Conditions</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pour être éligible au retour, le produit doit être dans son état d'origine : 
                  non utilisé, non endommagé, et si possible dans son emballage d'origine.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Les pièces sur mesure ne sont pas retournables</li>
                  <li>• Les échantillons de tissu ne sont pas retournables</li>
                  <li>• Les produits endommagés par le client ne sont pas remboursables</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h3 className="font-serif text-2xl mb-4">
              Une question sur la livraison ?
            </h3>
            <p className="text-muted-foreground mb-8">
              Notre équipe logistique est disponible pour vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Nous contacter</Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="lg">Consulter la FAQ</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryPage;
