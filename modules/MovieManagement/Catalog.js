import { selectChoice } from "./utils.js";
import {
  readDataFromFile,
  writeDataToFile,
} from "../FilesManagement/filesManager.js";
import { fetchMovieData } from "../APIrequests/APIManager.js";
class Movie {
  constructor(t, d, ry, g) {
    this.title = t;
    this.director = d;
    this.releaseYear = ry;
    this.genre = g;
  }
}

class Catalog {
  movies = [];

  constructor() {
    this.loadCatalog();
  }

  async loadCatalog() {
    try {
      this.movies = await readDataFromFile("./data/movies.json");
      console.log("Movie catalog loaded successfully.");
    } catch (error) {
      console.error("Error loading movie catalog:", error.message);
    }
  }

  async saveCatalog() {
    try {
      await writeDataToFile("./data/movies.json", this.movies);
      console.log("Movie catalog saved successfully.");
    } catch (error) {
      console.error("Error saving movie catalog:", error.message);
    }
  }

  displayCatalog() {
    if (this.movies.length === 0) {
      console.log("The movie catalog is empty.");
    } else {
      console.log("==== Movie Catalog ====");
      this.movies.map((movie) => {
        console.log(`Title: ${movie.title}`);
        console.log(`Director: ${movie.director}`);
        console.log(`Release Year: ${movie.releaseYear}`);
        console.log(`Genre: ${movie.genre}`);
        console.log("----------------------");
      });
    }
  }

  async addMovie() {
    console.log("==== Add New Movie ====");
    const title = await selectChoice("Enter the title: ");
    const director = await selectChoice("Enter the director: ");
    const releaseYear = await selectChoice("Enter the release year: ");
    const genre = await selectChoice("Enter the genre: ");

    const newMovie = new Movie(title, director, releaseYear, genre);

    this.movies.push(newMovie);
    await this.saveCatalog();

    console.log("Movie added successfully.");
  }

  async updateMovie() {
    console.log("==== Update Movie Details ====");
    const title = await selectChoice(
      "Enter the title of the movie to update: "
    );
    const movieIndex = this.movies.findIndex((movie) => movie.title == title);
    if (movieIndex === -1) {
      console.log("Movie not found.");
      return;
    }

    const updatedTitle = await selectChoice("Enter the updated title: ");
    const updatedDirector = await selectChoice("Enter the updated director : ");
    const updatedReleaseYear = await selectChoice(
      "Enter the updated release year : "
    );
    const updatedGenre = await selectChoice("Enter the updated genre : ");

    if (updatedTitle) {
      this.movies[movieIndex].title = updatedTitle;
    }
    if (updatedDirector) {
      this.movies[movieIndex].director = updatedDirector;
    }
    if (updatedReleaseYear) {
      this.movies[movieIndex].releaseYear = updatedReleaseYear;
    }
    if (updatedGenre) {
      this.movies[movieIndex].genre = updatedGenre;
    }

    await this.saveCatalog();
    console.log("Movie details updated successfully.");
  }

  async deleteMovie() {
    console.log("==== Delete Movie ====");
    const title = await selectChoice(
      "Enter the title of the movie to delete: "
    );
    const movieIndex = this.movies.findIndex((movie) => movie.title === title);

    if (movieIndex === -1) {
      console.log("Movie not found.");
      return;
    }

    this.movies.splice(movieIndex, 1);
    await this.saveCatalog();

    console.log("Movie deleted successfully.");
  }

  async searchMovies() {
    console.log("==== Search Movies ====");
    const query = await selectChoice(
      "Enter a title, director, or genre to search: "
    );
    console.log("query::", query);

    const searchResults = await fetchMovieData(query);
    console.log("searchResults::", searchResults);
    if (searchResults?.length == 0) {
      console.log("No movies found.");
    } else {
      console.log("==== Search Results ====");
      searchResults.map((movie) => {
        console.log(`Title: ${movie.Title}`);
        console.log(`Director: ${movie.Poster}`);
        console.log(`Release Year: ${movie.Year}`);
        console.log(`Genre: ${movie.Type}`);
        console.log("----------------------");
      });
    }
  }

  async filterMovies() {
    console.log("==== Filter Movies ====");
    console.log("1. Filter by Genre");
    console.log("2. Filter by Release Year");
    const choice = await selectChoice("Enter your choice: ");

    switch (choice) {
      case "1":
        await this.filterByGenre();
        break;
      case "2":
        await this.filterByReleaseYear();
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }

  async filterByGenre() {
    const genre = await selectChoice("Enter the genre to filter by: ");
    const filteredMovies = this.movies.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );

    if (filteredMovies.length === 0) {
      console.log("No movies found for the given genre.");
    } else {
      console.log(`==== Movies in the ${genre} genre ====`);
      filteredMovies.forEach((movie) => {
        console.log(`Title: ${movie.title}`);
        console.log(`Director: ${movie.director}`);
        console.log(`Release Year: ${movie.releaseYear}`);
        console.log("----------------------");
      });
    }
  }

  async filterByReleaseYear() {
    const releaseYear = await selectChoice(
      "Enter the release year to filter by: "
    );
    const filteredMovies = this.movies.filter(
      (movie) => movie.releaseYear === releaseYear
    );

    if (filteredMovies.length === 0) {
      console.log("No movies found for the given release year.");
    } else {
      console.log(`==== Movies released in ${releaseYear} ====`);
      filteredMovies.forEach((movie) => {
        console.log(`Title: ${movie.title}`);
        console.log(`Director: ${movie.director}`);
        console.log(`Genre: ${movie.genre}`);
        console.log("----------------------");
      });
    }
  }
}

export default Catalog;
