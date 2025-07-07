
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { UseCases } from "@/components/UseCases";
import { LeadModal } from "@/components/LeadModal";
import { StickyButton } from "@/components/StickyButton";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero onOpenModal={openModal} />
      <ProblemSolution />
      <UseCases />
      
      {/* Sticky CTA */}
      <StickyButton onOpenModal={openModal} />
      
      {/* Lead Modal */}
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Index;
