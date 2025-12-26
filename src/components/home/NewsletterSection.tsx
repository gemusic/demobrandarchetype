import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Bienvenue dans le cercle", {
      description: "Vous recevrez bientôt nos actualités.",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-32 px-6 bg-foreground text-background">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-background/60">
          Newsletter
        </span>
        <h2 className="font-serif text-3xl md:text-4xl mt-4">
          Rejoignez le cercle
        </h2>
        <p className="mt-6 text-background/70 leading-relaxed">
          Accès prioritaire aux nouvelles pièces, coulisses d'atelier, 
          et invitations aux événements privés. Pas de spam, promis.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="flex-1 bg-transparent border border-background/30 py-4 px-5 text-base placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
          />
          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={isSubmitting}
            className="border-background text-background hover:bg-background hover:text-foreground"
          >
            {isSubmitting ? "..." : "S'inscrire"}
          </Button>
        </form>
        
        <p className="mt-6 text-xs text-background/50">
          En vous inscrivant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
}
