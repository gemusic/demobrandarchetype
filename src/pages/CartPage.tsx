import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AiNudge } from "@/components/ai/AiNudge";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [showReassuranceNudge, setShowReassuranceNudge] = useState(false);
  const [showConfirmNudge, setShowConfirmNudge] = useState(false);
  const [quantityChanged, setQuantityChanged] = useState(false);

  // Détection : temps sur la page sans action
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeOnPage > 20 && items.length > 0 && !showReassuranceNudge) {
      setShowReassuranceNudge(true);
    }
  }, [timeOnPage, showReassuranceNudge, items.length]);

  // Détection : modification de quantité = hésitation
  useEffect(() => {
    if (quantityChanged && !showConfirmNudge && items.length > 0) {
      const timer = setTimeout(() => setShowConfirmNudge(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [quantityChanged, showConfirmNudge, items.length]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantityChanged(true);
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    toast.success("Redirection vers le paiement sécurisé...", {
      description: "Merci pour votre confiance"
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-center mb-16">
            Votre Sélection
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-8">Votre panier est vide.</p>
              <Link to="/category">
                <Button variant="outline">Découvrir les Collections</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Liste des articles */}
              <div className="lg:col-span-2 space-y-8">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedMaterial}-${item.selectedColor}`} className="flex gap-6 pb-8 border-b border-border">
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover bg-accent/30"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-serif text-lg hover:opacity-60 color-transition"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.selectedMaterial}, {item.selectedColor}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-muted-foreground hover:text-foreground color-transition"
                          aria-label="Retirer l'article"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-6">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="p-2 color-transition hover:bg-accent"
                            aria-label="Réduire la quantité"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-4 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="p-2 color-transition hover:bg-accent"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-lg">
                          {(item.product.price * item.quantity).toLocaleString('fr-FR')} €
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI Nudge - Confirmation produit */}
                {showConfirmNudge && items.length > 0 && (
                  <AiNudge
                    title="Analyse Cognitive : Confirmation d'Intention"
                    ctaText="Je confirme mon choix"
                    onCtaClick={() => {
                      setShowConfirmNudge(false);
                      toast.success("Choix confirmé");
                    }}
                    className="mt-4"
                  >
                    <p>
                      Le <strong>{items[0].product.name}</strong> est notre meilleur vendeur pour les salons de plus de 40m². 
                      Il s'aligne parfaitement avec votre choix de {items[0].selectedMaterial}.
                    </p>
                  </AiNudge>
                )}
              </div>

              {/* Résumé */}
              <div className="lg:col-span-1">
                <div className="border border-border p-6 sticky top-28">
                  <h2 className="font-serif text-lg mb-6">Résumé</h2>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{totalPrice.toLocaleString('fr-FR')} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-muted-foreground italic">Calculée à l'étape suivante</span>
                    </div>
                  </div>

                  <div className="border-t border-border mt-6 pt-6">
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span>{totalPrice.toLocaleString('fr-FR')} €</span>
                    </div>
                  </div>

                  {/* AI Nudge - Réassurance finale */}
                  {showReassuranceNudge && (
                    <AiNudge
                      title="Analyse Cognitive : La Sécurité de l'Investissement"
                      ctaText="Oui, Je Me Sens Rassuré"
                      onCtaClick={handleCheckout}
                      className="mt-6"
                      dismissable={false}
                    >
                      <p className="mb-3">
                        Nous validons les points suivants avant le paiement :
                      </p>
                      <ul className="space-y-1.5 text-sm">
                        <li>✓ Garantie structurelle : <strong>10 ans (inclus)</strong></li>
                        <li>✓ Retour : <strong>60 jours sans frais (inclus)</strong></li>
                        <li>✓ Livraison : <strong>Installation offerte</strong></li>
                        <li>✓ Paiement : <strong>3x sans frais disponible</strong></li>
                      </ul>
                    </AiNudge>
                  )}

                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    className="w-full mt-6"
                  >
                    Finaliser la Commande
                  </Button>

                  {/* Code promo */}
                  <div className="mt-6">
                    <input
                      type="text"
                      placeholder="Code promotionnel"
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground"
                    />
                  </div>

                  {/* Réassurances */}
                  <div className="mt-8 space-y-3 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <span>✓</span> Paiement 100% sécurisé
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✓</span> Livraison avec installation
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✓</span> Service client dédié
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
