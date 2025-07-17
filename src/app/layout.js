"use client";
import "react-toastify/dist/ReactToastify.css";
import "@/Styles/globals.css";
import { Assistant } from "next/font/google";
import { store } from "@/Redux/Store";
import { ToastContainer } from "react-toastify";
import ReduxProviderWrap from "@/Components/Layout/ReduxProviderWrap";
import { Provider } from "react-redux";


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
        <Provider store={store}>
          <ToastContainer />
          <ReduxProviderWrap>{children}</ReduxProviderWrap>
        </Provider>
      </body>
    </html>
  );
}
