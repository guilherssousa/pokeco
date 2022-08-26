export interface Pokemon {
  id: string;
  name: string;
  location_area_encounters: string;
  sprites: PokemonSprites;
}

export interface PokemonSprites {
  front_default: string;
  font_shiny: string;
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
}
