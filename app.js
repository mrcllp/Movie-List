
// Movie List Previous project 

class Movie {
    constructor(title, director, year) {
        this.title = title;
        this.director = director;
        this.year = year;
    }
}
// Ui class: Handle ui tasks
class UI {
    static displayMovies() {
        const movies = Store.getMovies();

        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie) {
        const list = document.querySelector('#movie-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        
       
        list.appendChild(row);
    }

    static deleteMovie(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(div, form);
        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#director').value = '';
        document.querySelector('#year').value = '';
    }
}
// Store Class: Handles Storage
class Store {
    static getMovies() {
        let movies;
        if(localStorage.getItem('movies') === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }
        return movies;
    }

    static addMovie(movie) {
        const movies = Store.getMovies();

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));

        btn.addEventListener('click', () => {
            console.log('click');
        })
    }
    static removeMovie(title) {
        const movies = Store.getMovies();

        movies.forEach((movie, index) => {
        if(movie.title === title){
            movies.splice(index, 1);
        }
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }
}

// Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a movie
document.querySelector('#movie-form').addEventListener('submit', (e) => {

// Prevent actual Submit
e.preventDefault();

// Get form values
const title = document.querySelector('#title').value;
const director = document.querySelector('#director').value;
const year = document.querySelector('#year').value;


// Validate

if(title === '' ) {
    UI.showAlert('You Must fill in the name field', 'danger')
} else {
    // Instatiate movie 
    const movie = new Movie(title, director, year);

    // Add Movie to UI 
    UI.addMovieToList(movie);

    // Add movie to store
    Store.addMovie(movie);

    // Show Added Message
    UI.showAlert('Movie Added', 'success')
    // Clear Fields
    UI.clearFields();
    }   
});

// Event: Remove a Movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
    UI.deleteMovie(e.target);
// Show Remove Message
    


// Remove Movie from Store
    Store.removeMovie(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    UI.showAlert('Movie Removed', 'danger')
});

// API Seciton

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, release_date, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h6>${release_date}<h/6>
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">Score: ${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `

       
  
        main.appendChild(movieEl)
        
    })
}



function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !=='') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }

})

const container = document.getElementsByClassName('movie');

for (const item of movie) {
    const button = document.createElement('fas fa-heart');
    button.className = 'fas fa-heart'
    item.append(button);
}