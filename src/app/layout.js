"use client";
import "react-toastify/dist/ReactToastify.css";
import { Assistant } from "next/font/google";
import { ToastContainer } from "react-toastify";
import AllProviders from "@/Components/Layout/AllProviderWrap";
import { useEffect } from "react";
import 'react-tooltip/dist/react-tooltip.css'
import "@/Styles/globals.css";
import 'quill/dist/quill.snow.css';




const assistant = Assistant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Saas Global Admin</title>
      </head>
      <body
        className={`${assistant.className} antialiased`}
        suppressHydrationWarning
      >
        <ToastContainer />
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
