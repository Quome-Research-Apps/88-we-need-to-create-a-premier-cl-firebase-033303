export interface Card {
  id: string;
  question: string;
  answer: string;
}

export interface Deck {
  id: string;
  title: string;
  cards: Card[];
}
