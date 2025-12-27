import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

const emailSchema = z.string().email("Adresse email invalide");

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Email invalide");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Bienvenue dans le cercle", {
      description: "Vous recevrez bientôt nos actualités.",
    });
    
    setEmail("");
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
    if (isSuccess) setIsSuccess(false);
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
        
        {isSuccess ? (
          <div className="mt-10 flex items-center justify-center gap-3 text-background animate-fade-in">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-lg">Merci ! Vous êtes inscrit(e).</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="votre@email.com"
                  className={`w-full bg-transparent border py-4 px-5 text-base placeholder:text-background/40 focus:outline-none transition-colors ${
                    error ? 'border-red-400' : 'border-background/30 focus:border-background'
                  }`}
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                size="lg"
                disabled={isSubmitting}
                className="border-background text-background hover:bg-background hover:text-foreground"
              >
                {isSubmitting ? "..." : "S'inscrire"}
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-400 text-left">{error}</p>
            )}
          </form>
        )}
        
        <p className="mt-6 text-xs text-background/50">
          En vous inscrivant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
}
