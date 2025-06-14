"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "./_actions";

export default function OnboardingComponent() {
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);

    if (res?.message) {
      // Reload the user's data from the clerk API
      await user?.reload;
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };

  return (
    <div className="**:space-y-2">
      <h4>Complete onboarding</h4>

      <form action={handleSubmit}>
        <div>
          <Label htmlFor="userName">Name</Label>
          <Input type="text" name="userName" required />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input type="text" name="role" required />
        </div>
        {error && <p className="text-destructive">Error: {error}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
