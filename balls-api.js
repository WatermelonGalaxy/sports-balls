
// Create a Function BALLDONTLIE API to get the list of teams
// https://www.balldontlie.io/api/v1/teams
async function getTeams() {
    fetch('https://www.balldontlie.io/api/v1/teams')
    .then(response => response.json())
    .then(data => {
        const parentContainer = document.createElement('div');
        parentContainer.className = 'parent-container';

        const teamsList = document.getElementById('teams-list');
        const eastTeams = document.createElement('div');
        const westTeams = document.createElement('div');
        eastTeams.innerHTML = '<h2>Eastern Conference</h2>';
        westTeams.innerHTML = '<h2>Western Conference</h2>';

        data.data.forEach(team => {
            const listItem = document.createElement('p');
            listItem.textContent = team.full_name;
            if (team.conference === 'East') {
                eastTeams.appendChild(listItem);
            } else {
                westTeams.appendChild(listItem);
            }
        });

        // append the east and west teams to the parent container
        parentContainer.appendChild(eastTeams);
        parentContainer.appendChild(westTeams);

        // append the parent container to the teams list
        teamsList.appendChild(parentContainer);
        // make parent container a flecbox
        parentContainer.style.display = 'flex';
        parentContainer.justifyContent = 'space-between';
    })
    .catch(error => console.error('Error:', error));
}

// Create a function to get the current Season Team Record
// https://www.balldontlie.io/api/v1/games?seasons[]=2019&team_ids[]=14
async function getTeamRecord() {
    fetch('https://www.balldontlie.io/api/v1/games?seasons[]=2023&team_ids[]=14')
    .then(response => response.json())
    .then(data => {
        const teamRecord = document.getElementById('team-record');
        const teamRecordList = document.createElement('div');
        teamRecordList.innerHTML = '<h2>Team Record</h2>';
        console.log(data);

        data.data.forEach(team => {
            const listItem = document.createElement('p');
            listItem.textContent = team.full_name;
            teamRecordList.appendChild(listItem);
        });

        teamRecord.appendChild(teamRecordList);
    })
    .catch(error => console.error('Error:', error));
}






// DOM Content Loaded
document.addEventListener("DOMContentLoaded", async (event) => {
  // Get the teams from the API
  const teams = await getTeams();
  console.log(teams);

    // Get the team record from the API
    const teamRecord = await getTeamRecord();
    console.log(teamRecord);

});
