import localFont from "next/font/local";

// Cabinet Grotesk (Fontshare, self-hosted) — headings only. Not on Google
// Fonts, so it's loaded from local woff2 files rather than next/font/google.
export const cabinetGrotesk = localFont({
  src: [
    { path: "./cabinetgrotesk-regular.woff2", weight: "400", style: "normal" },
    { path: "./cabinetgrotesk-medium.woff2", weight: "500", style: "normal" },
    { path: "./cabinetgrotesk-bold.woff2", weight: "700", style: "normal" },
    { path: "./cabinetgrotesk-extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});
