import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FlowingWordCloud from "@/components/FlowingWordCloud";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data and Dynamics Summit",
  description: "Join us for the Data and Dynamics Summit conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {/* Hero Banner */}
          <div className="h-[25vh] bg-primary-main flex items-center relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col relative z-10">
                <h1 className="text-5xl font-bold text-primary-dark">DDS 2025</h1>
                <h2 className="text-3xl font-bold text-primary-dark">Data and Dynamics Summit</h2>
              </div>
            </div>
            <FlowingWordCloud />
          </div>
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
