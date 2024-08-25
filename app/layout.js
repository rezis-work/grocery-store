"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import LoginButton from "./_components/LoginButton";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptions } from "@/constants/const";

const outfit = Outfit({ subsets: ["latin"] });

// export const metadata = {
//   title: "Grocery Shop",
//   description: "Online grocery shopping market",
// };

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider options={initialOptions}>
      <html lang="en">
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <body className={outfit.className}>
            <Header>
              <LoginButton />
            </Header>
            {children}
            <Toaster />
          </body>
        </UpdateCartContext.Provider>
      </html>
    </PayPalScriptProvider>
  );
}
