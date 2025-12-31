import { Armchair } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';

export function ChatToggle() {
  const { isOpen, setIsOpen, hasNewMessage, setHasNewMessage } = useChatContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (hasNewMessage) {
      setHasNewMessage(false);
    }
  };

  if (isOpen) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-ai-gold text-white px-4 py-3 rounded-sm shadow-lg hover:bg-ai-gold-dark transition-all duration-300 hover:scale-105 group"
      aria-label="Ouvrir le chat"
    >
      {/* Notification Badge */}
      {hasNewMessage && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}
      
      <Armchair className="w-5 h-5" />
      <span className="font-serif text-sm">Sofa</span>
    </button>
  );
}
