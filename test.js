
const gamesContainer = document.getElementById("games-container")
const gameForm = document.getElementById("game-form");
const titleInput = document.getElementById("game-title");
const genreInput = document.getElementById("game-genre");
let lastCreatedItem = null;


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



// function to create the game on click
async function onCreateGameClick(event) {
  event.preventDefault();
    const title = titleInput.value.trim();
    const genreId = parseInt(genreInput.value);

  const response = await fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: {
         'Content-Type': 'application/json' 
        },
    body: JSON.stringify({ title, genreId })
  });
    const newlyCreatedItem = await response.json();
    lastCreatedItem = newlyCreatedItem;
    console.log('Created item:', lastCreatedItem);

  gameForm.reset();
}




// update button
async function onUpdateGameClick() {
     console.log("lastCreatedItem in update:", lastCreatedItem);
    if (!lastCreatedItem) {
        console.log('No item created yet to update');
        return;
    }
    await fetch(`http://localhost:3000/games/${lastCreatedItem.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: 'Test Updated', genreId: 2 })
    });
}



// delete games
async function onDeleteGameClick() {
    if (!lastCreatedItem) {
        console.log('No item created yet to delete');
        return;
    }
    await fetch(`http://localhost:3000/games/${lastCreatedItem.id}`, {
        method: 'DELETE'
    });
}

gameForm.addEventListener("submit", onCreateGameClick);