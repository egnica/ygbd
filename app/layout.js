import { Quicksand, Great_Vibes } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quicksand.variable} ${greatVibes.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
