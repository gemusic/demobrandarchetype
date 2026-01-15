const SERVER_URL = 'https://nine-humans-take.lindy.site';

export const sendVisitorMessage = async (visitorId: string, message: string) => {
  const response = await fetch(`${SERVER_URL}/api/visitor-message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitor_id: visitorId, message }),
  });
  return response.json();
};

export const pollChatResponse = async (visitorId: string) => {
  const response = await fetch(`${SERVER_URL}/api/chat-response/${visitorId}`);
  return response.json();
};

export const notifyChatOpened = async (visitorId: string) => {
  await fetch(`${SERVER_URL}/api/chat-opened`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitor_id: visitorId }),
  });
};
