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
    const teamLink = document.createElement("a");
    const row = document.createElement("tr");
    const logoCell = document.createElement("td");
    const nameCell = document.createElement("td");
    //const abrvCell = document.createElement("td");
    const winCell = document.createElement("td");
    const lossCell = document.createElement("td");
    const otLossCell = document.createElement("td");

    teamLink.href = `roster.html?team=${team.teamAbbrev.default}`;

    logoCell.innerHTML = `<img src = "${team.teamLogo}" width = "100px" height = "100px">`;

    //nameCell.textContent = team.teamName.default;
    teamLink.textContent = team.teamName.default;
    //abrvCell.textContent = team.teamAbbrev.default;
    winCell.textContent = `${team.wins}`;
    lossCell.textContent = `${team.losses}`;
    otLossCell.textContent = `${team.otLosses}`;

    nameCell.appendChild(teamLink);
    row.appendChild(logoCell);
    row.appendChild(nameCell);
    //row.appendChild(abrvCell);
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


// Create a function to get a teams current roster
async function getPlayers(teamAbbreviation) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://api-web.nhle.com/v1/roster/${teamAbbreviation}/current`;
    const response = await fetch(proxyUrl + targetUrl);
    console.log(response);
    const data = await response.json();

    // get the element to add the players to
    const playersList = document.getElementById("players-list");
    
    // Create a array for each position
    const positions = ['goalies', 'forwards', 'defensemen'];
    
    positions.forEach((position) => {
        // Create a header for the position
        const positionTblHeader = document.createElement("h2");
        positionTblHeader.textContent = position.toUpperCase();
        // Set table header class
        positionTblHeader.className = "table-title";
        playersList.appendChild(positionTblHeader);


        // Create a header row for the table
        const headerRow = document.createElement("tr");
        const playerImageHeader = document.createElement("th");
        const numberHeader = document.createElement("th");
        const nameHeader = document.createElement("th");
        const positionHeader = document.createElement("th");
        const stateHeader = document.createElement("th");
        const countryHeader = document.createElement("th");
        const heightHeader = document.createElement("th");
        const weightHeader = document.createElement("th");
        
        // Add the headers to the header row
        playerImageHeader.textContent = " ";
        numberHeader.textContent = " ";
        nameHeader.textContent = "Name";
        positionHeader.textContent = "Position";
        stateHeader.textContent = "State/Province";
        countryHeader.textContent = "Country";
        heightHeader.textContent = "Height(in)";
        weightHeader.textContent = "Weight(lbs)";

        // Add the headers to the header row
        headerRow.appendChild(playerImageHeader);
        headerRow.appendChild(numberHeader);
        headerRow.appendChild(nameHeader);
        headerRow.appendChild(positionHeader);
        headerRow.appendChild(stateHeader);
        headerRow.appendChild(countryHeader);
        headerRow.appendChild(heightHeader);
        headerRow.appendChild(weightHeader);

        // Add the header row to the table
        playersList.appendChild(headerRow);
        
        data[position].forEach((player) => {

            // Create a row for each player
            const row = document.createElement("tr");
            const playerImageCell = document.createElement("td");
            const nameCell = document.createElement("td");
            const numberCell = document.createElement("td");
            const positionCell = document.createElement("td");
            const stateCell = document.createElement("td");
            const countryCell = document.createElement("td");
            const heightCell = document.createElement("td");
            const weightCell = document.createElement("td");

            // Add the player data to the row
            playerImageCell.innerHTML = `<img src="${player.headshot}" width="100px" height="100px">`;
            numberCell.textContent = "#" + player.sweaterNumber;
            nameCell.textContent = player.firstName.default + " " + player.lastName.default;
            positionCell.textContent = player.positionCode;
            stateCell.textContent = player.birthStateProvince && player.birthStateProvince.default ? player.birthStateProvince.default : '-';
            countryCell.textContent = player.birthCountry;
            heightCell.textContent = player.heightInInches;
            weightCell.textContent = player.weightInPounds;


            
            // Add td's to the row
            row.appendChild(playerImageCell);
            row.appendChild(numberCell);
            row.appendChild(nameCell);
            row.appendChild(positionCell);
            row.appendChild(stateCell);
            row.appendChild(countryCell);
            row.appendChild(heightCell);
            row.appendChild(weightCell);

            // Bold the sweater number and make it larger
            numberCell.style.fontWeight = "bold";
            numberCell.style.fontSize = "30px";
            numberCell.style.fontStyle = "italic";



            // Add the row to the table
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
    // take before the url ? parameters
    const page = window.location.pathname.split("/").pop();
    console.log(page);

    if (page === "index.html") {
        // Get the current standings
        const standings = await getCurrentStandings();
    }

    if (page === "roster.html") {
        // Pull the team abbreviation from the url after the ?team=
        const teamAbbreviation = new URLSearchParams(window.location.search).get("team");

        console.log("team abrv: " + teamAbbreviation);
        // Get the current roster
        const roster = await getPlayers(teamAbbreviation);
    }

    if (page === "teams.html") {
        // Get the current roster
        const roster = await getPlayers("ANA");
    }

    // ...
});

