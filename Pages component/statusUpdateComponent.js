const main = document.querySelector('main');
const right = document.querySelector('.right') ;
const left = document.querySelector('.left')
// const statusUpdateBtn = document.querySelector('.footer-items.updates')
const middle = document.querySelector('.middle')


/* FUNCTIONS */
export function statusUpdateComponent() {
  updateStatusPageHeader()
      main.innerHTML = `
      <div class="statusUpdateComponentContainer">
        <p class="note">Page is in progess...</p
      </div>`
}


/**THIS FUNCTION UPDATE STATUS PAGE HEADER */
function updateStatusPageHeader() {
  left.innerHTML = (`
      <ion-icon class="icon ellipsis" name="ellipsis-horizontal-sharp"></ion-icon>`
      )
  right.innerHTML = '';
  middle.innerHTML = ''
}