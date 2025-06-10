import Image from "next/image";
import { Section, SectionDescription, SectionImage } from "./Section";

export default function ServiceSectionThree() {
  return (
    <Section>
      <SectionDescription>
        <h2>Find and hire the perfect candidates</h2>
        <p>
          Our HRIS helps you find the right candidates and start the interview
          process sooner.
        </p>
        <ul className="list-inside list-disc space-y-6">
          <li>
            Improve recruitment by publishing job listings on up to 25,000 job
            boards with a few clicks.
          </li>
          <li>
            Avoid discriminatory job descriptions and qualifications with help
            from SyncoHR.
          </li>
          <li>
            Track candidates throughout the hiring process for easy
            collaboration and decision making.
          </li>
          <li>
            Easily send an offer letter with custom templates provided by Eddy.
          </li>
        </ul>
      </SectionDescription>
      <SectionImage className="justify-self-end">
        <Image
          src="/home-page-3.png"
          alt="Picture of SyncoHR UI"
          width={500}
          height={500}
        />
      </SectionImage>
    </Section>
  );
}
