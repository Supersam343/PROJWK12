
const gamesContainer = document.getElementById("games-container")
// grabs the games from the array of objects created on db.json utilizes a sync to allow the data to fetched first 
async function onFetchGamesClick() {
    const response = await fetch("http://localhost:3000/games")
    const gameList = await response.json()
    
    gamesContainer.innerHTML = gameList.map(
        game => `<div>
         <h3>${game.title}</h3>
         <p>${game.genreId}</p>
        </div>`
    ).join("")
}

async function onCreateGameClick() {
    const response = await fetch("http://localhost:3000/games", {
        method:,
        headers:
        body:
    })
}