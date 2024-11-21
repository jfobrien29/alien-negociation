'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <div className="relative z-10">
        <div className="py-12 md:py-24 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent rounded-lg animate-[increase-height-and-fade-in_0.5s_ease-out_forwards]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px] animate-[fade-in-down_0.4s_ease-out_forwards]"></div>
          <h1 className="font-bold text-center relative animate-[fade-in-down_0.4s_ease-out_forwards]">
            <span className="font-bold md:text-9xl text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent py-8">
              Asteroid Apocalypse
            </span>
          </h1>
          <div className="flex gap-4 mt-8 animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-300">
            <Link href="/alien">
              <Button>Play as Alien</Button>
            </Link>
            <Link href="/human">
              <Button variant="outline">Play as Human</Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center text-sm text-muted-foreground">
        <div className="flex gap-2 items-center justify-center">
          <p>Asteroid Apocalypse © 2024</p>
        </div>
      </footer>
    </div>
  );
}
