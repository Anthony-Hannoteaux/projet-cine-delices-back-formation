
//Déclaration d’une fonction asynchrone exportée. Elle prend deux paramètres avec valeurs par défaut
export default async function fetchCatalogue(type = 'movie', page = 1) {
  const API_KEY = process.env.TMDB_API_KEY;

  //En fonction du type (tv ou movie), on choisit l’endpoint TMDb correspondant
  const endpoint = type === 'tv'
    ? `https://api.themoviedb.org/3/discover/tv`
    : `https://api.themoviedb.org/3/discover/movie`;

    //Construction de l’URL avec la clé API et le numéro de page souhaité
  const url = `${endpoint}?api_key=${API_KEY}&page=${page}`;

  //Appel à l’API avec fetch() puis conversion de la réponse en JSON.
  const response = await fetch(url);
  const data = await response.json();

  //On extrait le tableau results et on mappe chaque élément pour ne garder que les données utiles
  return data.results.map(item => ({
    tmdb_id: item.id,
    title: item.title || item.name,
    overview: item.overview,
    poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    media_type: type
  }));
}
