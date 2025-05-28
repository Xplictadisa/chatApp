import { contactList} from "../Data/data.js"
import { scrollAnim, updateHeader, restoreHeader, renderPageFooter} from "../utility/shared.js";

const header = document.querySelector('header');
const main = document.querySelector('main');
// const chatBtn = document.querySelector('.footer-items.chats');
const footer = document.querySelector('footer');
const footerContainer = document.querySelector('.footer-container');
const right = document.querySelector('.right') ;
const left = document.querySelector('.left')
const middle = document.querySelector('.middle')


/* RENDER CHAT COMPONENT ON CHAT BTN CLICKED*/
// chatBtn.addEventListener('click', () => {
//   chatComponent();
// })

/* FUNCTIONS */
export function chatComponent() {
  updateChatPageHeader()
  main.innerHTML = chatHTML();

  /* EACH ELEMENT DECLARATION AFTER MOUNTED ON THE DOM */
  const chatContHTML = document.querySelector('.chat-container');
  const searchInput = document.querySelector('.js-search-input');
  const searchContHTML = document.querySelector('.search-container');
  const navContainer = document.querySelector('.nav-container');
  const chatTitleCont = document.querySelector('.chat-title-container');
  const contactListCont = document.querySelector('.contactList-container');
  const sendIcon = document.querySelector('.icon.send')
  const backIcon = document.querySelector('.icon.back')
  const chatMessagesContainer = document.querySelector('.chat-message-container')

  /* FOR ANIMATING THE DIV= 'CHAT' AND INPUT ON SCROLL*/
  scrollAnim(chatContHTML, chatContHTML, searchContHTML, chatTitleCont, () => {updateHeader('Chat')}, restoreHeader);
 

  /* RENDER ALL ACTIVE CONTACT ON CHAT PAGE ON PAGE LOAD */
  renderActiveContact(contactListCont);

  /* ADD AN EVENT LISTENER TO EACH CONTACT RENDERED  */
   openChatMessage(chatMessagesContainer)


  searchInput.addEventListener('focus', () => {
    navContainer.style.display = 'none';
    contactListCont.style.display = 'none'
    chatTitleCont.style.display = 'none'
    header.style.display = 'none'
    searchContHTML.style.position = 'fixed'
    searchContHTML.style.top = 0;
    const leftPos = searchContHTML.getBoundingClientRect().left
    searchContHTML.style.left = leftPos - 10
    searchContHTML.style.padding = '0 10px'
    sendIcon.style.display = 'block'
    backIcon.style.display = 'block'
    footer.style.display = 'none'
  });

  backIcon.addEventListener('click', () => {
    navContainer.style.display = 'flex'
    contactListCont.style.display = 'flex'
    chatTitleCont.style.display = 'flex'
    header.style.display = 'flex'
    searchContHTML.style.position = 'sticky'
    searchContHTML.style.top = '40px'
    searchContHTML.style.padding = ''
    sendIcon.style.display = 'none'
    backIcon.style.display = 'none'
    footer.style.display = 'flex'
  })
}


function chatHTML() {
  return (
    ` <div class="chat-container">
        <!-- title -->
      <div class="chat-title-container">
        <div class="chat-title js-chat-title">
          <h2>Chats</h2>
        </div>
      </div>
      <div class="search-container">
        <ion-icon class="icon back" name="chevron-back-outline"></ion-icon>
        <div class="input">
          <ion-icon class="search-icon" name="search-outline"></ion-icon>
          <input class="js-search-input" type="text" placeholder="Ask Meta AI or Search">
        </div>
        <ion-icon class="icon send" name="send-sharp"></ion-icon>
      </div>
      <!-- Nav -->
      <div class="nav-container">
        <div class="items all">All</div>
        <div class="items">Unread<span>55</span></div>
        <div class="items">Favorites</div>
        <div class="items">Groups<span>9</span></div>
        <!-- icon -->
        <ion-icon class="items icon" name="add-outline"></ion-icon>
      </div>
      <!-- contactList container -->
       <div class="contactList-container"></div>
    </div>
    <!-- a container for chat messages -->
     <div class="chat-message-container"></div>
    `
  )
}

function renderActiveContact(contactListCont) {
  const contactHTML = contactList.map((contact) => {
  return (
    `<div class="contact no${contact.id}" data-contact-id=${contact.id}>
        <div class="img-container">
          <img src="${contact.image}" alt="person">
        </div>
        <div class="name-container">
          <p class="contact-name" >${contact.name}</p>
          <p class="lastMsg">${contact.lastMsg}</P>
        </div>
    </div>`
  )
})
contactListCont.innerHTML = contactHTML.join('');
}

