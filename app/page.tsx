import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import RecentProject from "@/components/RecentProject";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import { navItems } from "@/data";
import Design from "@/components/Design";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10">
      <div className="max-w-7xl w-full">
      <FloatingNav navItems={navItems}/>
        <Hero />
        <Experience />
        <RecentProject />
        <Design />
        <Footer />
      </div>
    </main>
  );
}
