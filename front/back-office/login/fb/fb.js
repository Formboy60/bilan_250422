import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getStorage, ref, uploadBytes , uploadBytesResumable, getDownloadURL   } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDEq7D_0XWxB9_-f6gEfeGTH35IfyrKh9o",
    authDomain: "bilan-14be5.firebaseapp.com",
    projectId: "bilan-14be5",
    storageBucket: "bilan-14be5.appspot.com",
    messagingSenderId: "654381213571",
    appId: "1:654381213571:web:d255a69f4f727bbd0e38b6"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth();

export function login(email, password, url){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        document.location.href = url
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
}    


export function isLogin(notloged){

  
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        return true
        // ...
    } else {
        document.location.href = notloged
        return false
    }
  });
}

export function index(){

  let edit = false
  onAuthStateChanged(auth, (user) => {
    
    if (user) {
        const uid = user.uid;
        return true
        // ...
    } else {
        document.location.href = notloged
        return false
    }
  });
}

const storage = getStorage();


export function uploadFile(file, name, selector){
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);

 
  uploadTask.on('state_changed', 
    (snapshot) => {
      
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        selector.value = downloadURL
     
      });
    }
  );
}