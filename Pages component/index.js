// import './chatComponent.js'
// await import('./chatComponent.js')
import { chatComponent } from './chatComponent.js'
import { settingsComponent } from './settingsComponent.js';
import { callsComponent } from './callsComponent.js';
import { communitiesComponent } from './communitiesComponent.js';
import { statusUpdateComponent } from './statusUpdateComponent.js';
import { renderPageFooter } from '../utility/shared.js';

const footerContainer = document.querySelector('.footer-container')
footerContainer.innerHTML = renderPageFooter() /**mount footer children element on the Dom */

/*RENDER CHAT COMPONENT ON PAGE LOAD */
chatComponent();

/**LISTEN FOR FOOTER CONTAINER CHILD ELEM CLICKED AND EXECUTE SOME CODE ACCORDINGLY */
footerContainer.addEventListener('click', (e) => {
  const {type} = e.target.dataset 
 
  switch (type) {
    case 'status': statusUpdateComponent()
      break;

    case 'calls': callsComponent()
      break;
    
    case 'communities': communitiesComponent()
      break;
    
    case 'chat': chatComponent()
      break;
    
    case 'settings': settingsComponent()
      break;
  
    default: console.log('type is not calls, chat, etc')
      break;
  }
})


