export const getPokemon = async (number) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    return pokemon;
  } catch (err) {}
};
