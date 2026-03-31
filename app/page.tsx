import { AboutMe } from "./components/AboutMe";
import { Commissions } from "./components/Commissions";
import { Contact } from "./components/Contact";
import { Illustrations } from "./components/Illustrations";
import { NavBar } from "./components/NavBar";
import { Parallax } from "./components/Parallax";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar />
      <Parallax />
      <section id="portfolio">
        <Illustrations />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="commissions">
        <Commissions />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
