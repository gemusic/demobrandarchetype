const SERVER_URL = 'https://archetypes-server.onrender.com';

export interface PaymentData {
  product: {
    id?: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
  payment_url?: string;
  cart_data?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    color?: string;
    image?: string;
  }>;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  payment_data?: PaymentData;
}

export async function notifyChatOpened(visitorId: string, pageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${SERVER_URL}/api/chat-opened`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitor_id: visitorId,
        page_url: pageUrl,
        timestamp: new Date().toISOString()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error notifying chat opened:', error);
    return false;
  }
}

export async function sendVisitorMessage(visitorId: string, message: string): Promise<boolean> {
  try {
    const response = await fetch(`${SERVER_URL}/api/visitor-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitor_id: visitorId,
        message: message
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
}

export async function pollChatResponse(visitorId: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${SERVER_URL}/api/chat-response/${visitorId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error polling for messages:', error);
    return { success: false };
  }
}

export async function trackConversion(
  visitorId: string, 
  eventType: string, 
  product?: { name?: string; price?: number }
): Promise<void> {
  try {
    await fetch(`${SERVER_URL}/api/analytics/conversion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitor_id: visitorId,
        event_type: eventType,
        product_name: product?.name,
        price: product?.price,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}
