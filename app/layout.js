import './globals.css';
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const fancy = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-fancy',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Mostakim Hossain — Portfolio',
  description: 'Full-stack developer building clean, fast web experiences.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${fancy.variable}`}>
      <body>{children}</body>
    </html>
  );
}
