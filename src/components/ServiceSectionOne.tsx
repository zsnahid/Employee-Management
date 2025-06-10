import Image from "next/image";
import { Section, SectionDescription, SectionImage } from "./Section";

export default function ServiceSectionOne() {
  return (
    <Section>
      <SectionDescription>
        <h2>Run Payroll in Minutes, Not Hours</h2>
        <p>
          SyncoHR is the easiest and best HRIS for payroll processing.
          Streamline hours, time off, and benefits into payroll, Plus, we handle
          your quarterly and annual tax filings.
        </p>
        <ul className="list-disc list-inside space-y-6">
          <li>
            Automatically import hours, time-off benefits, and deductions for
            easy payroll processing.
          </li>
          <li>
            Minimize errors with automatic tax and withholding calculations.
          </li>
          <li>
            Let us handle tax filings and paperwork including end-of-year W-2
            and 1099-NEC preparation and filing.
          </li>
          <li>
            Remain compliant with our easy-to-use tax filing and payroll
            automation.
          </li>
        </ul>
      </SectionDescription>
      <SectionImage className="justify-self-end">
        <Image
          src="/home-page-1.png"
          alt="Picture of Payroll UI"
          width={500}
          height={500}
        />
      </SectionImage>
    </Section>
  );
}
