"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateInitialDecks } from '@/ai/flows/generate-initial-decks-from-input';
import { useGeneratedDecks } from '@/contexts/generated-decks-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ArrowRight } from 'lucide-react';
import type { Deck } from '@/types';

const formSchema = z.object({
  sourceMaterial: z.string().min(10, {
    message: "Please provide at least 10 characters of source material.",
  }),
});

export default function AiDeckGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDecks, setGeneratedDecksState] = useState<Deck[]>([]);
  const { setDecks: setContextDecks } = useGeneratedDecks();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceMaterial: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDecksState([]);
    try {
      const result = await generateInitialDecks(values);
      if (result && result.decks) {
        // Add a temporary unique ID to each deck and card for key props and routing
        const decksWithIds: Deck[] = result.decks.map((deck, deckIndex) => ({
          ...deck,
          id: `gen-${deckIndex}-${Date.now()}`,
          cards: deck.cards.map((card, cardIndex) => ({
            ...card,
            id: `gen-${deckIndex}-${cardIndex}-${Date.now()}`,
          })),
        }));
        
        setGeneratedDecksState(decksWithIds);
        setContextDecks(decksWithIds);

        toast({
          title: "Decks Generated!",
          description: `${decksWithIds.length} new decks are ready for you to study.`,
        });
      }
    } catch (error) {
      console.error("Error generating decks:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating your decks. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleStudy = (deckIndex: number) => {
    router.push(`/study/${deckIndex}`);
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Wand2 className="text-accent" />
            Smart Deck Creation
          </CardTitle>
          <CardDescription>
            Paste a textbook chapter, your notes, or a URL to an article, and let our AI create study decks for you in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="sourceMaterial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Source Material</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'The Krebs cycle is a series of chemical reactions used by all aerobic organisms to release stored energy...'"
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Decks
                    <Wand2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {generatedDecks.length > 0 && (
        <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Your New Decks</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {generatedDecks.map((deck, index) => (
                    <Card key={deck.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{deck.title}</CardTitle>
                            <CardDescription>{deck.cards.length} cards</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-end">
                            <Button className="w-full" onClick={() => handleStudy(index)}>
                                Study this deck <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </>
  );
}
