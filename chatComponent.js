import { contactList } from "./Data/data.js"

/*RENDER CHAT PAGE ON PAGE LOAD */
const main = document.querySelector('main');
main.innerHTML = chatHTML();

/* EACH ELEMENT DECLARATION */
const mainContHTML = document.querySelector('.main-container');
const searchInput = document.querySelector('.js-search-input');
const searchContHTML = document.querySelector('.search-container');
const navContainer = document.querySelector('.nav-container');
const pageTitleCont = document.querySelector('.page-title-container');
const chatHeader = document.querySelector('.head-container .middle');
const header = document.querySelector('header');
const contactListCont = document.querySelector('.contactList-container');
const sendIcon = document.querySelector('.icon.send')
const backIcon = document.querySelector('.icon.back')
const footer = document.querySelector('footer');

/* FOR ANIMATING THE DIV= 'CHAT' AND INPUT ON SCROLL*/
chatScrollAnim();
ObserverFunc(mainContHTML, pageTitleCont, chatHeader, header);

/* RENDER CONTACT ON PAGE LOAD */
renderContact(contactListCont);


searchInput.addEventListener('focus', () => {
  navContainer.style.display = 'none';
  contactListCont.style.display = 'none'
  pageTitleCont.style.display = 'none'
  header.style.display = 'none'
  searchContHTML.style.position = 'fixed'
  searchContHTML.style.top = 0;
  const leftPos = searchContHTML.getBoundingClientRect().left
  searchContHTML.style.left = leftPos
  searchContHTML.style.padding = '0 10px'
  sendIcon.style.display = 'block'
  backIcon.style.display = 'block'
  footer.style.display = 'none'
});

backIcon.addEventListener('click', () => {
  navContainer.style.display = 'flex'
  contactListCont.style.display = 'flex'
  pageTitleCont.style.display = 'flex'
  header.style.display = 'flex'
  searchContHTML.style.position = 'sticky'
  searchContHTML.style.top = '40px'
   searchContHTML.style.padding = ''
  sendIcon.style.display = 'none'
  backIcon.style.display = 'none'
  footer.style.display = 'flex'
})


/* FUNCTIONS */
function chatHTML() {
  return (
    ` <div class="main-container">
        <!-- title -->
      <div class="page-title-container">
        <div class="page-title js-page-title">
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
    `
  )
}

function chatScrollAnim() {
  let lastScroll = 0
  mainContHTML.addEventListener('scroll', () => {
  headerAndInputAnim(lastScroll)
})
}

function ObserverFunc(mainContHTML, pageTitleCont, chatHeader, header) {
  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(() => {
      chatHeader.classList.toggle('showChatHeader');
      header.classList.toggle('changeBackground')
    })
  }, {
    root: mainContHTML,
    rootMargin: '0px',
    threshold: 0.1
  });

  observer1.observe(pageTitleCont)
}

function headerAndInputAnim(lastScroll) {
  const calculation = (30 - mainContHTML.scrollTop) / 30
   if (lastScroll < mainContHTML.scrollTop) {
    searchContHTML.style.transform = `scaleY(${calculation})`;
    document.documentElement.style.setProperty('--inputOpacity', '0');
    /* to fix negative scalling */
      if (calculation < 0) {
        searchContHTML.style.transform = `scaleY(0)`
      }
   } else {
    searchContHTML.style.transform = `scaleY(1)`
    document.documentElement.style.setProperty('--inputOpacity', '1')
   }

  if (mainContHTML.scrollTop >= 40) {
    pageTitleCont.style.position = 'relative'
    pageTitleCont.style.top = `40px`
  } else {
    pageTitleCont.style.position = 'sticky'
    pageTitleCont.style.top = 0
  }
}

function renderContact(contactListCont) {
  const contactHTML = contactList.map((contact) => {
  return (
    `<div class="contact no${contact.id}">
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
