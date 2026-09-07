import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider, ThemeProvider } from '@archery/ui';

export const metadata: Metadata = {
  title: 'ArcherHub Thailand | แพลตฟอร์มระบบจองสนามยิงธนู Multi-Vendor',
  description: 'ระบบจองและจัดการสนามยิงธนูสัญชาติไทย เชื่อมต่อ LINE OA + LIFF พร้อมระบบผังสนามสดและสมาชิก',
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
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider defaultTheme="dark">
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
