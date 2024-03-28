const API_KEY = 'f97044d9ea249d273a838a6ac0e8df2f';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = BASE_URL + '/search/movie';
const RANDOM_URL = BASE_URL + '/movie/popular';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies-container');

document.addEventListener('DOMContentLoaded', () => {
    // Display random movies when the page loads
    getRandomMovies();
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    try {
        const response = await fetch(`${SEARCH_URL}?api_key=${API_KEY}&query=${searchTerm}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function getRandomMovies() {
    try {
        const response = await fetch(`${RANDOM_URL}?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <p>${movie.overview}</p>
        `;
        moviesContainer.appendChild(movieCard);
    });
}
