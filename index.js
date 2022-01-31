import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js';
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js';
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";


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


const app = initializeApp(firebaseConfig);


const auth = getAuth();
auth.languageCode = 'Ru';



document.getElementById('send').onclick = () => {
    let number = document.getElementById('number').value;
    if(number === '' || !number){
        return false;
    }
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
    }, auth);
    number = number.replace(/(\7|8)/,7);
    signInWithPhoneNumber(auth, `+${number}`, window.recaptchaVerifier).then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

    }).catch((error)  => {
        grecaptcha.reset(window.recaptchaWidgetId);

    });
}
document.getElementById('sendDb').onclick = () => {
    const code = document.getElementById('verificationCode').value;
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const nameCompany = 'SAD';
    const city = 'Kazan';
    if(name === ''){
        return false;
    }
    if(lastName === ''){
        return false;
    }
    if(phone === ''){
        return false;
    }
    if(city === ''){
        return false;
    }
    if(nameCompany === ''){
        return false;
    }
    confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        addMan(name, lastName, phone, email,city,nameCompany);
    }).catch((error) => {

    });
}

function addMan(name, lastName, phone, email, city,nameCompany) {
    const db = getDatabase(app);
    set(ref(db, '/' + Date.now()), {
        'Имя': name,
        'Фамилия': lastName,
        'Номер телефона': phone,
        'Почта': email,
        'Город': city,
        'Название компании': nameCompany,
    }).then(() => alert('user add'))
        .catch((error) => alert(error));
}

