export const metadata = { title: 'Sanity Studio | Late Culture' }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <style>{`
          .glass-nav, nav, .nav, [class*="Nav"] { display: none !important; }
          .footer, footer, [class*="Footer"] { display: none !important; }
          body { overflow: auto; }
          #__next { height: 100vh; }
        `}</style>
        {children}
      </body>
    </html>
  )
}
