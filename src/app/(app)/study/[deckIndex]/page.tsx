"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGeneratedDecks } from '@/contexts/generated-decks-context';
import Flashcard from '@/components/flashcard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function StudyPage() {
  const router = useRouter();
  const params = useParams();
  const { decks } = useGeneratedDecks();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const deckIndex = Number(params.deckIndex);
  const deck = useMemo(() => decks.length > deckIndex ? decks[deckIndex] : null, [decks, deckIndex]);

  useEffect(() => {
    // If there's no deck (e.g., page refresh), redirect to dashboard
    if (decks.length === 0) {
      router.replace('/dashboard');
    }
  }, [decks, router]);

  if (!deck) {
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading deck...</p>
      </div>
    );
  }

  const cards = deck.cards;
  const progress = ((currentCardIndex) / cards.length) * 100;

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setShowCompletion(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentCardIndex(0);
    setShowCompletion(false);
  }

  if (showCompletion) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
        <Card className="w-full">
            <CardContent className="p-8">
                <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
                <p className="text-muted-foreground mb-6">You've completed the study session for "{deck.title}".</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleRestart}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Study Again
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">
                            Back to Dashboard
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-4 self-start" asChild>
            <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard</Link>
        </Button>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{deck.title}</h1>
        <p className="text-muted-foreground">Card {currentCardIndex + 1} of {cards.length}</p>
        <Progress value={progress} className="mt-2" />
      </div>

      <div className="flex-grow flex items-center justify-center my-6">
        {cards[currentCardIndex] && (
          <Flashcard 
            key={cards[currentCardIndex].id} 
            question={cards[currentCardIndex].question} 
            answer={cards[currentCardIndex].answer} 
          />
        )}
      </div>
      
      <div className="flex justify-center items-center mt-6">
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-card border">
            <p className="text-sm text-muted-foreground self-center">How well did you know this?</p>
            <div className="flex gap-2">
                <Button variant="destructive" className="flex-1" onClick={() => handleNextCard()}>Hard</Button>
                <Button variant="secondary" className="flex-1" onClick={() => handleNextCard()}>Good</Button>
                <Button className="flex-1" onClick={() => handleNextCard()}>Easy</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
