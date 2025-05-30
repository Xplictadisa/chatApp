import {scrollAnim, updateHeader, restoreHeader} from "../utility/shared.js";
import { callLogs } from "../Data/data.js";

const main = document.querySelector('main')
// const callsBtn = document.querySelector('.footer-items.calls')
const right = document.querySelector('.right') ;
const left = document.querySelector('.left')
const middle = document.querySelector('.middle');
const footer = document.querySelector('footer');

/* RENDER CALLS COMPONENT ON CALL BTN CLICKED*/
// callsBtn.addEventListener('click', () => {
//   callsComponent();
// })

/* FUNCTIONS */
export function callsComponent() {
   
      updateCallsPageHeader();
      main.innerHTML = callsHTML();

      /* EACH ELEMENT DECLARATION AFTER MOUNTED ON THE DOM */
      const callsSearchInput = document.querySelector('.callsSearchInput');
      const callsComponentContainer = document.querySelector('.callsComponentContainer');
      const callsInputContainer = document.querySelector('.callsInputContainer');
      const callsTitleContainer = document.querySelector('.calls-title-container');
      const callLogCont = document.querySelector('.recent-calls-container') ;

      /* RENDER CALLLOGS*/
      renderCallLog(callLogCont);

    /* FOR ANIMATING THE DIV= 'SETTING' AND INPUT ON SCROLL*/
      scrollAnim(callsComponentContainer, callsComponentContainer, callsInputContainer, callsTitleContainer, () => {updateHeader('Calls')}, restoreHeader);
}

function callsHTML() {
  return(`
    <div class="callsComponentContainer">
    <div class="calls-title-container">
        <div class="calls-title js-calls-title">
          <h2>Calls</h2>
        </div>
    </div>
    <!-- calls search input -->
    <div class="callsInputContainer">
        <div class="call-input-cont">
          <ion-icon class="search-icon" name="search-outline"></ion-icon>
          <input class="callsSearchInput" type="text" placeholder="Search">
        </div>
        <p class="callsCancelSearch">Cancel</p>
    </div>
    <!-- favorites -->
    <div class="favorites-container">
      <p class="favorites-title">Favorites</p>
      <div class="add-favorite-container">
        <ion-icon class="icon add" name="add-outline"></ion-icon>
        <p>Add favorite</p>
      </div>
    </div>
    <!-- Recent -->
     <div class="recent-container">
      <p class="recent-title">Recent</p>
      <div class="recent-calls-container"></div>
     </div>
  </div>
  `)
}

function renderCallLog(callLogCont) {
  const callLogHTML = callLogs.map((call) => {
  return (
    `<div class="calls-list">
      <img src="/media/image/penguin-svgrepo-com.svg" alt="">
      <div class="caller">
        <p>${call.name}</p>
        <span>incoming</span>
      </div>
      <div class="time">
        <span>10:48 AM</span>
        <ion-icon class="icon" name="information-circle-outline"></ion-icon>
      </div>
    </div>`
  )
})
    callLogCont.innerHTML = callLogHTML.join('');
}

/**THIS FUNCTION UPDATE CALLS PAGE HEADER */
function updateCallsPageHeader() {
  left.innerHTML = (`
      <ion-icon class="icon ellipsis" name="ellipsis-horizontal-sharp"></ion-icon>`
      );
  right.innerHTML = '';
  middle.innerHTML = '';
}