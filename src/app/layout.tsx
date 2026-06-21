import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { HeroProvider } from '@/lib/hero-store';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'ChiquiQuest AI | Career RPG Engine',
  description: 'Transform your professional career goals into an epic RPG progression system. Level up your tech skills, complete quests, and become a legendary developer.',
  keywords: ['Career Planning', 'Developer RPG', 'Tech Skills', 'Gamification', 'AI Mentor', 'Software Engineering'],
  authors: [{ name: 'ChiquiQuest Team' }],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning={true} lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#050508] text-slate-200 font-sans antialiased min-h-screen selection:bg-cyan-500/30" suppressHydrationWarning>
        <HeroProvider>
          {children}
        </HeroProvider>
      </body>
    </html>
  );
}
