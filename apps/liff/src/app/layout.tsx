import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider, ThemeProvider } from '@archery/ui';

export const metadata: Metadata = {
  title: 'จองสนามยิงธนูผ่าน LINE OA | ArcherHub LIFF',
  description: 'เลือกระยะ เลนยิง และอุปกรณ์เช่าได้ทันทีผ่าน LINE',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('archerhub_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(t);
                document.documentElement.setAttribute('data-theme', t);
                document.documentElement.style.colorScheme = t;
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider defaultTheme="dark">
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
