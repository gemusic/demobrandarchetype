import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEYS = {
  visitorId: 'luminara_visitor_id',
  sessionId: 'luminara_session_id',
  chatShown: 'archetypes_chat_shown',
};

interface ChatContextType {
  visitorId: string;
  sessionId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  hasNewMessage: boolean;
  setHasNewMessage: (has: boolean) => void;
  markChatAsShown: () => void;
  wasChatShown: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function generateVisitorId(): string {
  const stored = localStorage.getItem(STORAGE_KEYS.visitorId);
  if (stored) return stored;
  
  const newId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem(STORAGE_KEYS.visitorId, newId);
  return newId;
}

function generateSessionId(): string {
  return 'session_' + Date.now();
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [visitorId] = useState(() => generateVisitorId());
  const [sessionId] = useState(() => generateSessionId());
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [wasChatShown, setWasChatShown] = useState(false);

  useEffect(() => {
    setWasChatShown(!!localStorage.getItem(STORAGE_KEYS.chatShown));
  }, []);

  const markChatAsShown = () => {
    localStorage.setItem(STORAGE_KEYS.chatShown, 'true');
    setWasChatShown(true);
  };

  return (
    <ChatContext.Provider value={{
      visitorId,
      sessionId,
      isOpen,
      setIsOpen,
      hasNewMessage,
      setHasNewMessage,
      markChatAsShown,
      wasChatShown,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
