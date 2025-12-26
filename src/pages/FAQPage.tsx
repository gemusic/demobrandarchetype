import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Commande & Paiement",
    items: [
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et le virement bancaire. Pour les commandes supérieures à 1 000 €, nous proposons également le paiement en 3x ou 4x sans frais via notre partenaire Alma.",
      },
      {
        question: "Puis-je payer en plusieurs fois ?",
        answer: "Oui, pour toute commande supérieure à 300 €, vous pouvez opter pour un paiement en 3x ou 4x sans frais. Le premier paiement est prélevé immédiatement, les suivants chaque mois. Aucun document n'est requis, la validation est instantanée.",
      },
      {
        question: "Comment puis-je suivre ma commande ?",
        answer: "Dès l'expédition de votre commande, vous recevez un email avec un numéro de suivi. Vous pouvez également consulter l'état de votre commande à tout moment depuis votre espace client ou en contactant notre service client.",
      },
      {
        question: "Puis-je modifier ou annuler ma commande ?",
        answer: "Vous pouvez modifier ou annuler votre commande gratuitement dans les 24 heures suivant la confirmation. Au-delà, contactez notre service client — nous ferons notre possible pour vous accommoder, mais des frais peuvent s'appliquer pour les pièces déjà en production.",
      },
    ],
  },
  {
    title: "Livraison & Installation",
    items: [
      {
        question: "Quels sont les délais de livraison ?",
        answer: "Les délais varient selon les produits : 7-14 jours pour les objets décoratifs, 14-28 jours pour les meubles en stock, et 28-56 jours pour les pièces fabriquées sur commande. Le délai précis est indiqué sur chaque fiche produit.",
      },
      {
        question: "La livraison est-elle gratuite ?",
        answer: "La livraison standard est offerte pour toute commande supérieure à 500 € en France métropolitaine. Pour les commandes inférieures ou les livraisons hors France métropolitaine, les frais sont calculés en fonction du poids et de la destination.",
      },
      {
        question: "Proposez-vous un service d'installation ?",
        answer: "Oui, nous proposons un service d'installation à domicile pour tous nos meubles. Ce service est offert pour les commandes supérieures à 2 000 €. Pour les commandes inférieures, un forfait de 150 € s'applique. Nos installateurs sont formés à la manipulation de nos pièces.",
      },
      {
        question: "Livrez-vous à l'international ?",
        answer: "Nous livrons dans toute l'Union Européenne, en Suisse et au Royaume-Uni. Les frais et délais sont calculés lors du passage de commande. Pour d'autres destinations, contactez notre service client pour un devis personnalisé.",
      },
    ],
  },
  {
    title: "Retours & Garantie",
    items: [
      {
        question: "Quelle est votre politique de retour ?",
        answer: "Vous disposez de 60 jours après réception pour retourner votre achat. Le produit doit être dans son état d'origine, non utilisé et dans son emballage. La reprise est gratuite en France métropolitaine. Le remboursement intervient sous 5 jours ouvrés après réception du retour.",
      },
      {
        question: "Comment effectuer un retour ?",
        answer: "Connectez-vous à votre espace client et initiez une demande de retour, ou contactez notre service client. Nous vous envoyons une étiquette de retour prépayée et organisons l'enlèvement à votre domicile pour les pièces volumineuses.",
      },
      {
        question: "Quelle est la durée de garantie ?",
        answer: "Nos garanties varient selon les collections : 10 ans pour la collection Fondation (assises), 10 à 25 ans pour Structure (tables et bureaux), et 5 à 10 ans pour Expression (luminaires et objets). La garantie couvre les défauts de fabrication et les vices cachés.",
      },
      {
        question: "Que couvre la garantie ?",
        answer: "La garantie couvre tous les défauts de fabrication : structures, mécanismes, finitions. Elle ne couvre pas l'usure normale, les dommages accidentels ou les modifications non autorisées. Pour les tissus, nous proposons un service de regarniture à tarif préférentiel.",
      },
    ],
  },
  {
    title: "Produits & Personnalisation",
    items: [
      {
        question: "Puis-je personnaliser ma commande ?",
        answer: "Oui, la plupart de nos pièces sont personnalisables : choix des tissus, des couleurs, des finitions, parfois des dimensions. Les options disponibles sont détaillées sur chaque fiche produit. Pour des demandes spécifiques, contactez notre service client.",
      },
      {
        question: "Comment choisir le bon tissu ?",
        answer: "Nous vous envoyons gratuitement jusqu'à 5 échantillons de tissus. Commandez-les directement depuis les fiches produits. Nos conseillers peuvent également vous guider par téléphone selon votre usage et votre environnement.",
      },
      {
        question: "Les couleurs en ligne sont-elles fidèles ?",
        answer: "Nous faisons notre maximum pour que les photos reflètent fidèlement les couleurs, mais les variations d'écran peuvent créer des différences. Nous recommandons vivement de commander des échantillons pour les pièces importantes.",
      },
      {
        question: "Proposez-vous un service de conseil ?",
        answer: "Oui, nos conseillers en aménagement sont disponibles par téléphone, email ou visioconférence. Ce service est gratuit et sans engagement. Ils peuvent vous aider à choisir les bonnes pièces, les bonnes configurations et les bonnes finitions.",
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              FAQ
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4">
              Questions fréquentes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Trouvez rapidement les réponses à vos questions. 
              Si vous ne trouvez pas ce que vous cherchez, contactez-nous.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
              <section key={category.title} className="animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                <h2 className="font-serif text-2xl mb-6 pb-4 border-b border-border">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem 
                      key={itemIndex} 
                      value={`${category.title}-${itemIndex}`}
                      className="border border-border px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <span className="text-base font-normal">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center border-t border-border pt-16">
            <h3 className="font-serif text-2xl mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h3>
            <p className="text-muted-foreground mb-8">
              Notre équipe est disponible du lundi au samedi pour vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Nous contacter</Button>
              </Link>
              <a href="tel:+33142567890">
                <Button variant="outline" size="lg">
                  +33 1 42 56 78 90
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
