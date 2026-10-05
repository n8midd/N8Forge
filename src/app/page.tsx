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
import { Testimonials } from "../components/Testimonials";
import { Work } from "../components/Work";
import { caseStudyArreguin, caseStudyLux } from "../lib/contact";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: "Websites That Help East Texas Businesses Get Customers",
  description:
    "Custom websites for East Texas service businesses in Nacogdoches. Flat pricing from $400. Work directly with the developer. Free website game plan — no obligation.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Header variant="hero" />
      <main id="main" className="flex-1">
        <Hero />
        <Work />
        <CaseStudy study={caseStudyLux} />
        <CaseStudy study={caseStudyArreguin} tone="surface" />
        <Testimonials />
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
