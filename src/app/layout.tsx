// Import Components
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CustomLayout from "./layouts/CustomLayout";

// styles
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

// fonts
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// custom redux provider
import { ReduxProvider } from "@/redux/provider";

// import "@/app/configs/i18next"

// meta data
export const metadata = {
  title: "Home Page",
  description: "Giz projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */}
        <ReduxProvider>
          <CustomLayout>
            {children}
          </CustomLayout>
        </ReduxProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
