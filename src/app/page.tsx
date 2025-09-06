import AiToolsHighlight from "@/components/AiToolsHighlight/AiToolsHighlight";
import CoreFeatures from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import ToolSection from "@/components/ToolSection/ToolSection";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ToolSection />
      <CoreFeatures />
      <HowItWorks />
      <AiToolsHighlight />
    </main>
  );
}
