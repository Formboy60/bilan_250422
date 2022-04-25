import {uploadFile} from "../login/fb/fb.js"


let prenom = document.querySelector(".prename")
let armure = document.querySelector(".armure")
let technique = document.querySelector(".technique")
let description = document.querySelector(".description")
let nomPhoto = document.querySelector('.photo')
let fichier = document.querySelector('.upload')

////////// is login ////////
import {isLogin} from "../login/fb/fb.js"
isLogin("../../front-office/index.html")


//////// upload photo ///////////

fichier.addEventListener('change', () => {
    uploadFile(fichier.files[0], fichier.files[0].name, nomPhoto)
})


/////////// post front /////////
document.querySelector(".valide").addEventListener("click", () =>{
const p = document.createElement('p')
    p.textContent = description.value
    p.innerHTML = p.innerHTML.replace(/\n/g, '<br>\n');
    
        const newFiche = {  
                            
                            "prenom": prenom.value,
                            "armure": armure.value,
                            "technique": technique.value,
                            "description": p.innerHTML,
                            "photo": nomPhoto.value}
    
        fetch("http://localhost:3000/cdz/new",
        {   method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(newFiche)
        })
        .then(res => res.json())
        .then(res=> document.querySelector('.result').textContent = res.message)
        .catch(function(res){ console.log(res) })
        
    prenom.value = ""
    armure.value = ""
    technique.value = ""
    description.value = ""
    nomPhoto.value = ""
    fichier.value = ""
    })

