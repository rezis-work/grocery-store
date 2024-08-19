import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import LoginButton from "./_components/LoginButton";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Grocery Shop",
  description: "Online grocery shopping market",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Header>
          <LoginButton />
        </Header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
