import { Pokemon } from "@/types/Pokemon";

export function pokemonSearch(list: Pokemon[], keyword: string) {
  const sanitizedKeyword = keyword.toLowerCase();

  return list.filter((item) => {
    return (
      item.name.toLowerCase().includes(sanitizedKeyword.toLowerCase()) ||
      item.id.toString().includes(sanitizedKeyword)
    );
  });
}
