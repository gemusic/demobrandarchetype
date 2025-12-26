import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const ManifestePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        {/* Hero Manifeste */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-32">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Notre Manifeste
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mt-8">
            Nous croyons que le mobilier 
            <br />
            <span className="italic">raconte une histoire.</span>
          </h1>
          <p className="mt-12 text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Pas celle du designer. Pas celle de la marque. 
            La vôtre.
          </p>
        </section>

        {/* Section 1 - L'origine */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800"
                alt="Atelier de fabrication"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="lg:pl-8">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                01 — L'Origine
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-snug">
                Nous avons commencé par une question simple
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Pourquoi les meubles sont-ils conçus pour être remplacés ? Pourquoi cette course à la nouveauté quand la vraie beauté réside dans ce qui dure ?
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                ARCHETYPES est né de cette interrogation. En 2018, nous avons décidé de prendre le contre-pied de l'industrie : créer des pièces qui se bonifieraient avec le temps, pas des produits à consommer puis à jeter.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Nos fondateurs — un architecte, une designer textile, un ébéniste — ont uni leurs savoir-faire autour d'une conviction partagée : le beau et le durable ne sont pas antinomiques. Ils sont indissociables.
              </p>
            </div>
          </div>
        </section>

        {/* Citation centrale */}
        <section className="bg-muted/30 py-32 mb-40">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="font-serif text-2xl md:text-4xl italic leading-relaxed">
              "L'archétype n'est pas un style. C'est ce qui reste quand on a enlevé le superflu, 
              quand la forme épouse parfaitement la fonction, quand le temps ne peut rien altérer de l'essentiel."
            </blockquote>
            <cite className="mt-8 block text-sm text-muted-foreground not-italic">
              — Clara Dubois, Co-fondatrice & Directrice Artistique
            </cite>
          </div>
        </section>

        {/* Section 2 - Notre approche */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 lg:pr-8">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                02 — Notre Approche
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-snug">
                Nous ne fabriquons pas des meubles. Nous créons des héritages.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Chaque pièce ARCHETYPES est pensée pour traverser les générations. Cela commence par le choix des matériaux : bois certifiés FSC, mousses haute densité, tissus sélectionnés pour leur résistance autant que leur beauté.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Nos ateliers partenaires, en Italie et au Portugal, perpétuent des savoir-faire centenaires. Nous travaillons exclusivement avec des artisans qui partagent notre obsession de la qualité.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Le résultat ? Des pièces garanties 10 à 25 ans, qui coûtent moins cher à l'usage que n'importe quel meuble "accessible" qu'il faudra remplacer dans cinq ans.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800"
                alt="Détail de fabrication artisanale"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Valeurs - 4 colonnes */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              03 — Nos Principes
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4">
              Quatre piliers. Aucun compromis.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                number: "01",
                title: "Durabilité",
                description: "Nos pièces sont conçues pour durer des décennies. Garantie 10 à 25 ans selon les collections.",
              },
              {
                number: "02",
                title: "Traçabilité",
                description: "Chaque matériau est sourcé de manière éthique. Nous connaissons l'origine de chaque vis, chaque fibre.",
              },
              {
                number: "03",
                title: "Modularité",
                description: "Vos besoins évoluent, vos meubles aussi. Nos systèmes s'adaptent à chaque étape de votre vie.",
              },
              {
                number: "04",
                title: "Intemporalité",
                description: "Nous ne suivons pas les tendances. Nous créons des formes qui transcendent les modes.",
              },
            ].map((value, index) => (
              <div key={value.number} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="text-4xl font-serif text-muted-foreground/30">
                  {value.number}
                </span>
                <h3 className="font-serif text-xl mt-4 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - L'équipe */}
        <section className="max-w-6xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800"
                alt="L'équipe ARCHETYPES"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="lg:pl-8">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                04 — L'Équipe
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mt-4 leading-snug">
                Une famille de passionnés
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                ARCHETYPES, c'est aujourd'hui une équipe de 23 personnes réparties entre Paris, Porto et Milan. Designers, artisans, logisticiens, conseillers clients — tous partagent la même exigence.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Nous travaillons avec un réseau de 12 ateliers partenaires, sélectionnés pour leur excellence et leur engagement environnemental. Certains nous accompagnent depuis le premier jour.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ensemble, nous avons déjà équipé plus de 8 000 foyers en Europe. Et nous espérons que ces pièces seront encore là dans cinquante ans.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">
            Prêt à investir dans des pièces qui durent ?
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Découvrez nos collections et trouvez les pièces qui vous accompagneront pour les décennies à venir.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/category/fondation">
              <Button size="lg">Explorer les Collections</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Nous Contacter</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ManifestePage;
