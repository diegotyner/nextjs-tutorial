import type { Metadata } from "next";
import "@/styles/globals.css";
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>

          <div className='app'>
            <Nav />
            {children}
          </div>
        </Provider>
      </body>

    </html>
  )
}
