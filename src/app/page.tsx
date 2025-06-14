import Services from "@/components/Services";
import ServiceSectionFour from "@/components/ServiceSectionFour";
import ServiceSectionOne from "@/components/ServiceSectionOne";
import ServiceSectionThree from "@/components/ServiceSectionThree";
import ServiceSectionTwo from "@/components/ServiceSectionTwo";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <Services />
      <ServiceSectionOne />
      <ServiceSectionTwo />
      <ServiceSectionThree />
      <ServiceSectionFour />
    </>
  );
}
