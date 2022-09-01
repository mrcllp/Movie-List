// Movie Class: Represents a Book 
class Movie {
    constructor(title, director, year) {
        this.title = title;
        this.author = director;
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
                year: '123123'
            },
            {
                title: 'Movie 2',
                director: 'Director2',
                year: '124124'
            },
        ];

        const movies = StoredMovies;

        movies.forEach((movie) => UI.addMovieToList(movie));


    }
}
// Store Class: Handles Storage

// Event: Display Books

// Event: Add a book 

// Event: Remove a book 
