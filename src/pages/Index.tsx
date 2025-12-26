import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { EssentialsGrid } from "@/components/home/EssentialsGrid";
import { PromiseSection } from "@/components/home/PromiseSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <EssentialsGrid />
        <PromiseSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
