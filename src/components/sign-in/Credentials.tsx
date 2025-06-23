"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function Credentials() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const email = "john.doe@techcorp.com";
  const password = "sUp0$oKmdZX25*";

  const copyToClipboard = async (text: string, type: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <p className="text-lg font-semibold">Credentials</p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-muted-foreground font-semibold">
                Email:{" "}
              </span>
              <span className="font-mono text-sm">{email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(email, "email")}
              className="ml-2"
            >
              {copiedEmail ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-muted-foreground font-semibold">
                Password:{" "}
              </span>
              <span className="font-mono text-sm">{password}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(password, "password")}
              className="ml-2"
            >
              {copiedPassword ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
