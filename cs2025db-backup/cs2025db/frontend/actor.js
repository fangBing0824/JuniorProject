let data,actors;

function init(){
  $.ajaxSetup({async: false})
  
  let link = "http://localhost:8300";
  
  actors = $.getJSON(link + "/Actors").responseJSON;
  console.log(actors)
  generateCards(actors)
  
}

function generateCards(){
    
	  let centerpanel = document.getElementById("centerpanel");
      let input = document.getElementById("search").value;
      let build ="";

      if(input === undefined || input === null){
        input = ""
      }
	  
	  for (let i =0; i <actors.length; i++){
        let actor = actors[i]

        if(actor.actorName.toLowerCase().includes(input.toLowerCase()) || actor.country.toLowerCase().includes(input.toLowerCase()) || actor.dramaTitle.toLowerCase().includes(input.toLowerCase())){
            let frontContent = `
                    <h2>${actor.actorName}</h2>
                    <div class=img-container><img src="${actor.actorImg}" alt="${actor.actorName}"></div>
                `;
                
                let backContent = `
                    <h3>actor ID: ${actor.actorId}</h3>
                    <h2>${actor.actorName}</h2>
                    <h3>${actor.birthDate}</h3>
                    <h3>Country: ${actor.country}</h3>
                    <h3>Famous Dramas: ${actor.dramaTitle}</h3>
                `;
            build += flipcard(frontContent, backContent);
        }
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