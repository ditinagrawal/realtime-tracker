const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("/public"));

io.on("connection", (socket) => {
    socket.on("sendLocation", (data) => {
        io.emit("newLocation", {id: socket.id, ...data});
    });

    socket.on("disconnect", () => {
        io.emit("removeLocation", socket.id);
    });
})

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/index.html");
});

server.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`);
});
