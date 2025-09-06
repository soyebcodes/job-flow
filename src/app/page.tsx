import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Navbar from "@/components/Navbar/Navbar";
import ToolSection from "@/components/ToolSection/ToolSection";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <ToolSection />
      <HowItWorks />
    </main>
  );
}
