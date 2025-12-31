import { ChatMessage as ChatMessageType } from '@/hooks/useChat';
import { PaymentCard } from './PaymentCard';
import { Armchair } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.sender === 'ai';
  const time = message.timestamp.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex gap-2 ${isAi ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAi ? 'bg-ai-gold text-white' : 'bg-foreground text-background'
      }`}>
        {isAi ? (
          <Armchair className="w-4 h-4" />
        ) : (
          <span className="text-xs font-medium">Vous</span>
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[75%] ${isAi ? '' : 'text-right'}`}>
        <div className={`rounded-sm px-3 py-2 ${
          isAi 
            ? 'bg-ai-gold-light text-foreground' 
            : 'bg-foreground text-background'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {/* Payment Card si présent */}
          {message.paymentData && (
            <PaymentCard paymentData={message.paymentData} />
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-[10px] text-muted-foreground mt-1 inline-block">
          {time}
        </span>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ai-gold text-white flex items-center justify-center">
        <Armchair className="w-4 h-4" />
      </div>
      <div className="bg-ai-gold-light rounded-sm px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-ai-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-ai-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-ai-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
