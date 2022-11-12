// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9yogPphFgvJV1uC4a7jrfkHO4uWLcpyY",
    authDomain: "smit-attendance-2b083.firebaseapp.com",
    projectId: "smit-attendance-2b083",
    storageBucket: "smit-attendance-2b083.appspot.com",
    messagingSenderId: "476318072316",
    appId: "1:476318072316:web:db62c156216f8c93298679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);


//firebase signin function

function signInFirebase(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
function logoutfromfirebase() {
    return signOut(auth);
}
// firebase sign up function 


export {
    signInFirebase,
    logoutfromfirebase
};
