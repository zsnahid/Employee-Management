export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      role?: "admin" | "employee" | "hr";
    };
  }
}
