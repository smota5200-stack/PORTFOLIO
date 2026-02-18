import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Expertise } from "@/components/Expertise";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { DataProvider } from "@/contexts/DataContext";

export default function Home() {
  return (
    <DataProvider>
      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Expertise />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </DataProvider>
  );
}
