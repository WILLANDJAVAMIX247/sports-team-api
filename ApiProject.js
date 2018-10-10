const baseURL = 'https://www.thesportsdb.com/api/v1/json/4012947/searchteams.php'
let url;

const searchTerm = document.getElementById('search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

let pageNumber = 0;
//console.log('PageNumber:', pageNumber);

searchForm.addEventListener('submit' , fetchResults);

function fetchResults(e) {
    //console.log(e);
    e.preventDefault();
    url = `${baseURL}?t=${searchTerm.value.split(" ").join("_")}`;
    console.log('URL:', url);

    fetch(url)
    .then(function(result) {
        console.log(result);
        return result.json();
    })
    .then(function(json) {
        console.log(json);
        displayResults(json);
    })
}

function displayResults(json) {
    // console.log('Display Result', json);
    // console.log(json.response.docs);

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    let team = json.teams; 

    if (team === null) {
        let none = document.createElement("h5")
        none.innerText = "No Results"
    } else{
        let team= json.teams.forEach(t => {
            let teamDiv=document.createElement("div");
            let teamName=document.createElement("h2");
            let teamInfo=document.createElement("p");
            let strSport=document.createElement("p");
            let strStadium=document.createElement("p");
        
            teamName.innerText=`${t.strTeam}`;
            teamInfo.innerText=`${t.strSport}`;
            strSport.innerText=`${t.intFormedYear}`;
            strStadium.innerText=`${t.strStadium}`;

            section.appendChild(teamDiv);
            teamDiv.appendChild(teamName);
            teamDiv.appendChild(teamInfo);
            teamDiv.appendChild(strSport);
            teamDiv.appendChild(strStadium);

        })
    }
}