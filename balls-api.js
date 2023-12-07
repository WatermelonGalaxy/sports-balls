// API Calls ************************************************************************************************************************************
// Get NHL Standings
async function getCurrentStandings() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const targetUrl = "https://api-web.nhle.com/v1/standings/now";
  const response = await fetch(proxyUrl + targetUrl);
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
    const winCell = document.createElement("td");
    const lossCell = document.createElement("td");
    const otLossCell = document.createElement("td");

    logoCell.innerHTML = `<img src = "${team.teamLogo}" width = "100px" height = "100px">`;
    nameCell.textContent = team.teamName.default;
    winCell.textContent = `${team.wins}`;
    lossCell.textContent = `${team.losses}`;
    otLossCell.textContent = `${team.otLosses}`;

    row.appendChild(logoCell);
    row.appendChild(nameCell);
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
        ].innerHTML = `<thead><tr><th></th><th>${team.divisionName}</th><th style="text-align: center;">Wins</th><th style="text-align: center;">Losses</th><th style="text-align: center;">OT Losses</th></tr></thead>`;
        eastTeams.appendChild(eastDivisions[team.divisionName]);
      }
      eastDivisions[team.divisionName].appendChild(row);
    } else {
      if (!westDivisions[team.divisionName]) {
        westDivisions[team.divisionName] = document.createElement("table");
        westDivisions[
          team.divisionName
        ].innerHTML = `<thead><tr><th></th><th>${team.divisionName}</th><th style="text-align: center;">Wins</th><th style="text-align: center;">Losses</th><th style="text-align: center;">OT Losses</th></tr></thead>`;
        westTeams.appendChild(westDivisions[team.divisionName]);
      }
      westDivisions[team.divisionName].appendChild(row);
    }
  });

  teamsList.appendChild(eastTeams);
  teamsList.appendChild(westTeams);

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
  // Check which page is loaded and call appropriate functions
  if (window.location.pathname === "/index.html") {
    const teams = await getCurrentStandings();
    console.log(teams);
  } else if (window.location.pathname === "/players.html") {
    console.log("players page");
    const players = await getPlayers();
    console.log(players);
  } else if (window.location.pathname === "/player.html") {
    const player = await getPlayer();
    console.log(player);
  }
});
