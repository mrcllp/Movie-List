// Movie Class: Represents a Book 
class Movie {
    constructor(title, director, year) {
        this.title = title;
        this.director = director;
        this.year = year;
    }
}
// Ui class: Handle us tasks
class UI {
    static displayMovies() {
        const StoredMovies = [
            {
                title: 'Movie 1',
                director: 'Director1',
                year: '123123',
            },
            {
                title: 'Movie 2',
                director: 'Director2',
                year: '124124',
            },
        ];

        const movies = StoredMovies;

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
}
// Store Class: Handles Storage

// Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovies);

console.log('row');
// Event: Add a movie
document.querySelector('#movie-form').addEventListener('submit', (e) => {
// Prevent actual Submit
e.preventDefault();


// Get form values
const title = document.querySelector('#title').value;
const director = document.querySelector('#director').value;
const year = document.querySelector('#year').value;

// Instantiate Movie 
const movie = new Movie(title, director, year);

console.log(movie)


});
// Event: Remove a book 
