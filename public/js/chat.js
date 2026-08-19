
const url = "http://localhost:8080/api/auth/";

let user = null;
let socket = null;

const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const ulUsuarios = document.querySelector("#ulUsuarios");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

const validateJWT = async () => {
    const token = localStorage.getItem("token");
    // Si el token no existe o es muy corto, redirigimos.
    if (!token || token.length <= 10) {
        window.location = "index.html";
        throw new Error("token no valido");
    }

    const resp = await fetch(url, {
        headers: {
            "x-token": token
        }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem("token", tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();

}

const connectSocket = async () => {

    socket = io({
        "extraHeaders": {
            "x-token": localStorage.getItem("token")
        }
    });

    socket.on("connect", () => {
        console.log("Sockets online");
    });

    socket.on("disconnect", () => {
        console.log("Sockets offline");
    });

    socket.on("recibir-mensajes", drawMessage)

    socket.on("usuarios-activos", drawUsers)

    socket.on("mensaje-privado", (payload) => {
        console.log("Privado", payload)
    });
}

const drawUsers = (users = []) => {

    let usersHtml = "";
    users.forEach(({ name, uid }) => {
        usersHtml += `
        <li>
            <p>
                <h5 class="text-success">${name}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>
        </li>`;
    })

    ulUsuarios.innerHTML = usersHtml;
}

const drawMessage = (message = []) => {

    let messageHTML = "";
    message.forEach(({ name, message }) => {
        messageHTML += `
        <li>
            <p>
                <span class="text-success">${name}</span>
                <span>${message}</span>
            </p>
        </li>`;
    })

    ulMensajes.innerHTML = messageHTML;
}

txtMensaje.addEventListener("keyup", ({ keyCode }) => {

    const message = txtMensaje.value;
    const uid = txtUid.value;

    if (keyCode !== 13) { return; }
    if (message.length === 0) { return; }
    socket.emit("enviar-mensaje", { uid, message });

    txtMensaje.value = "";
})

const main = async () => {

    await validateJWT();

}

main();



//const socket = io()