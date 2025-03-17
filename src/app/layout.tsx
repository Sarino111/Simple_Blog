import type { Metadata } from "next";
import "./globals.css";
import { BlogProvider } from '@/context/BlogContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "Blog",
  description: "This is Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <BlogProvider>
          <Header />
          {children}
        </BlogProvider>
      </body>
    </html>
  );
}
