"use client"
 
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Script from "next/script"
 
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            return;
        }

        if (pathname && GA_TRACKING_ID) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
            window.gtag("config", GA_TRACKING_ID, {
                page_path: url,
            })
        }
    }, [pathname, searchParams])


    if (process.env.NODE_ENV !== 'production') {
        return null;
    }
 
  return (
    <>
        <Script strategy="afterInteractive" 
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
        <Script id="google-analytics" strategy="afterInteractive"
            dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
            });
            `,
            }}
        />
    </>
  )
}