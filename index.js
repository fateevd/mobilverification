import {initializeApp, geDatabase, ref, set} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js';


const firebaseConfig = {
    apiKey: "AIzaSyB1ohGYCjvo2Pq-zuwFfQbbhUaaTSBVEP8",
    authDomain: "diplom-3fbe9.firebaseapp.com",
    databaseURL: "https://diplom-3fbe9-default-rtdb.firebaseio.com",
    projectId: "diplom-3fbe9",
    storageBucket: "diplom-3fbe9.appspot.com",
    messagingSenderId: "673311742332",
    appId: "1:673311742332:web:9348da767e1994bb452cf9",
    measurementId: "G-MTZTXQYSVW"
  };


initializeApp(firebaseConfig);



const auth = getAuth();
auth.languageCode = 'ru';
window.onload = function () {
    render();
}

function render() {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    recaptchaVerifier.render();
}

// document.getElementById('send').onclick = () => {
//     signInWithPhoneNumber(auth, '+79507992581', window.recaptchaVerifier).then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         console.log(confirmationResult)

//     }).catch(function (error) {
//         console.log(error);
//     });
// }
document.getElementById('code').onclick = () => {
    alert('asdads');
    const code = document.getElementById('verificationCode').value;
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    addMan(name, lastName, phone, email);
    // confirmationResult.confirm(code).then((result) => {
        // const user = result.user;
    // }).catch((error) => {

    // });
}

function addMan(name, lastName, phone, email) {
    const db = geDatabase();
    set(ref(db, '/' ),{
        name: name,
        lastName: lastName,
        phone: phone,
        email: email,
    })
}

