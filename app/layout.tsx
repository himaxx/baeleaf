import "./globals.css"
import "./fonts.css"
import { Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Keep Playfair as fallback
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata = {
  title: "Baeleaf Café | Interactive Menu",
  description: "Explore our delicious menu featuring the finest ingredients and flavors",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload fonts */}
        <link rel="preload" href="/fonts/rustico.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.className} font-body`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}