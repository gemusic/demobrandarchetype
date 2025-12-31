import { useEffect, useRef } from 'react';
import { X, Send, Armchair } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import { useChat } from '@/hooks/useChat';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatToggle } from './ChatToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackChatOpened, trackChatClosed } from '@/lib/chat-tracking';

export function ChatWidget() {
  const { visitorId, isOpen, setIsOpen, setHasNewMessage, markChatAsShown, wasChatShown } = useChatContext();
  const { messages, isTyping, inputValue, setInputValue, sendMessage, awaitingFirstMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatOpenTimeRef = useRef<number | null>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input et tracking quand le chat s'ouvre/ferme
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMessage(false);
      chatOpenTimeRef.current = Date.now();
      trackChatOpened(visitorId, window.location.href);
    } else if (chatOpenTimeRef.current) {
      const duration = Date.now() - chatOpenTimeRef.current;
      trackChatClosed(visitorId, duration);
      chatOpenTimeRef.current = null;
    }
  }, [isOpen, setHasNewMessage, visitorId]);

  // Auto-open après 3 secondes si jamais ouvert
  useEffect(() => {
    if (!wasChatShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        markChatAsShown();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wasChatShown, setIsOpen, markChatAsShown]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <ChatToggle />

      {/* Chat Container */}
      <div className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-background border border-border shadow-2xl rounded-sm transition-all duration-300 ${
        isOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ai-gold text-white flex items-center justify-center">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-medium text-foreground">Sofa</h3>
              <p className="text-xs text-muted-foreground">Assistant ARCHETYPES</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background">
          {messages.length === 0 && !isTyping && !awaitingFirstMessage && (
            <div className="text-center text-muted-foreground text-sm py-8">
              <Armchair className="w-12 h-12 mx-auto mb-3 text-ai-gold opacity-50" />
              <p>Bienvenue ! Comment puis-je vous aider ?</p>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-background">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-ai-gold"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim()}
              size="icon"
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
