import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in - BigStop Inventory",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
