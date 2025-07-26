import { useState } from "react";
import { HeroAI } from "@/components/HeroAI";
import { SocialProof } from "@/components/SocialProof";
import { UseCasesAI } from "@/components/UseCasesAI";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnicalDifferentiators } from "@/components/TechnicalDifferentiators";
import { PricingPlans } from "@/components/PricingPlans";
import { FAQ } from "@/components/FAQ";
import { LeadModal } from "@/components/LeadModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const AIAvatarLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroAI onOpenModal={openModal} />
      
      {/* Social Proof */}
      <SocialProof />
      
      {/* Use Cases */}
      <UseCasesAI />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Technical Differentiators */}
      <TechnicalDifferentiators />
      
      {/* Pricing Plans */}
      <PricingPlans onOpenModal={openModal} />
      
      {/* FAQ */}
      <FAQ />
      
      {/* WhatsApp Float Button */}
      <WhatsAppButton />
      
      {/* Lead Modal */}
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AIAvatarLanding;