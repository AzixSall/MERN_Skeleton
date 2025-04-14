function isAuthenticated() {
    if (typeof window == "undefined")
        return false
    if (sessionStorage.getItem('jwt'))
        return JSON.parse(sessionStorage.getItem('jwt'))
    else
        return false
}