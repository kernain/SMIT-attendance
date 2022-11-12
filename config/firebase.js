// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut,  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot
  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";


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
const db = getFirestore(app);
const storage = getStorage(app);


//firebase signin function

function signInFirebase(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
function logoutfromfirebase() {
    return signOut(auth);
}
// firebase sign up function 

function addClassToDb(classSchedule, classTiming, teacherName, sectionName, courseName, batchNumber,  className) {
    return addDoc(collection(db, "Classes"), {
        classSchedule,
        classTiming,
        teacherName,
        sectionName,
        courseName,
        batchNumber,
        className,
    });
  }
function addStudentToDb(studentName, fatherName, rollNo, contactNo, cnicnNo, courseName, imgResult) {
    return addDoc(collection(db, "Students"), {
        studentName,
        fatherName,
        rollNo,
        contactNo,
        cnicnNo,
        courseName,
        imgResult,
    });
  }

async  function getClasses(){
    const querySnapshot = await getDocs(collection(db, "Classes"));
  let classes = [];
  querySnapshot.forEach((doc) => {
    classes.push({ id: doc.id, ...doc.data() });
  });
  return classes;
  }


  async function uploadImage(image) {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

export {
    signInFirebase,
    logoutfromfirebase,
    addClassToDb,
    getClasses,
    uploadImage,
    addStudentToDb
};
