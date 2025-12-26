import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AiNudge } from "@/components/ai/AiNudge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const cartItems = [
  {
    id: 1,
    name: "Module Sectionnel Hévéa Alpha-V",
    variant: "Velours Fumé, Anthracite, Gauche",
    price: 3450,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400",
  },
];

const CartPage = () => {
  const [items, setItems] = useState(cartItems);
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
    if (timeOnPage > 15 && !showReassuranceNudge) {
      setShowReassuranceNudge(true);
    }
  }, [timeOnPage, showReassuranceNudge]);

  // Détection : modification de quantité = hésitation
  useEffect(() => {
    if (quantityChanged && !showConfirmNudge) {
      const timer = setTimeout(() => setShowConfirmNudge(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [quantityChanged, showConfirmNudge]);

  const updateQuantity = (id: number, delta: number) => {
    setQuantityChanged(true);
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast.success("Redirection vers le paiement sécurisé...");
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-center mb-16">
            Votre Intention
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
                  <div key={item.id} className="flex gap-6 pb-8 border-b border-border">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-cover"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.id}`}
                            className="font-serif text-lg hover:opacity-60 color-transition"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.variant}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-muted-foreground hover:text-foreground color-transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-6">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 color-transition hover:bg-accent"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-4 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 color-transition hover:bg-accent"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-lg">
                          {(item.price * item.quantity).toLocaleString('fr-FR')} €
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* AI Nudge - Confirmation produit */}
                {showConfirmNudge && (
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
                      Le <strong>Module Alpha-V</strong> est notre meilleur vendeur pour les salons de plus de 40m². 
                      Il s'aligne parfaitement avec votre choix de revêtement Velours Fumé.
                    </p>
                  </AiNudge>
                )}
              </div>

              {/* Résumé */}
              <div className="lg:col-span-1">
                <div className="border border-border p-6">
                  <h2 className="font-serif text-lg mb-6">Résumé</h2>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{subtotal.toLocaleString('fr-FR')} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="text-muted-foreground italic">Calculée à l'étape suivante</span>
                    </div>
                  </div>

                  <div className="border-t border-border mt-6 pt-6">
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span>{subtotal.toLocaleString('fr-FR')} €</span>
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
                        Concernant votre <strong>Module Sectionnel Hévéa Alpha-V</strong>, 
                        nous validons les points suivants avant le paiement :
                      </p>
                      <ul className="space-y-1.5 text-sm">
                        <li>✓ Garantie structurelle : <strong>10 ans (inclus)</strong></li>
                        <li>✓ Retour : <strong>60 jours sans frais (inclus)</strong></li>
                        <li>✓ Livraison : <strong>Installation offerte (Valeur 250 €)</strong></li>
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

                  {/* Code promo (friction) */}
                  <div className="mt-6">
                    <input
                      type="text"
                      placeholder="Code promotionnel"
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground"
                    />
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
