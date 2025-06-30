export default async function searchMovie(query) {
  const API_KEY = process.env.TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Aucun film trouvé pour ce titre");
  }

  const film = data.results[0];
  console.log(`Film trouvé : ${film.title} (ID TMDb = ${film.id})`);

  return film;
}
