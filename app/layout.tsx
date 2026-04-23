import './globals.css';

export const metadata = {
  title: 'FAQ Templates',
  description: 'Browse and copy beautiful FAQ templates'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="min-h-screen px-6 py-10">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
