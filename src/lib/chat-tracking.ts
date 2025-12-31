const SERVER_URL = 'https://luminara-express-server.onrender.com';

export interface ChatTrackingEvent {
  visitor_id: string;
  event_type: string;
  page_url?: string;
  duration?: number;
  message_preview?: string;
  product?: {
    id?: number;
    name: string;
    price: number;
  };
  payment_url?: string;
  timestamp: string;
}

async function sendTrackingEvent(event: ChatTrackingEvent): Promise<void> {
  try {
    await fetch(`${SERVER_URL}/api/analytics/conversion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });
  } catch (error) {
    console.error('Error sending chat tracking event:', error);
  }
}

export function trackChatOpened(visitorId: string, pageUrl: string): void {
  sendTrackingEvent({
    visitor_id: visitorId,
    event_type: 'chat_opened',
    page_url: pageUrl,
    timestamp: new Date().toISOString()
  });
}

export function trackChatClosed(visitorId: string, duration: number): void {
  sendTrackingEvent({
    visitor_id: visitorId,
    event_type: 'chat_closed',
    duration: duration,
    timestamp: new Date().toISOString()
  });
}

export function trackMessageSent(visitorId: string, messagePreview: string): void {
  sendTrackingEvent({
    visitor_id: visitorId,
    event_type: 'user_message_sent',
    message_preview: messagePreview.substring(0, 50),
    timestamp: new Date().toISOString()
  });
}

export function trackMessageReceived(visitorId: string): void {
  sendTrackingEvent({
    visitor_id: visitorId,
    event_type: 'ai_message_received',
    timestamp: new Date().toISOString()
  });
}

export function trackPaymentCardShown(visitorId: string, product: { name: string; price: number }): void {
  sendTrackingEvent({
    visitor_id: visitorId,
    event_type: 'payment_card_shown',
    product: product,
    timestamp: new Date().toISOString()
  });
}

export function trackPaymentLinkClicked(
  visitorId: string, 
  product: { name: string; price: number },
  paymentUrl: string
): void {
  sendTrackingEvent({
    visitor_id: visitorId,
    event_type: 'payment_link_clicked',
    product: product,
    payment_url: paymentUrl,
    timestamp: new Date().toISOString()
  });
}
