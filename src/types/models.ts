export type Tag =
  | "lore"
  | "podcast"
  | "livre-audio"
  | "livre-audio-original"
  | "musique"
  | "figurines"
  | "news"
  | "jeux-video";

export interface Channel {
  name: string;
  url: string;
  description: string;
  status: "active" | "pause" | "dead";
  tags: Tag[];
}
