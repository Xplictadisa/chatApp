import {scrollAnim } from "./shared.js";

const main = document.querySelector('main')
const settingsBtn = document.querySelector('.footer-items.settings')
const header = document.querySelector('header');
const headerTitle = document.querySelector('.head-container .middle');
const right = document.querySelector('.right') ;
const ellipsis = document.querySelector('.icon.ellipsis');


/* FUNCTIONS */

export function settingsComponent() {
  settingsBtnFun()
}

function settingsBtnFun() {
   settingsBtn.addEventListener('click', () => {
    header.style.opacity = '0'
    main.innerHTML = settingsHTML();
    /* EACH ELEMENT ASSIGNMENT WHEN SETTINGS HTML IS PRINTED ON THE PAGE */
    const settingCompContainer = document.querySelector('.settingComponentContainer');
    const settingsInputContainer = document.querySelector('.settingsInputContainer');
    const settingsTitleCont = document.querySelector('.settings-title-container')
    const settingSearchInput = document.querySelector('.settingsSearchInput')
    const settingCancelSearch = document.querySelector('.settingCancelSearch')
    
    /* MODIFY THE SETTING PAGE UI ON INPUT FOCUS */
    settingSearchInput.addEventListener('focus', () => {
      header.style.display = 'none'
      settingCancelSearch.style.display = 'block'
    })

    settingCancelSearch.addEventListener('click', () => {
      settingCancelSearch.style.display = 'none'
    })
  
/* FOR ANIMATING THE DIV= 'SETTING' AND INPUT ON SCROLL*/
    scrollAnim(settingCompContainer, settingCompContainer, settingsInputContainer, settingsTitleCont, updateSettingsHeader, restoreSettingsHeader);
  })
}

function updateSettingsHeader() {
  header.style.opacity = '1'
  header.style.backgroundColor = 'rgb(155, 154, 154, 0.1)'
  right.style.opacity = '0'
  ellipsis.style.opacity = '0'
  headerTitle.textContent = 'Settings'
}

function restoreSettingsHeader() {
  header.style.opacity = '0'
}

export function settingsHTML() {
  return (
    `<div class="settingComponentContainer">
      <div class="settings-title-container">
          <div class="settings-title js-settings-title">
            <h2>Settings</h2>
          </div>
      </div>
      <!-- search input -->
      <div class="settingsInputContainer">
        <ion-icon class="search-icon" name="search-outline"></ion-icon>
        <input class="settingsSearchInput" type="text" placeholder="Search">
        <p class="settingCancelSearch">Cancel</p>
      </div>

      <!-- profile settings -->
      <div class="profile-settings-container">
        <!-- profile -->
        <div class="profile">
          <div class="img-container">
            <img src="media/image/penguin-svgrepo-com.svg" alt="">
          </div>
          <div class="profile-name">
            <p>Your Name</p>
            <span>Available</span>
          </div>
        </div>
        <!-- Avatar -->
        <div class="avatar-container">
          <ion-icon class="icon" name="aperture-outline"></ion-icon> <span>Avatar</span>
        </div>
      </div>

      <!-- Other settings -->
      <div class="other-settings-container">
        <div class="item">
          <ion-icon class="icon" name="albums-outline"></ion-icon>
          <span>Lists</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="megaphone-outline"></ion-icon>
          <span>Broadcast messages</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="star-outline"></ion-icon>
          <span>Starred messages</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="laptop-outline"></ion-icon>
          <span>Linked devices</span>
        </div>
      </div>

      <!-- Account settings -->
      <div class="account-settings-container">
        <div class="item">
          <ion-icon class="icon" name="key-outline"></ion-icon>
          <span>Account</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="lock-closed-outline"></ion-icon>
          <span>Privacy</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="chatbubble-outline"></ion-icon>
          <span>Chats</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="notifications-outline"></ion-icon>
          <span>Notifications</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="swap-vertical-outline"></ion-icon>
          <span>Storage and data</span>
        </div>
      </div>
      <!-- Help -->
      <div class="help-container">
        <div class="item">
          <ion-icon class="icon" name="swap-vertical-outline"></ion-icon>
          <span>Help</span>
        </div>
        <div class="item">
          <ion-icon class="icon" name="people-outline"></ion-icon>
          <span>Invite a friend</span>
        </div>
      </div>

      <!-- Meta -->
        <p id="alsoMeta">Also from Meta</p>
        <div class="meta-container">
          <div class="item">
            <ion-icon class="icon" name="logo-instagram"></ion-icon>
            <span>Open Instagram</span>
          </div>
          <div class="item">
            <ion-icon class="icon" name="logo-facebook"></ion-icon>
            <span>Open Facebook</span>
          </div>
          <div class="item">
            <ion-icon class="icon" name="at-outline"></ion-icon>
            <span>Open Threads</span>
          </div>
        </div>
  </div>`
  )
}
