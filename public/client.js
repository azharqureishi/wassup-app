const socket = io()

const textArea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message_area');
let userName ;
do{
    userName = prompt('Enter your username')
} while(!userName)

textArea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

//Send Message to user
function sendMessage(message){
  let msg = {
    name:userName,
    message: message.trim()
  }
  appendMessage(msg, 'outgoing')
  textarea.value = ''
  scrollToBottom()


  //Send to server
  socket.emit('message', msg);
}
 //Append Message 
function appendMessage(msg, type){
    const mainDiv = document.createElement('div');
    const className = type
    mainDiv.classList.add(className, 'message');

    const markup = `
    <h4>${msg.name}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

//Receive Message from server
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}