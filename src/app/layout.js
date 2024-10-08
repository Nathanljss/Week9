import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Nav from "@/app/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <h1>Waffle</h1>
            <Nav />
            <SignedIn>
              <p>
                Hello there {user?.firstName} {user?.lastName}
              </p>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
