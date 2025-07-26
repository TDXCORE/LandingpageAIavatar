import { useState, useEffect } from "react";
import { HeroAI } from "@/components/HeroAI";
import { UseCasesAI } from "@/components/UseCasesAI";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnicalDifferentiators } from "@/components/TechnicalDifferentiators";
import { FAQ } from "@/components/FAQ";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const AIAvatarLanding = () => {

  // Ensure page loads at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroAI />
      
      
      {/* Use Cases */}
      <UseCasesAI />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Technical Differentiators */}
      <TechnicalDifferentiators />
      
      
      {/* FAQ */}
      <FAQ />
      
      {/* WhatsApp Float Button */}
      <WhatsAppButton />
      
    </div>
  );
};

export default AIAvatarLanding;