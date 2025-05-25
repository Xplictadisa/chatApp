const main = document.querySelector('main');
const right = document.querySelector('.right') ;
const left = document.querySelector('.left')
const statusUpdateBtn = document.querySelector('.footer-items.updates')



/* FUNCTIONS */
export function statusUpdateComponent() {
  statusUpdateBtnFun()
}

function statusUpdateBtnFun() {
  statusUpdateBtn.addEventListener('click', () => {
    left.innerHTML = (`
      <ion-icon class="icon ellipsis" name="ellipsis-horizontal-sharp"></ion-icon>`
      )
    right.innerHTML = '';

    main.innerHTML = `
    <div class="statusUpdateComponentContainer">
      <p class="note">Page is in progess...</p
    </div>`
})
}
