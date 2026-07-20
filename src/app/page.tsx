import { About } from "../components/About";
import { CaseStudy } from "../components/CaseStudy";
import { Extras } from "../components/Extras";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Mission } from "../components/Mission";
import { Pricing } from "../components/Pricing";
import { RequestForm } from "../components/RequestForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Mission />
        <Pricing />
        <CaseStudy />
        <Extras />
        <RequestForm />
      </main>
      <Footer />
    </>
  );
}
