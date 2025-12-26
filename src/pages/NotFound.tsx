import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 flex items-center justify-center min-h-[70vh]">
        <div className="text-center px-6 max-w-xl">
          <span className="text-8xl md:text-9xl font-serif text-muted-foreground/20">
            404
          </span>
          <h1 className="font-serif text-3xl md:text-4xl mt-8 mb-4">
            Cette page s'est échappée
          </h1>
          <p className="text-muted-foreground mb-10">
            La page que vous cherchez n'existe plus ou a été déplacée. 
            Mais nos collections, elles, sont bien là.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg">Retour à l'accueil</Button>
            </Link>
            <Link to="/category/fondation">
              <Button variant="outline" size="lg">Explorer les collections</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
