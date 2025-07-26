import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import QueryProvider from "../components/QueryProvider";
import { ReduxProvider } from "../components/ReduxProvider";
import { UserSync } from "../components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PipeCode - Data Engineering Practice Platform",
  description: "The ultimate platform for data engineers to practice problems, learn new skills, and advance their careers. Practice ETL, SQL, streaming, and more.",
};

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* Wrap the entire app with Redux Provider for state management */}
          <ReduxProvider>            {/* Wrap the entire app with QueryProvider for API calls */}
            <QueryProvider>
              {/* Sync Clerk user state with Redux */}
              <UserSync />
              
              {/* Main Navigation */}
              {/* <Navigation /> */}
            
            {/* Original Header with Auth Buttons */}
            {/* <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header> */}
            {children}
          </QueryProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
