const loginButton = document.getElementById('login');
loginButton.addEventListener("click", obtenerToken);

function load () {
    setNavBarToken()
  }

async function obtenerToken() {

    const url = "/login";
    const emailElement = document.getElementById('emailUsuario');
    const passwordElement = document.getElementById('passwordUsuario');
    const email = emailElement.value;
    const password = passwordElement.value;
    const data = { email, password }

    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const response = await fetch(url, fetchConfig)

    let body;
    switch (response.status) {
        case 200:
            body = await response.json();
            localStorage.setItem("token", body.token)
            window.location = '/productos?token=' + body.token
            break;
        default:
            localStorage.removeItem("token")
            body = await response.json();
            alert(body.error);
            break;
    }
}

document.getElementById("btn").addEventListener("click", irRegistro)

function irRegistro() {
    window.location = "/user"

}