import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Grocery Shop",
  description: "Online grocery shopping market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
