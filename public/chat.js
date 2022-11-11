const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const username = document.getElementById('name');
const feedback = document.getElementById('feedback');

const socket = io.connect(`localhost:${window.config?.port || 3000}`, {
    transports: ['websocket'],
    auth: {
        port: window.config?.port,
    }
});

send.addEventListener('click', () =>{
    socket.emit('send', {
        username: username.value,
        message: message.value,
    })
    message.value = '';
})

socket.on('send', (data) => {
    console.log('got new message', data)
    output.innerHTML += '<p><strong>' + data.username + '</strong>: ' + data.message + '</p>';
    feedback.innerHTML = '';
    document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight

})