import Hero from "@/components/HomePage/Hero";
import Products from "@/components/HomePage/Products";
import About from "./about/page";
import Testimonials from "@/components/HomePage/Testimonial";
import Footer from "@/components/HomePage/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Products />
      <About />
      <Testimonials />
      <Footer />
    </div>

  );
}