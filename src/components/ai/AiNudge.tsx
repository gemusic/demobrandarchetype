import { ReactNode, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AiNudgeProps {
  title: string;
  children: ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  dismissable?: boolean;
}

export function AiNudge({ 
  title, 
  children, 
  ctaText, 
  onCtaClick,
  className,
  dismissable = true 
}: AiNudgeProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "ai-nudge-enter relative bg-ai-gold-light border-l-2 border-ai-gold p-5",
        className
      )}
    >
      {dismissable && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground color-transition"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="flex items-start gap-3">
        <Sparkles className="h-4 w-4 text-ai-gold flex-shrink-0 mt-0.5" />
        <div className="flex-1 pr-6">
          <h4 className="font-sans text-xs tracking-[0.1em] uppercase text-ai-gold font-medium mb-2">
            {title}
          </h4>
          <div className="text-sm text-foreground/90 leading-relaxed">
            {children}
          </div>
          {ctaText && onCtaClick && (
            <Button
              variant="ai"
              size="sm"
              onClick={onCtaClick}
              className="mt-4"
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
