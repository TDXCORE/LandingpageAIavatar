import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface StickyButtonProps {
  onOpenModal: () => void;
}

export const StickyButton = ({ onOpenModal }: StickyButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      variant="sticky"
      size="lg"
      onClick={onOpenModal}
      className={`transition-all duration-300 animate-fade-in ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      Probar Ahora
    </Button>
  );
};