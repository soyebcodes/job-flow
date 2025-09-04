import Navbar from "@/components/Navbar/Navbar";
import AuthButtons from "@/components/AuthButtons";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Navbar />
      <AuthButtons />
      <Button>Click me</Button>
    </div>
  );
}
