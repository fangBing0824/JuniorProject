let data,casts;

function init(){
  $.ajaxSetup({async: false})
  
  let link = "http://localhost:8300";
  
  casts = $.getJSON(link + "/Casts").responseJSON;
  console.log(casts)
  generateCards(casts)
}

function generateCards() {
    let centerpanel = document.getElementById("centerpanel");
    let input = document.getElementById("search").value;
    let build = "";

    if(input === undefined || input === null) {
        input = "";
    }

    // Group casts by drama
    let dramaGroups = {};
    for(let i = 0; i < casts.length; i++) {
        let cast = casts[i];
        if (cast.dramaTitle.toLowerCase().includes(input.toLowerCase())) {
            if (!dramaGroups[cast.dramaId]) {
                dramaGroups[cast.dramaId] = {
                    drama: cast,
                    actors: []
                };
            }
            dramaGroups[cast.dramaId].actors.push(cast);
        }
    }

    // Generate cards for each drama
    let dramaIds = Object.keys(dramaGroups);
    for(let i = 0; i < dramaIds.length; i++) {
        let dramaId = dramaIds[i];
        let drama = dramaGroups[dramaId];
        
        let frontContent = `
            <h2>${drama.drama.Title}</h2>
            <div class=img-container>
                <img src="${drama.drama.dramaImg}" alt="${drama.drama.Title}" class=drama-img>
            </div>
            <h3>${drama.drama.originalTitle}</h3>
            <p>${drama.drama.episodes} Episodes</p>
        `;
        
        let actorsContent = '';
        for(let j = 0; j < drama.actors.length; j++) {
            let actor = drama.actors[j];
            actorsContent += `
                <div class=actor-card>
                    <h4>${actor.actorName}</h4>
                    <p>Role: ${actor.roleName}</p>
                    <p>Type: ${actor.mainOrsupporting}</p>
                </div>
            `;
        }

        let backContent = `
            <h3>Cast Members</h3>
            <div class=actor-list>
                ${actorsContent}
            </div>
        `;

        build += flipcard(frontContent, backContent);
    }

    centerpanel.innerHTML = build;
}


function flipcard(front, back) {
    let quote = "`"
    return `
    <div class="flip-card" onclick='rightInfo(${quote}${front}${quote}, ${quote}${back}${quote})'>
        <div class="flip-card-inner">
            <div class="flip-card-front">
                ${front}
            </div>
            <div class="flip-card-back">
                ${back}
            </div>
        </div>
    </div>
    `;
}

function rightInfo(top,down){
    document.getElementById('rightpanel').innerHTML = `
                ${top}
                ${down}`; 
}