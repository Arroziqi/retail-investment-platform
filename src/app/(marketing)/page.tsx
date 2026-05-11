import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { TechStack } from "@/components/marketing/TechStack";
import { ProjectContext } from "@/components/marketing/ProjectContext";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <ProjectContext />
      <Features />
      <DashboardPreview />
      <TechStack />
      {/* FAQ or other sections could go here */}
    </>
  );
}
