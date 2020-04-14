const socket = io.connect('http://localhost:8080')

let message = document.querySelector("#message")
let username = document.querySelector("#username")
let send_message = document.querySelector("#send_message")
let send_username = document.querySelector("#send_username")

let feedback = document.querySelector("#feedback")

let show_name = document.querySelector("#show_name")
let amount_users = document.querySelector("#amount_users")
let typing = document.querySelector("#typing");
let sound = document.querySelector("#sound");


const backgroundColor = ['has-background-danger' ,'has-background-info' ,'has-background-primary', 'has-background-dark', 'has-background-link'];


function getRand(arr){
    // хорошо бы модифицировать в уникальный рандом
    let rand_num = Math.round(Math.random() * arr.length-1);
    let mod_num = Math.abs(rand_num);
    return mod_num;
}

let user_color = backgroundColor[getRand(backgroundColor)];
//д/з
//связаться с сервером, получить там массив цветов таких , которые там есть, и из него удалить получшийся номер
// если на беке цвет, который тут получился, удален, тогда просим рандом заново выбрать


function display_name(name){
    show_name.innerHTML = `Ваш ник сейчас <span class=${user_color}> ${name} </span`;
}


display_name("Aноним"); // по дефолту отображается имя Аноним

socket.on("amount_users", (data)=>{
    amount_users.innerHTML = `Всего было в сети пользователей: <span class="has-text-danger"> ${data} </span`;
    // получение информации по заголовку количество пользователей
})


send_message.onclick = () => {
    socket.emit("new_message", {message: message.value, color: user_color})
    //emit - отправка
}
message.addEventListener("keypress", (e)=>{
    if(e.keyCode == 13){
        socket.emit("new_message", {message: message.value, color: user_color})
    }
     clear(message);
})

socket.on("add_mes", (data)=>{
    let {username, message, color} = data;
    sound.play()
    feedback.insertAdjacentHTML('beforeend',  `<h5 class='has-text-light mes_single ${color}'> <span> ${username} </span>:   ${message} </h5> `);
    clear(message);
})

function clear(){
    message.value = '';
}

send_username.onclick = () => {
    socket.emit('change_username', {username: username.value})
    display_name(username.value);
}

message.addEventListener("keypress", ()=>{
    socket.emit("typing");
})

socket.on("typing", (data) =>{
  let {amount} = data;
  typing.innerHTML = `${amount} пользователей печатают сообщения`
    console.log("он печатает")
    chatroom.appendChild(div)
})










