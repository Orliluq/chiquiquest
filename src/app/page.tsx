'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHero } from '@/lib/hero-store';

export default function Home() {
  const { hero } = useHero();
  const router = useRouter();

  useEffect(() => {
    if (hero.name) {
      router.push('/dashboard');
    } else {
      router.push('/onboarding');
    }
  }, [hero.name, router]);

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-cyan-400 font-mono text-sm">Initializing...</p>
      </div>
    </div>
  );
}
