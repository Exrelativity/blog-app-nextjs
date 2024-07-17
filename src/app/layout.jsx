"use client"
import "./globals.css";
import store from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="block h-screen w-screen bg-[#F5F5F5] text-black">
          <Header />
          <ToastContainer />
          {children}
        </body>
      </Provider>
    </html>
  );
}
