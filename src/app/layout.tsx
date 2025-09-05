import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from '@/components/analytics';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Excalidraw Table Maker',
  description: 'Create/Generate Excalidraw Table with AI assistance.',
  icons: [
    {
        "url": "/icons/android_chrome_192X192.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    {
        "url": "/icons/android_chrome_512X512.png",
        "sizes": "512x512",
        "type": "image/png"
    },
    {
        "url": "/icons/apple_touch_icon.png",
        "sizes": "180x180",
        "type": "image/png"
    },
    {
        "url": "/icons/favicon_16X16.png",
        "sizes": "16x16",
        "type": "image/png"
    },
    {
        "url": "/icons/favicon_32X32.png",
        "sizes": "32x32",
        "type": "image/png"
    },
    {
        "url": "/icons/favicon_96X96.png",
        "sizes": "96x96",
        "type": "image/png"
    },
    {
        "url": "/icons/mstile_150X150.png",
        "sizes": "150x150",
        "type": "image/png"
    },
    {
      url: '/icons/safari_pinned_tab.svg',
      rel: 'mask-icon',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Suspense>
            <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
