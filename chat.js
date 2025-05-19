const pageContainer = document.querySelector('.chat-container')
const chatBodyContainer = document.querySelector('.js-chatbody');
const chatInputContainer = document.querySelector('.sendmsg')
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.querySelector('.js-sendBtn');
const mediaHtml = document.querySelector('.js-media');
let timer; 

/* render conversation on page-load and set height of the page */
 renderChat()
//  autoChat()

/* listen for viewport change resize*/
window.visualViewport.addEventListener('resize', () => {
  handlePageResize()
})

/* to fix the broswer behaviour of pushing the body out of view on input focus*/
chatInput.addEventListener('focus', () => {
  document.body.scrollTo({
    behavior: "smooth",
    top: window.scrollY,
    left: 0
    })
})

/* this array contains list of chats been retrieved from the browser storage and defaul value of [] is set if null is returned*/
const conversation = JSON.parse(localStorage.getItem('conversation')) ?? [];

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleChat()
    chatInput.value = ''
    chatBodyContainer.scrollTo({
    behavior: 'smooth',
    top: chatBodyContainer.scrollHeight,
    left: 0
  })
  }
});


chatInput.addEventListener('input', () => {
  const {height} = chatInputContainer.getBoundingClientRect();
  if (chatInput.value !== '') {
    sendChatBtn.classList.add('showSendBtn');
    mediaHtml.classList.add('hideMedia')
  } else {
    sendChatBtn.classList.remove('showSendBtn');
    mediaHtml.classList.remove('hideMedia')
  }
  
  chatInput.style.height = '30px';
  chatInput.style.height = `${Math.min(chatInput.scrollHeight, 80)}px`
  document.documentElement.style.setProperty('--inputContainerHeight', `${height}px`);
});


sendChatBtn.addEventListener('click', () => {
  handleChat()
  chatInput.value = ''
  chatInput.focus()
  chatBodyContainer.scrollTo({
    behavior: 'smooth',
    top: chatBodyContainer.scrollHeight,
    left: 0
  })
  sendChatBtn.classList.remove('showSendBtn');
  mediaHtml.classList.remove('hideMedia')
})

/* FUNCTIONS SECTION */
function handleChat() {
  addToChat()
  renderChat()
}

function handlePageResize() {
  document.documentElement.style.setProperty('--windowHeight', `${window.visualViewport.height}px`)
  document.documentElement.style.setProperty('--windowWidth', `${window.visualViewport.width}px`);
  document.body.style.position = 'fixed';
  document.body.style.top = `${window.scrollY}px`;
  document.body.style.right = `${window.scrollX}px`;
  document.body.style.bottom = '0px'
}

function saveToStorage() {
  localStorage.setItem('conversation', JSON.stringify(conversation))
}

function addToChat() {
  if (chatInput.value.trim() !== '') {
    conversation.unshift({type: 'sender', value: chatInput.value})
    saveToStorage()
  }
}

function renderChat () {
  const chats = JSON.parse(localStorage.getItem('conversation')) ?? [];
  const conversation = chats.map((item, index) => {
    const class1 = (item.type === 'sender') ? 'sender': 'receiver';
    const time = getCurrentTime()
    return (
       `<div class="chat-item ${class1}" id="chat-item${index}">
          <div>${item.value}</div>
          <span>${time}</span>
       </div>`
    )

  })
  chatBodyContainer.innerHTML = conversation.join('')
}

function getCurrentTime() {
  const hour = new Date().getHours();
  const formatedHour = hour > 12 ? hour - 12 : hour
  const qualifier = hour > 12 ? 'PM' : 'AM'
  const minute = new Date().getMinutes()
  const formatedMinute = minute < 10 ?`0${minute}` : minute;
  const currentTime = `${formatedHour}:${formatedMinute} ${qualifier}`

  return currentTime
}

/* function that automatically add msg to the conversation array*/

async function autoChat() {
  clearInterval(timer);
  await new Promise((resolve) => {
    timer = setInterval(() => {
      conversation.unshift({type: 'receiver', value: 'Hey, I am a Bot'});
      saveToStorage();
      renderChat()
      resolve()
    }, 20000);
  });
}
