import { useEffect } from 'react';
import { PaymentData } from '@/lib/chat-api';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import { trackPaymentCardShown, trackPaymentLinkClicked } from '@/lib/chat-tracking';

interface PaymentCardProps {
  paymentData: PaymentData;
}

export function PaymentCard({ paymentData }: PaymentCardProps) {
  const { visitorId } = useChatContext();
  const { product, payment_url } = paymentData;

  // Track quand la carte s'affiche
  useEffect(() => {
    trackPaymentCardShown(visitorId, { name: product.name, price: product.price });
  }, [visitorId, product.name, product.price]);

  const handlePayment = () => {
    if (payment_url) {
      trackPaymentLinkClicked(visitorId, { name: product.name, price: product.price }, payment_url);
      window.location.href = payment_url;
    }
  };

  return (
    <div className="mt-3 rounded-sm border border-border bg-background p-3">
      <div className="flex gap-3">
        {product.image && (
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
            <img 
              src={product.image} 
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-sm font-medium text-foreground truncate">
            {product.name}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {product.description}
          </p>
          <p className="text-sm font-medium text-foreground mt-1">
            {product.price.toLocaleString('fr-FR')} €
          </p>
        </div>
      </div>
      
      {payment_url && (
        <Button 
          onClick={handlePayment}
          className="w-full mt-3"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Procéder au Paiement
        </Button>
      )}
    </div>
  );
}
