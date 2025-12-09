import './globals.css';

export const metadata = {
  title: 'Hackatonlolo',
  description: 'World saving website built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
