import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const CheckoutPage = () => {
  const { items, totalPrice } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinishSimulation = () => {
    window.location.href = "https://ebusinessag.com/pricing";
  };

  const deliveryFee = totalPrice >= 500 ? 0 : 49;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-serif text-3xl mb-8">Votre panier est vide</h1>
            <Link to="/category">
              <Button variant="outline">Découvrir les Collections</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back link */}
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au panier
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-center mb-16">
            Finaliser votre commande
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulaires */}
            <div className="lg:col-span-2 space-y-12">
              {/* Livraison */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="h-5 w-5" />
                  <h2 className="font-serif text-xl">Informations de livraison</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Prénom</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Nom</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="jean.dupont@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-muted-foreground mb-2">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="12 Rue de la Paix"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Paris"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="75001"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-muted-foreground mb-2">Pays</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Paiement */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-5 w-5" />
                  <h2 className="font-serif text-xl">Paiement sécurisé</h2>
                  <span className="ml-auto text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">
                    Simulation
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-muted-foreground mb-2">Numéro de carte</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Date d'expiration</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className="w-full border border-border bg-transparent py-3 px-4 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                {/* Sécurité */}
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Vos données sont protégées par un cryptage SSL 256-bit</span>
                </div>
              </section>

              {/* Bouton principal */}
              <Button
                onClick={handleFinishSimulation}
                size="xl"
                className="w-full bg-primary hover:bg-primary/90"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Terminer la simulation
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Ce bouton vous redirigera vers ebusinessag.com/pricing
              </p>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="border border-border p-6 sticky top-28">
                <h2 className="font-serif text-lg mb-6">Récapitulatif</h2>
                
                {/* Produits */}
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div 
                      key={`${item.product.id}-${item.selectedMaterial}-${item.selectedColor}`} 
                      className="flex gap-4"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover bg-accent/30"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.selectedMaterial}, {item.selectedColor}
                        </p>
                        <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} €
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{totalPrice.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Offerte</span>
                      ) : (
                        `${deliveryFee} €`
                      )}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Livraison offerte dès 500€ d'achat
                    </p>
                  )}
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{finalTotal.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>

                {/* Garanties */}
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Paiement 100% sécurisé
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Livraison avec installation
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Retour gratuit sous 60 jours
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Garantie 10 ans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
