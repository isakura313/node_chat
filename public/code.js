const socket = io.connect('http://localhost:8080')

let message = document.querySelector("#message")

let username = document.querySelector("#username")

let send_message = document.querySelector("#send_message")
let send_username = document.querySelector("#send_username")
let chatroom = document.querySelector("#chatroom")
let feedback = document.querySelector("#feedback")

let show_name = document.querySelector("#show_name");







function display_name(name){
    show_name.innerHTML = `Ваш ник сейчас <span class="has-text-danger"> ${name} </span`;
}


display_name("Aноним");


send_message.onclick = () => {
    socket.emit("new_message", {message: message.value})
}

socket.on("add_mes", (data)=>{
    let {username, message} = data;
    
    feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single has-background-dark'> <span> ${username} </span>:   ${message} </h5> `);
    clear(message);
})

function clear(input){
    input.value = '';
}

send_username.onclick = () => {
    socket.emit('change_username', {username: username.value})
    display_name(username.value);
    clear(username)
}










