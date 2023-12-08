// API Calls ************************************************************************************************************************************
// Get NHL Standings
async function getCurrentStandings() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = "https://api-web.nhle.com/v1/standings/now";
  const response = await fetch(proxyUrl + targetUrl);
  console.log(response);
  const data = await response.json();

  const teamsList = document.getElementById("teams-list");
  const eastTeams = document.createElement("div");
  const westTeams = document.createElement("div");
  eastTeams.innerHTML = "<h2>Eastern Conference</h2>";
  westTeams.innerHTML = "<h2>Western Conference</h2>";

  const eastDivisions = {};
  const westDivisions = {};

  console.log(data);

  data.standings.forEach((team) => {
    const row = document.createElement("tr");
    const logoCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const abrvCell = document.createElement("td");
    const winCell = document.createElement("td");
    const lossCell = document.createElement("td");
    const otLossCell = document.createElement("td");

    logoCell.innerHTML = `<img src = "${team.teamLogo}" width = "100px" height = "100px">`;
    nameCell.textContent = team.teamName.default;
    abrvCell.textContent = team.teamAbbrev.default;
    winCell.textContent = `${team.wins}`;
    lossCell.textContent = `${team.losses}`;
    otLossCell.textContent = `${team.otLosses}`;

    row.appendChild(logoCell);
    row.appendChild(nameCell);
    row.appendChild(abrvCell);
    row.appendChild(winCell);
    row.appendChild(lossCell);
    row.appendChild(otLossCell);

    // Center the logo in the cell
    logoCell.style.verticalAlign = "middle";
    logoCell.style.textAlign = "center";
    logoCell.style.width = "10%";


    // Center the Record Cells and Headers
    winCell.style.textAlign = "center";
    lossCell.style.textAlign = "center";
    otLossCell.style.textAlign = "center";

    // Space the Record Cells Evenly
    winCell.style.width = "15%";
    lossCell.style.width = "15%";
    otLossCell.style.width = "15%";

    // Add Hover Effect on Team Names
    nameCell.addEventListener("mouseover", () => {
      nameCell.style.cursor = "pointer";
      nameCell.style.color = "#90C0C6";
    });
    // Remove Hover Effect on Team Names
    nameCell.addEventListener("mouseout", () => {
      nameCell.style.color = "#c9c9c9";
    });

    if (team.conferenceName === "Eastern") {
      if (!eastDivisions[team.divisionName]) {
        eastDivisions[team.divisionName] = document.createElement("table");
        eastDivisions[
          team.divisionName
        ].innerHTML = `<thead><tr><th></th><th>${team.divisionName}</th><th>Abrv</th><th style="text-align: center;">Wins</th><th style="text-align: center;">Losses</th><th style="text-align: center;">OT Losses</th></tr></thead>`;
        eastTeams.appendChild(eastDivisions[team.divisionName]);
      }
      eastDivisions[team.divisionName].appendChild(row);
    } else {
      if (!westDivisions[team.divisionName]) {
        westDivisions[team.divisionName] = document.createElement("table");
        westDivisions[
          team.divisionName
        ].innerHTML = `<thead><tr><th></th><th>${team.divisionName}</th><th>"Abrv"</th><th style="text-align: center;">Wins</th><th style="text-align: center;">Losses</th><th style="text-align: center;">OT Losses</th></tr></thead>`;
        westTeams.appendChild(westDivisions[team.divisionName]);
      }
      westDivisions[team.divisionName].appendChild(row);
    }
  });

  teamsList.appendChild(eastTeams);
  teamsList.appendChild(westTeams);

  return data;
}


// Create a function to get a teams current roster
async function getPlayers(teamAbbreviation) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = `https://api-web.nhle.com/v1/roster/${teamAbbreviation}/current`;
  const response = await fetch(proxyUrl + targetUrl);
  console.log(response);
  const data = await response.json();

  const playersList = document.getElementById("players-list");


  const positions = ['goalies', 'forwards', 'defensemen'];

  positions.forEach((position) => {
      data[position].forEach((player) => {
          const row = document.createElement("tr");
          const playerImageCell = document.createElement("td");
          const nameCell = document.createElement("td");
          const numberCell = document.createElement("td");
          const positionCell = document.createElement("td");
  
          playerImageCell.innerHTML = `<img src = "${player.headshot}" width = "100px" height = "100px">`;
          numberCell.textContent = "#" + player.sweaterNumber;
          nameCell.textContent = player.firstName.default + " " + player.lastName.default;
          positionCell.textContent = player.positionCode;
  
          row.appendChild(playerImageCell);
          row.appendChild(numberCell);
          row.appendChild(nameCell);
          row.appendChild(positionCell);
  
          playersList.appendChild(row);
      });
  });

  console.log(data);
  return data;
}


// Helper Functions *******************************************************************************************************************************

// Create a function to delay to follow API rate limits
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// DOM Functions **********************************************************************************************************************

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", async (event) => {

  

  // check which url is being used and load the appropriate page
  const url = window.location.href;
  const urlSplit = url.split("/");
  const page = urlSplit[urlSplit.length - 1];
  console.log(page);

  if (page === "index.html") {
    // Get the current standings
    const standings = await getCurrentStandings();
  }

  if (page === "players.html") {
    // Get the current roster
    const roster = await getPlayers("ANA");
  }

  if (page === "teams.html") {
    // Get the current roster
    const roster = await getPlayers("ANA");
  }

  // 


});

