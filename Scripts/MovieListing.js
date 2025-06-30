import * as api from "./Api.js";


//initializers
window.goToMovie = goToMovie;

const movieCardTemplate = document.getElementById("movieCardTemplate");
const showingContainer = document.getElementById("showingContainer");
const comingContainer = document.getElementById("comingContainer");

let movies = null

//main code

window.onload = async function () {
    movies = await getAllMovies()
    const showingMovies = []
    const comingMovies = []
    movies.forEach((movie, i) => {
        if(movie.status == "showing")
            showingMovies.push(movie)
        else
            comingMovies.push(movie)
    });

    // console.log("show:")
    // console.log(showingMovies)
    // console.log("come:")
    // console.log(comingMovies)

    showingMovies.forEach((movie, i) => {
        addMovieCardTo(showingContainer, movie)
    });

    comingMovies.forEach((movie, i) => {
        addMovieCardTo(comingContainer, movie)
    });
}

//functions

function getAllMovies(){
  return axios.get(api.getAllMoviesController)
  .then((res) => {
        if(!res.data.status == "200"){
            console.log("ERROR");
            return;
        }
        return res.data.movies;
        })
  .catch((err) => console.log(err));
}

function addMovieCardTo(container, movie) {
    let card = movieCardTemplate.cloneNode(true);
    card.style.display = "block";
    card.querySelector("#movieTitle").innerHTML = movie.title;
    card.querySelector("#cardButton").value = movie.id;
    container.appendChild(card);
}

function goToMovie(id){
    movies.forEach((movie, i) => {
        if(movie.id == id)
        {
            localStorage.setItem('movie', JSON.stringify(movie))
            window.location.href = api.MoviePageHTML
            return
        }
    });
}