function openChatMessage(chatMessagesContainer) {
  const activeContacts = document.querySelectorAll('.contact')
  const activeContactsArray = [...activeContacts]
 
  activeContactsArray.forEach((contact) => {

    contact.addEventListener('click', () => {
      footerContainer.innerHTML = showMessageInput(contact.id) /**THIS PUT THE INPUT ON THE PAGE FOR EACH CONTACT */

    /**GET SOME ELEMENT FROM THE INPUT CONTAINER
       * AFTER RENDERD ON THE PAGE */ 
      const chatInput = document.getElementById('chatInput');
      const sendChatBtn = document.querySelector('.js-sendBtn');
      const mediaHtml = document.querySelector('.js-media');

      /**update input field height when user type */
      updateInputFieldHeigt(chatInput, sendChatBtn, mediaHtml)

      const chatContainer = document.querySelector('.chat-container')
      
      /**COMPARE EACH CONTACT WITH THE CONTACTLIST ARRAY TO GET SOME DETAILS FROM THE CONTACTLIST */
      const {contactId} = contact.dataset
      
      contactList.forEach((contact, index) => {
        if (contactId === contact.id) {
         const inputElem = document.getElementById('chatInput');

         /**this function update the message array of each contact and unshift the value from the inputElement to it */
          sendMessage(inputElem, contact, chatMessagesContainer)
          chatMessagesContainer.innerHTML = contact.messages.join('')

          chatMessagesContainer.style.transform = 'translateX(-100%)';

          left.innerHTML = (`
            <div class="leftSidechatMessageHeader">
              <ion-icon class="backBtn" id="btn${index}" name="chevron-back-outline"></ion-icon>
              <div class="profile-details">
                <img src="${contact.image}" alt="">
                <p>${contact.name}</p>
              </div>
            </div>
            `)
          right.innerHTML = (`
            <div class="rightSidechatMessageHeader">
              <ion-icon class="icon" name="videocam-outline"></ion-icon>
              <ion-icon class="icon" name="call-outline"></ion-icon>
            </div>
            `)
          middle.innerHTML = ''
          
          
          chatContainer.style.overflow = 'hidden'

          /*THIS CLOSE THE CHATMESSAGE CONTAINER */
          const backBtn = document.getElementById(`btn${index}`)
          backBtn.addEventListener('click', () => {
            chatMessagesContainer.style.transform = 'translateX(100%)'
            updateChatPageHeader()
            footerContainer.innerHTML = renderPageFooter()
            chatContainer.style.overflowY = 'scroll'
          })
        }
        
      })
    })  
  })
}

/* THIS FUNCTION UPDATE THE HEADER OF THE CHAT PAGE */
function updateChatPageHeader() {
  left.innerHTML = (`
    <ion-icon class="icon ellipsis" name="ellipsis-horizontal-sharp"></ion-icon>`
  )
  right.innerHTML = (`
    <ion-icon class="icon camera" name="camera-sharp"></ion-icon>
    <ion-icon class="icon add" name="add-outline"></ion-icon>`
  )
  middle.innerHTML = ''
}

/**THIS FUNCTION UPDATE THE PAGE FOOTER AND RENDER AN INPUT ELEMENT ON THE FOOTER CONTAINER */
function showMessageInput(id) {
  return (`
    <div class="sendmsg" data-input-id="${id}">
      <div class="add-container">
        <ion-icon class="add" name="add-outline"></ion-icon>
      </div>
      <div class="text-area js-text-area">
        <textarea name="" id="chatInput" class="input${id}"></textarea>
      </div>
      <div class="media js-media">
        <ion-icon class="icon" name="camera-outline"></ion-icon>
        <ion-icon class="icon" name="mic-outline"></ion-icon>
      </div>
      
      <div class="sendBtn js-sendBtn">
        <!-- this div contain a send icon whose display is set to none -->
         <ion-icon style="font-weight: 800;" name="send-outline"></ion-icon>
      </div>
    </div>
  `)
}

function sendMessage(inputElem, contact, chatMessagesContainer) {
   inputElem.addEventListener('keydown', (e) => {
    if (inputElem.value.trim() !== '' && e.key === 'Enter') {
      const  message = (inputElem.value.trim())
      contact.messages.unshift(`<p>${message}</p>`)
      // allMessages.unshift({id: contact.id, message})
      chatMessagesContainer.innerHTML = contact.messages.join('')
    }
  })
}


/**THIS FUNCTION ADJUST THE INPUT ELEM AND MAIN ELEM HEIGHT ON INPUT  */
function updateInputFieldHeigt(chatInput, sendChatBtn, mediaHtml) {
  chatInput.addEventListener('input', () => {
    const {height} = footer.getBoundingClientRect();

    if (chatInput.value !== '') {
      sendChatBtn.classList.add('showSendBtn');
      mediaHtml.classList.add('hideMedia')
    } else {
      sendChatBtn.classList.remove('showSendBtn');
      mediaHtml.classList.remove('hideMedia')
    }

    chatInput.style.height = '40px';
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, 80)}px`

      document.documentElement.style.setProperty('--footerHeight', `${height}px`);
  });
}