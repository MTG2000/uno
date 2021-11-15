export interface Player {
  id: string;
  name: string;
  avatar: string;
  cards: Card[];
  isBot?: boolean;
}

export interface Card {
  id?: string;
  layoutId?: string;
  digit?: number;
  color?: "red" | "blue" | "green" | "yellow" | "black";
  action?: "reverse" | "skip" | "draw two" | "draw four" | "wild";
  flip?: boolean;
  rotationY?: number;
  playable?: boolean;
  forPlayer?: number;
}
