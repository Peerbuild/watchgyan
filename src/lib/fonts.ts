import { DM_Sans, Playfair_Display } from 'next/font/google';

export const PlayflairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export const DMSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});
