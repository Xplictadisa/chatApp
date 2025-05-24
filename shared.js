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
