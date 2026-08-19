const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage();

const socketController = async (socket = new Socket(), io) => {

    const user = await comprobarJWT(socket.handshake.headers["x-token"]);
    if (!user) {
        return socket.disconnect();
    }

    //Agregar el usuario conectado
    chatMessage.conectUser(user);
    io.emit("usuarios-activos", chatMessage.usersArr);
    socket.emit("recibir-mensajes", chatMessage.ultimos10);

    //Conectarlo a una sala especial
    socket.join(user.id); //global, socket.id, user.id

    //Limpiar cuando alguien se desconecte
    socket.on("disconnect", () => {
        chatMessage.disconnectUser(user.id);
        io.emit("usuarios-activos", chatMessage.usersArr);
    })

    socket.on("enviar-mensaje", ({ uid, message }) => {
        if (uid) {
            //Mensaje privado
            socket.to(uid).emit("mensaje-privado", { de: user.name, message });
        } else {
            chatMessage.sendMessage(user.id, user.name, message)
            io.emit("recibir-mensajes", chatMessage.ultimos10);
        }

    })

};

module.exports = {
    socketController
};