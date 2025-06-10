import Image from "next/image";
import { Section, SectionDescription, SectionImage } from "./Section";

export default function ServiceSectionFour() {
  return (
    <Section>
      <SectionImage>
        <Image
          src="/home-page-4.png"
          alt="Picture of SyncoHR UI"
          width={500}
          height={500}
        />
      </SectionImage>
      <SectionDescription>
        <h2>Onboard like a pro</h2>
        <p>
          Eddy makes it easy to grow your business. Improve new hire onboarding
          with templated tasks and e-signatures on I-9s, W-4s, non-competes, and
          more.
        </p>
        <ul className="list-inside list-disc space-y-6">
          <li>
            Get a new hire set up in minutes with onboarding tasks and new hire
            packet templates.
          </li>
          <li>
            Automatically assign tasks for all documents your new hires need to
            sign (I-9, W-4, state tax forms, custom forms) and safely store them
            in our database.
          </li>
          <li>
            Stay on top of each new hire’s onboarding with easy progress
            tracking.
          </li>
        </ul>
      </SectionDescription>
    </Section>
  );
}
