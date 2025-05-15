import "@/styles/app.sass";
import { headers } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Inter, Rubik } from "next/font/google";
import { Providers } from "./providers";
import { inter } from '@/fonts';
import '@/styles/globals.css';
import SessionCheck from './components/SessionCheck';

const rubik = Rubik({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-rubik",
});

export const metadata: Metadata = {
    title: "SimpleSocial",
    description: "SimpleSocial: Social Network UI Kit",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${rubik.className} ${inter.variable}`}>
            <head>
                {/* Description no longer than 155 characters */}
                <meta
                    name="description"
                    content="SimpleSocial: Social Network UI Kit"
                />
                {/* Product Name */}
                <meta
                    name="product-name"
                    content="SimpleSocial: Social Network UI Kit"
                />
                {/* Twitter Card data */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@ui8" />
                <meta
                    name="twitter:title"
                    content="SimpleSocial: Social Network UI Kit"
                />
                <meta
                    name="twitter:description"
                    content="Minimal Social Media UI Design Kit + Prototype + Code"
                />
                <meta name="twitter:creator" content="@ui8" />
                {/* Twitter Summary card images must be at least 120x120px */}
                <meta
                    name="twitter:image"
                    content="https://ui8-simple-social.vercel.app/twitter-card.png"
                />
                {/* Open Graph data for Facebook */}
                <meta
                    property="og:title"
                    content="SimpleSocial: Social Network UI Kit"
                />
                <meta property="og:type" content="Article" />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/bento-cards-simplesocial"
                />
                <meta
                    property="og:image"
                    content="https://ui8-simple-social.vercel.app/fb-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Minimal Social Media UI Design Kit + Prototype + Code"
                />
                <meta
                    property="og:site_name"
                    content="SimpleSocial: Social Network UI Kit"
                />
                <meta property="fb:admins" content="132951670226590" />
                {/* Open Graph data for LinkedIn */}
                <meta
                    property="og:title"
                    content="SimpleSocial: Social Network UI Kit"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/bento-cards-simplesocial"
                />
                <meta
                    property="og:image"
                    content="https://ui8-simple-social.vercel.app/linkedin-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Minimal Social Media UI Design Kit + Prototype + Code"
                />
                {/* Open Graph data for Pinterest */}
                <meta
                    property="og:title"
                    content="SimpleSocial: Social Network UI Kit"
                />
                <meta
                    property="og:url"
                    content="https://ui8.net/ui8/products/bento-cards-simplesocial"
                />
                <meta
                    property="og:image"
                    content="https://ui8-simple-social.vercel.app/pinterest-og-image.png"
                />
                <meta
                    property="og:description"
                    content="Minimal Social Media UI Design Kit + Prototype + Code"
                />
            </head>
            <body className={`${rubik.className} ${inter.variable}`}>
                <Providers>
                    <SessionCheck />
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export async function generateViewport(): Promise<Viewport> {
    const userAgent = headers().get("user-agent");
    const isiPhone = /iphone/i.test(userAgent ?? "");
    return isiPhone
        ? {
              width: "device-width",
              initialScale: 1,
              maximumScale: 1, // disables auto-zoom on ios safari
          }
        : {};
}
