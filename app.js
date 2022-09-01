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
                title: 'The Lord of The Rings The Return of The King',
                director: 'Peter Jackson',
                year: '2003',
            },
            {
                title: 'American Pie',
                director: ' Paul Weitz',
                year: '1999',
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

if(title === '' || director === '' || year === '') {
    UI.showAlert('You cannot leave empty fields', 'danger')
} else {
    // Instatiate movie 
    const movie = new Movie(title, director, year);

    // Add Movie to UI 
    UI.addMovieToList(movie);

    // Show Added Message
    UI.showAlert('Movie Added', 'success')
    // Clear Fields
    UI.clearFields();
    }   
});

// Event: Remove a book 
document.querySelector('#movie-list').addEventListener('click', (e) => {
    UI.deleteMovie(e.target);

    UI.showAlert('Movie Deleted', 'danger')
});
