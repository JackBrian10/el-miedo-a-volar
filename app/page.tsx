import { AboutMe } from "./components/AboutMe";
import { Commissions } from "./components/Commissions";
import { Contact } from "./components/Contact";
import { Illustrations } from "./components/Illustrations";
import { NavBar } from "./components/NavBar";
import { Parallax } from "./components/Parallax";

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavBar></NavBar>
      <Parallax></Parallax>
      <Illustrations></Illustrations>
      <AboutMe></AboutMe>
      <Commissions></Commissions>
      <Contact></Contact>
    </div>
  );
}
