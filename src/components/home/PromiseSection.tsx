export function PromiseSection() {
  const promises = [
    {
      title: "Qualité Artisanale",
      description: "Fabriqué en Europe, respect des traditions.",
    },
    {
      title: "Modularité Intuitive",
      description: "Un système conçu pour grandir avec votre espace.",
    },
    {
      title: "Expédition Sécurisée",
      description: "Livraison et installation professionnelles.",
    },
  ];

  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
            Notre Promesse
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {promises.map((promise, index) => (
            <div 
              key={promise.title}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="font-serif text-xl mb-3">
                {promise.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
