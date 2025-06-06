let data,dramas;

function init(){
  $.ajaxSetup({async: false})
  
  let link = "http://localhost:8300";
  
  dramas = $.getJSON(link + "/Drama").responseJSON;
  generateCards(dramas)
  
}

function generateCards(){
    
	  let centerpanel = document.getElementById("centerpanel");
      let input = document.getElementById("search").value;
      let build ="";

      if(input === undefined || input === null){
        input = ""
      }
	  
	  for (let i =0; i <dramas.length; i++){
        let drama = dramas[i]

        if(drama.Title.toLowerCase().includes(input.toLowerCase()) || drama.language.toLowerCase().includes(input.toLowerCase())){
            let frontContent = `
                    <h2>${drama.Title}</h2>
                    <div class=img-container><img src="${drama.dramaImg}" alt="${drama.Title}"></div>
                `;
                
                let backContent = `
                    <h3>Drama ID: ${drama.dramaId}</h3>
                    <h2>${drama.Title}</h2>
                    <h3>${drama.originalTitle}</h3>
                    <h3>Language: ${drama.language}</h3>
                    <h3>Episodes: ${drama.episodes}</h3>
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