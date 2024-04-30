export type Character = {
  id: number;
  name: string;
  image: string;
  gender: "female" | "male" | "genderless" | "unknown";
  status: "Alive" | "Dead" | "unknown";
  species: string;
  location: { name: string; url: string };
  episode: string[];
  type: string;
  created: string;
};
