import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Quiz from "./components/Quiz";
import Testimonials from "./components/Testimonials";
import CTACalendly from "./components/CTACalendly";

/* ═══════════════════════════════════════════════════════════
   HOME PAGE — Shift Agency
   ═══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Quiz />
      <Testimonials />
      <CTACalendly />
    </>
  );
}
