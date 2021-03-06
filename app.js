const express = require('express')
const favicon = require('express-favicon')

port = process.env.PORT || 8080;

const app = express()

app.set("view engine", "ejs")


app.use(express.static("public")) //отдает нашу статику
app.use(favicon(__dirname+'/favicon.png'))

app.get("/", (req,res)=>{
    res.render("index")
})



server = app.listen(port, ()=>{
    console.log("server поднялся");
    console.log('http://localhost:8080');
})


const io = require("socket.io")(server)
let count_users = 0; 
let count_typing = 0;

io.on("connection", (socket)=>{
    console.log(socket)
    console.log("У вас чате есть новый пользователь!");
    count_users++;
    socket.username = "Anonimus";
    console.log(count_users);

    io.sockets.emit("amount_users", count_users)

    socket.on("change_username", (data) =>{
        socket.username = data.username;
        console.log("поменяли имя")
        console.log(data.username)
    })


    socket.on("new_message", (data)=>{
        io.sockets.emit("add_mes", {message:data.message, username: socket.username, color: data.color})
        console.log(` всем отправлены сообщения ${data.message}`)
    })


    socket.on("typing",(data) =>{
        console.log("он печатает")
        count_typing++;
        socket.broadcast.emit("typing", {amount:  count_typing})
        setTimeout(() => {
        count_typing = 0;
        }, 3000);
    })
})