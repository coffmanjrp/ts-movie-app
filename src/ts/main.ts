const API_KEY = '2aa716ddcb8a286f03dced0e007bd161';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

const main = document.querySelector('#main .container') as HTMLElement;
const form = document.getElementById('form') as HTMLFormElement;
const search = document.getElementById('search') as HTMLInputElement;

function getClassByRate(vote: string | number) {
  if (vote >= 8) {
    return 'green';
  }
  if (vote >= 5) {
    return 'orange';
  }
  return 'red';
}

function showMovies(movies: HTMLElement[]) {
  main.innerHTML = '';

  movies.forEach((movie: HTMLElement) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      <p>${overview}</p>
    </div>
    `;

    main.appendChild(movieEl);
  });
}

async function getMovies(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

// Get initial movies
getMovies(API_URL);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm: string | null = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
