import { cn } from "@/lib/utils";

function Section({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section"
      className={cn("grid grid-cols-1 md:grid-cols-2 items-center gap-8", className)}
      {...props}
    />
  );
}

function SectionImage({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="section-image" className={cn(className)} {...props} />;
}

function SectionDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="section-description" className={cn("space-y-4",className)} {...props} />
  );
}

export { Section, SectionImage, SectionDescription };
