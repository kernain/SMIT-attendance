import { signInFirebase } from './config/firebase.js'

console.log("hello")

window.signIn = async function () {
    //1. values get karunga
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    //2. firebase ka signin function call karunga
    try {
        await signInFirebase(email, password)
        // alert("Sexfully login")
        await swal({
            title: "Successfully login!",
            icon: "success",
            timer: 3000
        });
        window.location.href = "./views/dashboard/dashboard.html"

    } catch (e) {
        swal({
            title: "Incorrect Credentials",
            icon: "error",
            timer: 3000,
            button: "Close"
        })
    }


    //3. success alert

    //4. navigate to dashboard 
}
