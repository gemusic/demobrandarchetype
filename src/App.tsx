import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { ChatWidget } from "@/components/chat/ChatWidget";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ManifestePage from "./pages/ManifestePage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import DeliveryPage from "./pages/DeliveryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <ChatProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/category/:collection" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/manifeste" element={<ManifestePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/livraison" element={<DeliveryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ChatWidget />
        </ChatProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
