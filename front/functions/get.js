let data =[]


export function get(admin) {

fetch('http://localhost:3000/cdz')
    .then(response => response.json())
    .then(res => { 
        data = res
        pagination(data, admin)
    })
    
}

function display(data, admin = false){

    document.querySelector(".fiches").innerHTML = ""
    
    
    for(let art of data)    
    
    document.querySelector(".fiches").innerHTML += 
    `<div class="info" data-id="${art._id}">
    <div class="id">
        <p id="prenom" contenteditable=${admin}>${art.prenom}</p>
        <p id="armure" contenteditable=${admin}>${art.armure}</p>
        <p id="technique" contenteditable=${admin}>${art.technique}</p>        
        </div>
        <img src="${art.photo}"/>
    <button class="detail">détails</button>
    <button class="sup">supprimer</button>
    <button class="edit">editer</button>
  </div> ` 
 
}


////////////// pagination /////////

 function pagination(data, admin){
    let pagination = []
    let page = []
    for( let i =0; i<data.length; i++){

        if(i%12 == 0 && i!=0){
            pagination.push(page)
            page = []
        }else{

            if(12>data.length-(12*pagination.length)){
                pagination.push( data.slice(i-1, data.length))
                break
            }
        }
        page.push(data[i])
    }

////////// createElement pagination ///////////

    for (let j =0; j< pagination.length; j++){
        const btn = document.createElement("button");
        btn.className = "numPage";
        btn.textContent = j+1;
        document.querySelector(".pgn").appendChild(btn);
    }

////////// affichage de la premiere page de base ///////////////

    display(pagination[0], admin)

/////////// affichage de la page correspondante ///////////////

    document.querySelector('.pgn').addEventListener('click', (e) => {

        let p = e.target.textContent-1
        display(pagination[p], admin)
    })


///////////////// filter ////////////////////

  
    const searchBar2 = document.querySelector('.prenom');
    
             
   searchBar2.addEventListener('keyup', () => {
       let input = searchBar2.value
       input=input.toLowerCase();
       const filter = data.filter(hub => {
           return hub.prenom.toLowerCase().includes(input)            
           })
           
           display(filter, admin)
           
    })
    
}
///////// get by ID //////////

let perso =[]

document.querySelector('main').addEventListener('click', (e)=>{
    
    if(e.target.textContent == "détails"){
    document.querySelector(".fiches").style.display = "none"
    document.querySelector(".perso").style.display = "flex"
    
        fetch(`http://localhost:3000/cdz/${e.target.parentNode.dataset.id}`)
            .then(response => response.json() )
            .then(res => {
                perso = res 
                console.log(perso)
                affiche(perso)
            })
                
    
        function affiche(perso, admin = false){
            
            
            document.querySelector(".perso").innerHTML = 
            `<div class="infoXL" data-id="${perso._id}">
            <div class="idXL">
                <p id="prenom" contenteditable=${admin}>${perso.prenom}</p>
                <p id="armure" contenteditable=${admin}>${perso.armure}</p>
                <p id="technique" contenteditable=${admin}>${perso.technique}</p>        
                <p id="decription">${perso.description}</p>
            </div>
                <img class="imgXL" src="${perso.photo}"/>
            <button class="retourXL">retour</button>
            <button class="sup">supprimer</button>
            <button class="edit">editer</button>
          </div> ` 
         
        }
        }
        if(e.target.textContent == "retour"){
            document.querySelector(".fiches").style.display = "grid"
            document.querySelector(".perso").style.display = "none"
        }
    }) 
