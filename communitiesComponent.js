const main = document.querySelector('main')
export const communitiesBtn = document.querySelector('.footer-items.communities')
console.log(communitiesBtn)

communitiesBtn.addEventListener('click', () => {
  main.innerHTML = communitiesHTML()
})

/* FUNCTIONS */

function communitiesHTML() {
  return(
    ` <div class="CommunitiesComponentContainer">
    <div class="communities-title-container">
        <div class="communities-title js-communities-title">
          <h2>Communities</h2>
        </div>
    </div>
    <!-- an -->
     <div class="communities-imageCont">
        <img src="../media/image/community.png" alt="">
     </div>
     <p class="stay-connected">Stay connected with a community</p>
     <span class="com-note">Communities bring memebers together in topic-based groups. Any community you're added to will appear here.</span>
     <div class="exam-com">See example communities ></div>
     <div class="buttonCom">
      + New community
     </div>
        
  </div>`
  )
}