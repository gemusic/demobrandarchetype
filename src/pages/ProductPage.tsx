import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AiNudge } from "@/components/ai/AiNudge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const productData = {
  name: "Module Sectionnel Hévéa Alpha-V",
  subtitle: "Velours Fumé",
  price: 3450,
  images: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=1200",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200",
    "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200",
  ],
  tissus: ["Velours Fumé", "Lin Brut", "Cuir Pleine Fleur", "Laine Mélangée"],
  couleurs: ["Anthracite", "Sable", "Forêt", "Océan"],
  orientations: ["Gauche", "Droite"],
  description: `L'archétype de l'assise contemporaine. Le Module Sectionnel Hévéa Alpha-V incarne notre vision d'un confort sans compromis, où chaque courbe est le fruit d'une réflexion profonde sur la posture humaine et l'harmonie spatiale.

  Notre hévéa, issu de forêts gérées durablement, offre une structure d'une légèreté surprenante alliée à une robustesse exemplaire. Le velours fumé, tissé dans les ateliers de la vallée de la Loire, capture la lumière avec une subtilité qui évolue au fil des heures.`,
  specs: [
    { label: "Dimensions", value: "L210 x P105 x H70 cm" },
    { label: "Poids", value: "78 kg" },
    { label: "Densité mousse", value: "T45 Haute Résilience" },
    { label: "Certification", value: "CEE A-18" },
    { label: "Traitement", value: "Hydrophobe DWR" },
  ],
};

const ProductPage = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTissu, setSelectedTissu] = useState(productData.tissus[0]);
  const [selectedCouleur, setSelectedCouleur] = useState(productData.couleurs[0]);
  const [selectedOrientation, setSelectedOrientation] = useState(productData.orientations[0]);
  
  const [showPriceNudge, setShowPriceNudge] = useState(false);
  const [showSizeNudge, setShowSizeNudge] = useState(false);
  const [priceHoverTime, setPriceHoverTime] = useState(0);

  // Détection : temps passé sur le prix
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHoverTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (priceHoverTime > 8 && !showPriceNudge) {
      setShowPriceNudge(true);
    }
  }, [priceHoverTime, showPriceNudge]);

  const handleAddToCart = () => {
    toast.success("Ajouté à votre intention", {
      description: `${productData.name} - ${selectedTissu}`,
    });
  };

  const nextImage = () => setCurrentImage(i => (i + 1) % productData.images.length);
  const prevImage = () => setCurrentImage(i => (i - 1 + productData.images.length) % productData.images.length);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link to="/category" className="text-sm text-muted-foreground hover:text-foreground color-transition">
              ← Retour aux Assises
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Galerie */}
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={productData.images[currentImage]}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Navigation galerie */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm color-transition hover:bg-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm color-transition hover:bg-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Miniatures */}
              <div className="flex gap-2 mt-4">
                {productData.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      "w-16 h-16 overflow-hidden border-2 transition-all",
                      currentImage === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* AI Nudge - Taille */}
              {showSizeNudge && (
                <AiNudge
                  title="Analyse Cognitive : Échelle et Intégration"
                  ctaText="Recevoir le lien AR par SMS"
                  onCtaClick={() => toast.info("Lien AR envoyé sur votre mobile")}
                  className="mt-6"
                >
                  <p>
                    Pour valider l'échelle, ce module est compatible avec nos simulateurs AR (Réalité Augmentée) sur mobile. 
                    La profondeur d'assise est équivalente à un lit double.
                  </p>
                </AiNudge>
              )}
            </div>

            {/* Informations produit */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl tracking-tight">
                {productData.name}
              </h1>
              <p className="mt-2 text-muted-foreground">{productData.subtitle}</p>

              {/* Prix */}
              <div className="mt-8 relative">
                <p className="text-2xl font-light">
                  {productData.price.toLocaleString('fr-FR')} €
                </p>

                {/* AI Nudge - Prix */}
                {showPriceNudge && (
                  <AiNudge
                    title="Analyse Cognitive : La Justification du Prix"
                    ctaText="Calculer la Valeur Long Terme"
                    onCtaClick={() => toast.info("Calculateur de valeur ouvert")}
                    className="mt-4"
                  >
                    <p>
                      Ce module est certifié pour une durée de vie minimale de <strong>15 ans</strong>. 
                      Le coût réel de possession est donc de <strong>19,16 € par mois</strong>. 
                      Notre garantie s'étend sur 10 ans.
                    </p>
                  </AiNudge>
                )}
              </div>

              {/* Options */}
              <div className="mt-10 space-y-6">
                {/* Tissu */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                    Tissu
                  </label>
                  <select
                    value={selectedTissu}
                    onChange={(e) => setSelectedTissu(e.target.value)}
                    className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground"
                  >
                    {productData.tissus.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Couleur */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                    Couleur
                  </label>
                  <select
                    value={selectedCouleur}
                    onChange={(e) => setSelectedCouleur(e.target.value)}
                    className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground"
                  >
                    {productData.couleurs.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Orientation */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                    Orientation du Module
                  </label>
                  <div className="flex gap-4">
                    {productData.orientations.map(o => (
                      <button
                        key={o}
                        onClick={() => setSelectedOrientation(o)}
                        className={cn(
                          "flex-1 py-3 border text-sm uppercase tracking-wider transition-all",
                          selectedOrientation === o
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantité */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                    Quantité
                  </label>
                  <div className="flex items-center border border-border w-fit">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 color-transition hover:bg-accent"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-3 color-transition hover:bg-accent"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full mt-10"
              >
                Ajouter à l'Intention
              </Button>

              {/* Description */}
              <div className="mt-16 border-t border-border pt-10">
                <h2 className="font-serif text-xl mb-4">La Révélation de l'Assise</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {productData.description}
                </p>
              </div>

              {/* Spécifications */}
              <div className="mt-10 border-t border-border pt-10">
                <button 
                  onClick={() => setShowSizeNudge(true)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h2 className="font-serif text-xl">Spécifications Techniques</h2>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <dl className="mt-6 space-y-3">
                  {productData.specs.map(spec => (
                    <div key={spec.label} className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
