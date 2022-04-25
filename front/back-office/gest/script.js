
import {isLogin} from "../login/fb/fb.js"
isLogin("../../front-office/index.html")
import {get} from "../../functions/get.js"

let userId = document.querySelector(".uid")
let prenom = document.querySelector(".prename")
let armure = document.querySelector(".armure")
let technique = document.querySelector(".technique")


get(true)


///////// delete front ///////////

document.querySelector('main').addEventListener('click', (e)=>{

    if(e.target.className === "sup"){
      fetch(`http://localhost:3000/cdz/${e.target.parentNode.dataset.id}`,{
          method:'DELETE'
      }).then(res => res.json())
      .then(res=> document.querySelector('.result').textContent = res.message)
      } else if (e.target.className == "edit"){
    
        
//////////// put front ///////////// 



console.log(e.target.parentNode.childNodes[1].childNodes[1].textContent)
      const newArticle = {  "prenom": e.target.parentNode.childNodes[1].childNodes[1].textContent, 
                            "armure": e.target.parentNode.childNodes[1].childNodes[3].textContent,
                            "technique": e.target.parentNode.childNodes[1].childNodes[5].textContent,
                            
                        }
    
      fetch(`http://localhost:3000/cdz/${e.target.parentNode.dataset.id}`,
      
        {   method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(newArticle)
        })
        .then(res => res.json())
        .then(res=> document.querySelector('.result').textContent = res.message)
        .then(function(res){localStorage.setItem("UserID", res.uid)})
        .catch(function(res){ console.log(res) })
    }
    })


       