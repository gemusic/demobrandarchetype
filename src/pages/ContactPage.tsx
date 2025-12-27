import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().email("Adresse email invalide").max(255),
  subject: z.string().min(1, "Veuillez sélectionner un sujet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message envoyé", {
      description: "Notre équipe vous répondra sous 24 heures.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Contact
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
              Parlons de votre projet
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Une question sur nos collections ? Besoin de conseils personnalisés ? 
              Notre équipe est à votre écoute.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Formulaire */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border bg-transparent py-4 px-4 text-base focus:outline-none transition-colors ${
                        errors.name ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground'
                      }`}
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border bg-transparent py-4 px-4 text-base focus:outline-none transition-colors ${
                        errors.email ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground'
                      }`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full border bg-transparent py-4 px-4 text-base focus:outline-none transition-colors appearance-none cursor-pointer ${
                      errors.subject ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground'
                    }`}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="conseil">Conseil personnalisé</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="livraison">Livraison & Installation</option>
                    <option value="retour">Retours & Garantie</option>
                    <option value="professionnel">Projet professionnel</option>
                    <option value="autre">Autre demande</option>
                  </select>
                  {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full border bg-transparent py-4 px-4 text-base focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-destructive focus:border-destructive' : 'border-border focus:border-foreground'
                    }`}
                    placeholder="Décrivez votre projet ou votre question..."
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="font-serif text-xl mb-6">Nos coordonnées</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" strokeWidth={1} />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:bonjour@archetypes.fr" className="hover:opacity-60 transition-opacity">
                        bonjour@archetypes.fr
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" strokeWidth={1} />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <a href="tel:+33142567890" className="hover:opacity-60 transition-opacity">
                        +33 1 42 56 78 90
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" strokeWidth={1} />
                    <div>
                      <p className="text-sm text-muted-foreground">Showroom</p>
                      <p>12 Rue du Faubourg Saint-Antoine</p>
                      <p>75012 Paris, France</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" strokeWidth={1} />
                    <div>
                      <p className="text-sm text-muted-foreground">Horaires</p>
                      <p>Lun - Sam : 10h - 19h</p>
                      <p>Dimanche : Sur rendez-vous</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-12">
                <h3 className="font-serif text-xl mb-4">Service prioritaire</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Pour les projets professionnels (architectes, décorateurs, hôtellerie), 
                  notre équipe dédiée vous accompagne avec des conditions privilégiées.
                </p>
                <p className="text-sm mt-4">
                  <a href="mailto:pro@archetypes.fr" className="underline hover:opacity-60 transition-opacity">
                    pro@archetypes.fr
                  </a>
                </p>
              </div>

              <div className="border-t border-border pt-12">
                <h3 className="font-serif text-xl mb-4">Temps de réponse</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Notre équipe répond généralement sous 24 heures les jours ouvrés. 
                  Pour les demandes urgentes, privilégiez le téléphone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
