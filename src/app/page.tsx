import { Navbar } from "@/components/navbar";
import { Streak } from "@/components/streak";

export default function HomePage() {
  return (
    <main className="container mx-auto h-full w-full">
      <Navbar />
      <Streak />
    </main>
  );
}
