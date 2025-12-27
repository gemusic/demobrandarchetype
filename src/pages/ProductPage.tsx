import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AiNudge } from "@/components/ai/AiNudge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getProductById, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const [showPriceNudge, setShowPriceNudge] = useState(false);
  const [showSizeNudge, setShowSizeNudge] = useState(false);
  const [priceHoverTime, setPriceHoverTime] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedMaterial(foundProduct.materials[0] || "");
        setSelectedColor(foundProduct.colors[0] || "");
      }
    }
  }, [id]);

  // Détection : temps passé sur le prix
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHoverTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (priceHoverTime > 12 && !showPriceNudge) {
      setShowPriceNudge(true);
    }
  }, [priceHoverTime, showPriceNudge]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground">Produit non trouvé</p>
          <Link to="/category" className="mt-4 inline-block underline">
            Retour aux collections
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedMaterial, selectedColor, quantity);
  };

  const nextImage = () => setCurrentImage(i => (i + 1) % product.images.length);
  const prevImage = () => setCurrentImage(i => (i - 1 + product.images.length) % product.images.length);

  const monthlyPrice = (product.price / (product.warranty * 12)).toFixed(2);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to={`/category/${product.collection}`} 
              className="text-sm text-muted-foreground hover:text-foreground color-transition"
            >
              ← Retour à {product.collection === 'fondation' ? 'Fondation' : product.collection === 'structure' ? 'Structure' : 'Expression'}
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Galerie */}
            <div className="relative">
              <div className="aspect-square overflow-hidden bg-accent/30">
                <img
                  src={product.images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Navigation galerie */}
              {product.images.length > 1 && (
                <>
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
                </>
              )}

              {/* Miniatures */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {product.images.map((img, i) => (
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
              )}

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
                    Dimensions : {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} cm.
                  </p>
                </AiNudge>
              )}
            </div>

            {/* Informations produit */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl tracking-tight">
                {product.name}
              </h1>

              {/* Prix */}
              <div className="mt-8 relative">
                <p className="text-2xl font-light">
                  {product.price.toLocaleString('fr-FR')} €
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Livraison sous {product.deliveryDays} jours • Garantie {product.warranty} ans
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
                      Cette pièce est certifiée pour une durée de vie minimale de <strong>{product.warranty} ans</strong>. 
                      Le coût réel de possession est donc de <strong>{monthlyPrice} € par mois</strong>. 
                      Notre garantie couvre structure et matériaux.
                    </p>
                  </AiNudge>
                )}
              </div>

              {/* Options */}
              <div className="mt-10 space-y-6">
                {/* Matériau */}
                {product.materials.length > 0 && (
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                      Matériau
                    </label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground"
                    >
                      {product.materials.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Couleur */}
                {product.colors.length > 0 && (
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                      Coloris
                    </label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground"
                    >
                      {product.colors.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                )}

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
                Ajouter au Panier
              </Button>

              {/* Description */}
              <div className="mt-16 border-t border-border pt-10">
                <h2 className="font-serif text-xl mb-4">La Révélation</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Histoire */}
              <div className="mt-10 border-t border-border pt-10">
                <h2 className="font-serif text-xl mb-4">L'Histoire</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.story}
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
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Dimensions</dt>
                    <dd>L{product.dimensions.width} × P{product.dimensions.depth} × H{product.dimensions.height} cm</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Poids</dt>
                    <dd>{product.weight} kg</dd>
                  </div>
                  {product.specs.map(spec => (
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
