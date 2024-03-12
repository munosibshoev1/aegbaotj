"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// import "../i18next"

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}