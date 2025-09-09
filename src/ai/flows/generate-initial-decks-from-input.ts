'use server';
/**
 * @fileOverview Generates initial flashcard decks from user input (textbook title, URL, or notes).
 *
 * - generateInitialDecks - A function that generates flashcard decks.
 * - GenerateInitialDecksInput - The input type for the generateInitialDecks function.
 * - GenerateInitialDecksOutput - The return type for the generateInitialDecks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialDecksInputSchema = z.object({
  sourceMaterial: z.string().describe('The textbook title, URL, or notes to generate flashcards from.'),
});
export type GenerateInitialDecksInput = z.infer<typeof GenerateInitialDecksInputSchema>;

const GenerateInitialDecksOutputSchema = z.object({
  decks: z.array(
    z.object({
      title: z.string().describe('The title of the deck.'),
      cards: z.array(
        z.object({
          question: z.string().describe('The question on the flashcard.'),
          answer: z.string().describe('The answer to the question.'),
        })
      ).describe('The flashcards in the deck.')
    })
  ).describe('The generated flashcard decks.'),
});
export type GenerateInitialDecksOutput = z.infer<typeof GenerateInitialDecksOutputSchema>;

export async function generateInitialDecks(input: GenerateInitialDecksInput): Promise<GenerateInitialDecksOutput> {
  return generateInitialDecksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialDecksPrompt',
  input: {schema: GenerateInitialDecksInputSchema},
  output: {schema: GenerateInitialDecksOutputSchema},
  prompt: `You are a helpful study assistant that generates flashcard decks from provided source material.

  The source material can be a textbook title, URL, or notes.

  Generate question and answer pairs from the source material.

  Return an array of decks.  Each deck should have a title and an array of flashcards.

  Here is the source material: {{{sourceMaterial}}}`,
});

const generateInitialDecksFlow = ai.defineFlow({
    name: 'generateInitialDecksFlow',
    inputSchema: GenerateInitialDecksInputSchema,
    outputSchema: GenerateInitialDecksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
