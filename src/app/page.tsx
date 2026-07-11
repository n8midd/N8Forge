import { Demos } from "../components/Demos";
import { Extras } from "../components/Extras";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { RequestForm } from "../components/RequestForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <Demos />
        <Extras />
        <RequestForm />
      </main>
      <Footer />
    </>
  );
}
