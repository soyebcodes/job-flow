import CoreFeatures from "@/components/Features/Features";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <div className="">
        <CoreFeatures />
      </div>
    </main>
  );
}
