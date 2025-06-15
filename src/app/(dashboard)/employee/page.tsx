import { SignedIn, UserButton } from "@clerk/nextjs";
export default function EmployeeDashboard() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
