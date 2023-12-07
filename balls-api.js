

// API Calls ************************************************************************************************************************************
// Get NHL Standings
async function getCurrentStandings() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://api-web.nhle.com/v1/standings/now';
    const response = await fetch(proxyUrl + targetUrl);
    const data = await response.json();

    const teamsList = document.getElementById('teams-list');
    const eastTeams = document.createElement('div');
    const westTeams = document.createElement('div');
    eastTeams.innerHTML = '<h2>Eastern Conference</h2>';
    westTeams.innerHTML = '<h2>Western Conference</h2>';

    const divisions = ['Atlantic', 'Metropolitan', 'Central', 'Pacific'];
    const eastDivisions = {};
    const westDivisions = {};

    console.log(data);
    divisions.forEach(division => {
        eastDivisions[division] = document.createElement('div');
        westDivisions[division] = document.createElement('div');
        eastDivisions[division].innerHTML = `<h3>${division} Division</h3>`;
        westDivisions[division].innerHTML = `<h3>${division} Division</h3>`;
    });

    console.log(data.standings[0].teamName);

    data.standings.forEach(team => {
        const listItem = document.createElement('p');
        listItem.textContent = team.teamName.default;
        //console.log(team.teamName.default);
        if (team.conferenceName === 'Eastern') {
            eastDivisions[team.divisionName].appendChild(listItem);
        } else {
            westDivisions[team.divisionName].appendChild(listItem);
        }
    });

    divisions.forEach(division => {
        eastTeams.appendChild(eastDivisions[division]);
        westTeams.appendChild(westDivisions[division]);
    });

    teamsList.appendChild(eastTeams);
    teamsList.appendChild(westTeams);

    console.log(data);

    return data;
}
// Helper Functions *******************************************************************************************************************************

// Create a function to delay to follow API rate limits
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



// DOM Functions **********************************************************************************************************************

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", async (event) => {
 

  // Check which page is loaded and call appropriate functions
    if (window.location.pathname === '/index.html') {
        const teams = await getCurrentStandings();
        console.log(teams);
    } else if (window.location.pathname === '/players.html') {
        console.log('players page');
        const players = await getPlayers();
        console.log(players);
    } else if (window.location.pathname === '/player.html') {
        const player = await getPlayer();
        console.log(player);
    }

  

});
