import Image from "next/image";
import { Section, SectionDescription, SectionImage } from "./Section";

export default function ServiceSectionTwo() {
  return (
    <Section>
      <SectionImage>
        <Image
          src="/home-page-1.png"
          alt="Picture of SyncoHR UI"
          width={500}
          height={500}
        />
      </SectionImage>
      <SectionDescription>
        <h2>Have all your employee data at your fingertips</h2>
        <p>
          Store all your employee information in one secure database that you
          can access from anywhere.
        </p>
        <ul className="list-inside list-disc space-y-6">
          <li>
            Important documents, like W-4s, I-9s, and any other signed employee
            files.
          </li>
          <li>
            Track all personal and contact info, including emergency contacts.
            Employees can even update their own info when it changes.{" "}
          </li>
          <li>
            Organize job info, like job title, pay rates and pay rate history,
            assigned assets, workers’ comp codes, performance notes, and more.
          </li>
          <li>
            Stay on top of employee certifications and trainings, storing things
            like proof of licenses and expiration dates.
          </li>
        </ul>
      </SectionDescription>
    </Section>
  );
}
