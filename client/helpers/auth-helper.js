import { signout } from "../api/user_api";

function isAuthenticated() {
    if (typeof window == "undefined")
        return false;
    if (sessionStorage.getItem('jwt'))
        return JSON.parse(sessionStorage.getItem('jwt'));
    else
        return false;
}

function clearJwt(cb) {
    if (typeof window == "undefined")
        sessionStorage.removeItem('jwt');
    cb();
    signout().then((data) => {
        document.cookie = "t =; expires = Thu, 1 jan 1970 00:00:00 UTC; path= /;"
    });
}