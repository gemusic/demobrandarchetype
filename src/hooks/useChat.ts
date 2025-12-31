import { useState, useEffect, useCallback, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { sendVisitorMessage, pollChatResponse, trackConversion, PaymentData } from '@/lib/chat-api';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  paymentData?: PaymentData;
}

const POLLING_INTERVAL = 2000;

export function useChat() {
  const { visitorId, isOpen, setHasNewMessage } = useChatContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Polling pour les réponses
  const startPolling = useCallback(() => {
    if (pollingRef.current) return;

    pollingRef.current = setInterval(async () => {
      const response = await pollChatResponse(visitorId);

      if (response.success && response.message) {
        setIsTyping(false);

        const newMessage: ChatMessage = {
          id: 'msg_' + Date.now(),
          content: response.message,
          sender: 'ai',
          timestamp: new Date(),
          paymentData: response.payment_data,
        };

        setMessages(prev => [...prev, newMessage]);

        if (!isOpen) {
          setHasNewMessage(true);
        }

        // Track si c'est un message de paiement
        if (response.payment_data) {
          trackConversion(visitorId, 'payment_link_shown', response.payment_data.product);
        }
      }
    }, POLLING_INTERVAL);
  }, [visitorId, isOpen, setHasNewMessage]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // Démarrer le polling quand le chat est ouvert
  useEffect(() => {
    if (isOpen) {
      startPolling();
    }
    return () => stopPolling();
  }, [isOpen, startPolling, stopPolling]);

  // Envoyer un message
  const sendMessage = useCallback(async () => {
    const message = inputValue.trim();
    if (!message) return;

    // Ajouter le message utilisateur
    const userMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Envoyer au serveur
    const success = await sendVisitorMessage(visitorId, message);

    if (!success) {
      setIsTyping(false);
      const errorMessage: ChatMessage = {
        id: 'msg_error_' + Date.now(),
        content: "Désolé, je rencontre un problème technique. Veuillez réessayer.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [inputValue, visitorId]);

  return {
    messages,
    isTyping,
    inputValue,
    setInputValue,
    sendMessage,
  };
}
