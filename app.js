const express = require('express')
const favicon = require('express-favicon')


port = process.env.PORT || 8080;

const app = express()

app.set("view engine", "ejs")


app.use(express.static("public"))
app.use(favicon(__dirname+'/favicon.png'))

app.get("/", (req,res)=>{
    res.render("index")
})



server = app.listen(port, ()=>{
    console.log("server поднялся")
    console.log('http://localhost:8080');
})


const io = require("socket.io")(server)

io.on("connection", (socket)=>{
    console.log("У вас чате есть новый пользователь!");

    socket.username = "Anonimus";

    socket.on("change_username", (data) =>{
        socket.username = data.username;
        console.log("поменяли имя")
        console.log(data.username)
    })


    socket.on("new_message", (data)=>{
        io.sockets.emit("add_mes", {message:data.message, username: socket.username})
        console.log(` всем отправлены сообщения ${data.message}`)
        
    })
})