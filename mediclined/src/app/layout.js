import localFont from "next/font/local";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-[100vw] h-[100vh]">
      <body className="h-full w-full">
        {children}
      </body>
    </html>
  );
}
