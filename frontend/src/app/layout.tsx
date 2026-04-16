import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AXON LOGISTICS - Driver App",
  description: "Sistema de gestión de transporte para choferes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
