'use client';

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

const messages = [
  "You're doing amazing 💫",
  "Keep going — you're almost there!",
  "You're smarter than you think ✨",
  "Every click is a celebration 🎉",
  "You've got this!",
  "You're a star 🌟",
  "You're making progress — even if it doesn’t feel like it",
  "This moment is yours 💖",
];

export default function Home() {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
      });

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);

      // Clear message after 2.5s
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setMessage('');
      }, 2500);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <main className="flex items-center justify-center h-screen w-screen bg-pink-50 relative overflow-hidden">
      <h1 className="text-3xl font-bold text-gray-800 absolute top-8">Click anywhere!</h1>
      {message && (
        <div className="absolute bottom-12 text-xl px-6 py-3 rounded-lg bg-white shadow-lg text-gray-800 animate-fade-in">
          {message}
        </div>
      )}
    </main>
  );
}
