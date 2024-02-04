import React from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { IMAGES_AUTHOR } from '@/config/author-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: `The Zooming App - Explore ${IMAGES_AUTHOR}' Pictures !`,
  description: `Experience the thrill of 'The Zooming App,' where ${IMAGES_AUTHOR}' visuals come to life. Dive into detailed images and discover hidden wonders as you zoom in with this unique app.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
