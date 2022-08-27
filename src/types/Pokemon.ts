export interface Pokemon {
  id: string;
  name: string;
  location_area_encounters: string;
  sprites: PokemonSprites;
}

export interface ILAE {
  location_area: {
    name: string;
    url: string;
  };
  version_details: [
    {
      max_chance: number;
      version: Version[];
      encounter_details: EncounterDetails[];
    }
  ];
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

export interface EncounterDetails {
  chance: number;
  max_level: number;
  min_level: number;
  method: Method;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version {
  name: string;
  url: string;
}
