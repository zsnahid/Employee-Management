import Services from "@/components/Services";
import ServiceSectionFour from "@/components/ServiceSectionFour";
import ServiceSectionOne from "@/components/ServiceSectionOne";
import ServiceSectionThree from "@/components/ServiceSectionThree";
import ServiceSectionTwo from "@/components/ServiceSectionTwo";
import User from "./data";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <Services />
      <User />
      <ServiceSectionOne />
      <ServiceSectionTwo />
      <ServiceSectionThree />
      <ServiceSectionFour />
    </>
  );
}
