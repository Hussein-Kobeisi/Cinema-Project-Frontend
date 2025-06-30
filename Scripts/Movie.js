import * as api from "./Api.js";

//initializers
window.toggleSeat = toggleSeat;

const seatContainer = document.getElementById("seatsContainer")
const seatTemplate = document.getElementById("seatTemplate")
const titleHeader = document.getElementById("movieTitleHeader")

const movie = JSON.parse(localStorage.getItem('movie'))

//running code
console.log(movie.seats[0])

titleHeader.innerHTML = movie.title
movie.seats.forEach((seat, i) => {
    addSeat(seat)
});

//functions

function addSeat(seat) {
    let card = seatTemplate.cloneNode(true);
    card.style.display = "block";
    card.style.gridArea = seat.placement[0] + " / " + seat.placement.slice(1);
    card.innerHTML =  seat.placement
    
    if(seat.isTaken)
    {
        card.disabled = true;
        card.style.backgroundColor = "#ff5f5f"
    }
        
    seatContainer.appendChild(card);
}

function toggleSeat(clicker){
    if(clicker.style.backgroundColor != "yellowgreen")
        clicker.style.backgroundColor = "yellowgreen"
    else
        clicker.style.backgroundColor = "yellowgreen"
}