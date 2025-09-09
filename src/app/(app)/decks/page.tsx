import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, BookOpen } from 'lucide-react';
import type { Deck } from '@/types';

const mockDecks: (Omit<Deck, 'cards'> & { cards: any[] })[] = [
  { id: 'deck-1', title: 'Biology: The Cell', cards: new Array(50) },
  { id: 'deck-2', title: 'History of Ancient Rome', cards: new Array(120) },
  { id: 'deck-3', title: 'React Hooks', cards: new Array(25) },
  { id: 'deck-4', title: 'Organic Chemistry Reactions', cards: new Array(88) },
  { id: 'deck-5', title: 'Spanish Vocabulary: Food', cards: new Array(64) },
  { id: 'deck-6', title: 'The Solar System', cards: new Array(42) },
];


export default function DecksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Decks</h1>
          <p className="text-muted-foreground">Manage your study decks and create new ones.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Deck
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockDecks.map((deck) => (
          <Card key={deck.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {deck.title}
              </CardTitle>
              <CardDescription>{deck.cards.length} cards</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={`/decks/${deck.id}/study`}>Study Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
