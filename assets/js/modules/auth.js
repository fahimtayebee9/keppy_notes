import UserManager from "./../files/userManager.js";
import Element from "./element.js";


export default class Auth{
    
    static displayLoginInfo = () => {
        const randomUser = UserManager.getRandomUser();
        Element.username.innerHTML = randomUser.username;
        Element.password.innerHTML = randomUser.password;
    }

    static _loginAction = (event) => {
        event.preventDefault();
        const username = Element.inpUsername.value;
        const password = Element.inpPassword.value;
        if(Boolean(username) && Boolean(password)){
            setTimeout(() => {
                Element.preloaderDiv.style.display = "none";
            }, 2000);

            UserManager.getAllUsers().forEach( user => {
                if(username == user.username && password == user.password){
                    Element.loginSection.style.display = "none!important";
                    Element.mainSection.style.display  = "block";
                    localStorage.setItem("user", JSON.stringify(user));
                    location.reload();
                }
            });
            
        }
    }

    static getUser = () => {
        return (Boolean(JSON.parse(localStorage.getItem("user")))) ? JSON.parse(localStorage.getItem("user")) : null;
    }

    static setUserData = (user) =>{
        Element.userImg.src = user.image;
    }

    static checkUser = () => {
        let user  = Auth.getUser();
        if(user == null || user === 'undefined'){
            Element.loginSection.style.display = "block!important";
            Element.mainSection.style.display  = "none";
            // location.href = "login.html";
            return false;
        }
        else{
            Element.loginSection.style.display = "none!important";
            Element.mainSection.style.display  = "block";
            // location.href = "index.html";
            Auth.setUserData(user);
            return true;
        }
    }

    static signOutAction = (event) => {
        event.preventDefault();
        localStorage.removeItem('user');
        Auth.checkUser();
    }

    static eventListeners = () => {
        Element.btnLogin.addEventListener('click', Auth._loginAction);
        Element.inpUsername.addEventListener('focusout', Auth._checkEmpty);
        Element.inpPassword.addEventListener('focusout', Auth._checkEmpty);
        Element.signOutBtn.addEventListener('click', Auth.signOutAction);
    }

    // RENDER ALL
    static renderAll = () => {
        Auth.displayLoginInfo();
        Auth.eventListeners();
        Auth.checkUser();
    };

};
