const baseURL = "https://ghibliapi.herokuapp.com";
let url;

//film search
const film = document.querySelector(".filmName");
const form = document.querySelector("form");
const section = document.querySelector(".filmSection");
const charSection = document.querySelector(".charSection");
const people = document.querySelector(".CharacterName")
let h4 = document.createElement("h4");
let testH4 = document.createElement("h4");
let para = document.createElement("p");
let ul = document.createElement("ul");
let testUl = document.createElement("ul");


document.getElementById("filmSubmit").addEventListener("click", fetchFilms);
document.getElementById("characterSubmit").addEventListener("click", fetchCharacters);

//This pulls the initial json from the API
function fetchFilms(e){
    e.preventDefault();
    url = baseURL + "/films";
    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        findTitle(json);
    });
    
}

function fetchCharacters(e){
    e.preventDefault();
    url = baseURL + "/people";
    fetch(url)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);
        findCharacters(json);
    });
    
}

//This finds the correct title to display.
function findTitle(json){
    console.log(json);
    let list = document.getElementById("myList");
    if(list != null){
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
    }
    
    while(section.firstChild){
        section.removeChild(section.firstChild);
    };
    
    for(i = 0; i < json.length; i ++){
        let jsonArrayTitle = json[i].title;

        if(film.value.toLowerCase() == jsonArrayTitle.toLowerCase()){
            section.appendChild(testH4);
            section.appendChild(para);
            para.setAttribute("id", "description");
            document.getElementById("description").style.margin = "0vh 50vw 0vh 0vw";
            section.appendChild(testUl);
            testUl.setAttribute("id","myList");

            let filmData = [json[i].director, json[i].producer, json[i].release_date, json[i].rt_score]
            for(index = 0; index < filmData.length; index++){
                let li = document.createElement("li");
                if(index == 0){
                    li.innerHTML = "Directed by: " + filmData[index];
                } else if(index == 1){
                    li.innerHTML = "Produced by: " + filmData[index];
                } else if(index == 2){
                    li.innerHTML = "Released on: " + filmData[index];
                } else {
                    li.innerHTML = "Rotten Tomatoes: " + filmData[index];
                }
                
                testUl.appendChild(li);
            }

            testH4.textContent = jsonArrayTitle;
            para.textContent = json[i].description;
            peopleArray = json[i].people;
            console.log(peopleArray);
            for(place = 0; place < peopleArray.length; place++){
                fetchCharacterInFilm(peopleArray[place]);
            }
            
        }
        
    }
    return;
}

function findCharacters(json){
    let list = document.getElementById("charList");
    if(list != null){
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
    }
    
    while(charSection.firstChild){
        console.log(charSection.firstChild);
        charSection.removeChild(charSection.firstChild);
    };

    for(i = 0; i < json.length; i++){
        let jsonArrayName = json[i].name

        if(people.value.toLowerCase() == jsonArrayName.toLowerCase()){
            charSection.appendChild(h4);
            charSection.appendChild(ul);
            ul.setAttribute("id","charList");

            
            speciesUrl = json[i].species;
            let peopleData = [json[i].age, json[i].gender, json[i].hair_color, json[i].eye_color]
            for(index = 0; index < peopleData.length; index++){
                let li = document.createElement("li");
                if(index == 0){
                    li.innerHTML = "Age: " + peopleData[index];
                } else if(index == 1){
                    li.innerHTML = "Gender: " + peopleData[index];
                } else if(index == 2){
                    li.innerHTML = "Hair color: " + peopleData[index];
                } else {
                    li.innerHTML = "Eye color: " + peopleData[index];
                }
                
                ul.appendChild(li);

            }
            filmsArray = json[i].films;
            for(place = 0; place < filmsArray.length; place++){
                fetchCharacterFilm(filmsArray[place]);
            }
            h4.textContent = jsonArrayName;
            
        }
        
    }
    fetchCharacterSpecies(speciesUrl);

  
    return;
}


function fetchCharacterFilm(filmsUrl){
    let li = document.createElement("li");
    fetch(filmsUrl)
    .then(function(result){
        return result.json();
    }).then(function(json){
        li.innerHTML = "Film: " + json.title;
        ul.appendChild(li);
        console.log(json);
    });
    
}

function fetchCharacterSpecies(speciesUrl){

    fetch(speciesUrl)
    .then(function(result){
        return result.json();
    }).then(function(json){
        let li = document.createElement("li");
        li.innerHTML = "Species: " + json.name;
        document.getElementById("charList").prepend(li);
        console.log(json);
    })
    
}

function fetchCharacterInFilm(peopleArray){
    let li = document.createElement("li");
    fetch(peopleArray)
    .then(function(result){
        return result.json();
    }).then(function(json){
        console.log(json);

        let array = Object.keys(json)
        console.log(array);
        if(array[1] == "name"){
            li.innerHTML = "Staring: " + json.name;
            testUl.appendChild(li);
        }
    });
}