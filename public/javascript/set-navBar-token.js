const authNavLinks = document.querySelectorAll('.auth-nav-link')
function load () {
    setNavBarToken()
}
const setHrefs = (liskList, token) => {
    for (let i = 0; i < liskList.length; i++) {
        const link = liskList[i];
        link.href = link.href + `?token=${token}`;
    }
}

const setNavBarToken = () => {
    const token = localStorage.getItem('token');
    
    if(token) {
        setHrefs(authNavLinks, token);
    }
}

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener("click", cerrarSesion);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);

}

function cerrarSesion() {
    const token = localStorage.getItem('token')
    const {name} = parseJwt(token)
    
    alert(`Hasta luego ${name}`)
    localStorage.removeItem("token")
    window.location = '/'
    
}