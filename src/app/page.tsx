import { About } from "../components/About";
import { CaseStudy } from "../components/CaseStudy";
import { Extras } from "../components/Extras";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { MobileCtaBar } from "../components/MobileCtaBar";
import { Pricing } from "../components/Pricing";
import { RequestForm } from "../components/RequestForm";
import { Work } from "../components/Work";

export default function Home() {
  return (
    <>
      <Header variant="hero" />
      <main className="flex-1">
        <Hero />
        <Work />
        <CaseStudy />
        <HowItWorks />
        <Pricing />
        <Extras />
        <About />
        <FAQ />
        <RequestForm />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
