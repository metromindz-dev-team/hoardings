import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-1/Blogs";
import Categories from "@/components/common/Categories";
import Cities from "@/components/homes/home-1/Cities";
import HelpCenter from "@/components/homes/home-1/HelpCenter";
import Hero from "@/components/homes/home-1/Hero";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";
import Partners from "@/components/homes/home-1/Partners";
import Properties from "@/components/homes/home-1/Properties";
import Properties2 from "@/components/homes/home-1/Properties2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import WhyChoose from "@/components/homes/home-1/WhyChoose";
import Contact from "@/components/homes/home-1/Contact";
import Banners from "@/components/homes/home-1/banners";

export const metadata = {
  title: "Home 01 || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function Home() {
  return (
    <div id="homePage">
      <Header1 />
      <Hero />
      <div className="main-content ">
        <HelpCenter />
        <Categories />
        <Properties />
        <Cities />
        <Banners />
        <Testimonials />
        <WhyChoose />
        <Contact />
        {/* <Properties2 /> */}
        <Partners />
      </div>
      <Footer1 />
    </div>
  );
}
