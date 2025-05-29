const header = document.querySelector('header');
const middle = document.querySelector('.middle');
// export function ObserverFunc(param1, param2, a, b, c) {
//   const observer1 = new IntersectionObserver((entries) => {
//     entries.forEach(() => {
//       // modifyHeader(a, b, c)
//       console.log('done')
//     })
//   }, {
//     root: param1,
//     rootMargin: '0px',
//     threshold: 0
//   });

//   observer1.observe(param2)
// }

export function scrollAnim(param, param2, param3, param4, callback1, callback2) {
  let lastScroll = 0
  param.addEventListener('scroll', () => {
    if (param.scrollTop >= 80) {
      callback1()
    } else {
      callback2()
    }
  headerAndInputAnim(lastScroll, param2, param3, param4)
})
}

export function headerAndInputAnim(lastScroll, param2, param3, param4) {
  const calculation = (30 - param2.scrollTop) / 30
   if (lastScroll < param2.scrollTop) {
    param3.style.transform = `scaleY(${calculation})`;
    document.documentElement.style.setProperty('--inputOpacity', '0');
    /* to fix negative scalling */
      if (calculation < 0) {
        param3.style.transform = `scaleY(0)`
      }
   } else {
    param3.style.transform = `scaleY(1)`
    document.documentElement.style.setProperty('--inputOpacity', '1')
   }

  if (param2.scrollTop >= 40) {
    param4.style.position = 'relative'
    param4.style.top = `40px`
  } else {
    param4.style.position = 'sticky'
    param4.style.top = 0
  }
}

// FUNCTIONS THAT UPDATE THE HEADER BASED ON SCROLL
export function updateHeader(param) {
  header.style.backgroundColor = 'rgb(155, 154, 154, 0.1)'
  middle.textContent = param
}

export function restoreHeader() {
  header.style.backgroundColor = ''
  middle.textContent = ''
}

// FUNCTIONS THAT SET  THE PAGE FOOTER ELEMENT
export function renderPageFooter() {
  const pageFooterHTML =  (
    ` <div class="footer-items updates" data-type = 'status'>
        <ion-icon class="icon" name="disc-outline" data-type = 'status'></ion-icon>
        <small data-type = 'status'>Updates</small>
      </div>
      <div class="footer-items calls" data-type = 'calls'>
        <ion-icon class="icon" name="call-outline" data-type = 'calls'></ion-icon>
        <small data-type = 'calls'>Calls</small>
      </div>
      <div class="footer-items communities" data-type = 'communities'>
        <ion-icon class="icon" name="people-outline" data-type = 'communities'></ion-icon>
        <small data-type = 'communities'>Communities</small>
      </div>
      <div class="footer-items chats" data-type = 'chat'>
        <ion-icon class="icon" name="chatbubbles-outline" data-type = 'chat'></ion-icon>
        <small data-type = 'chat'>Chats</small>
      </div>
      <div class="footer-items settings" data-type = 'settings'>
        <ion-icon class="icon" name="cog-outline" data-type = 'settings'></ion-icon>
        <small data-type = 'settings'>Settings</small>
      </div>`
  )
  return pageFooterHTML
}

export function savecontactListToStorage(data) {
  localStorage.setItem('contactList', JSON.stringify(data))
}

export function getCurrentTime() {
  const hour = new Date().getHours();
  const formatedHour = hour > 12 ? hour - 12 : hour
  const qualifier = hour > 12 ? 'PM' : 'AM'
  const minute = new Date().getMinutes()
  const formatedMinute = minute < 10 ?`0${minute}` : minute;
  const currentTime = `${formatedHour}:${formatedMinute} ${qualifier}`

  return currentTime
}