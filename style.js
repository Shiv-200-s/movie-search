const API_KEY = "api key"; #past your api key here

async function searchMovie() {
  const movieName = document.getElementById("movieInput").value;
  const selectedGenre = document.getElementById("genreSelect").value.toLowerCase();
  const selectedLanguage = document.getElementById("languageSelect").value.toLowerCase();
  const movieDetails = document.getElementById("movieDetails");

  if (!movieName) {
    alert("Please enter a movie title.");
    return;
  }

  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      const genres = data.Genre.toLowerCase();
      const languages = data.Language.toLowerCase();

      if (
        (selectedGenre === "" || genres.includes(selectedGenre)) &&
        (selectedLanguage === "" || languages.includes(selectedLanguage))
      ) {
        movieDetails.innerHTML = `
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Language:</strong> ${data.Language}</p>
          <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <img src="${data.Poster}" alt="Poster">
        `;
      } else {
        movieDetails.innerHTML = `<p>No results match your selected filters.</p>`;
      }
    } else {
      movieDetails.innerHTML = `<p>Movie not found.</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    movieDetails.innerHTML = `<p>Error fetching data.</p>`;
  }
}
