"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when the question changes
  useEffect(() => {
    setIsFlipped(false);
  }, [question]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-80 perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 transform-style-3d',
          { 'rotate-y-180': isFlipped }
        )}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="w-full h-full flex flex-col items-center justify-center text-center p-6 shadow-xl">
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-2">Question</p>
              <p className="text-2xl font-semibold">{question}</p>
            </CardContent>
          </Card>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Card className="w-full h-full flex flex-col items-center justify-center text-center p-6 shadow-xl bg-secondary">
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-2">Answer</p>
              <p className="text-xl font-medium">{answer}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
