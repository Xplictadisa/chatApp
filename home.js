import { contactList } from "./Data/data.js";

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

/* */
let lastScroll = 0
mainContHTML.addEventListener('scroll', () => {
  headerAndInputAnim(lastScroll)
})

ObserverFunc();
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

/* FUNCTIONS SECTION*/
function ObserverFunc() {
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

function headerAndInputAnim(param) {
  const calculation = (30 - mainContHTML.scrollTop) / 30
   if (param < mainContHTML.scrollTop) {
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