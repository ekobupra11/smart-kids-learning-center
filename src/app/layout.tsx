import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Kids Learning Center",
  description:
    "MVP website dan sistem manajemen bimbel SD berbasis AI untuk pendaftaran, kelas, pembayaran, absensi, nilai, dan laporan perkembangan."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
