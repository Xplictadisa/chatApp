// import './chatComponent.js'
// await import('./chatComponent.js')
import { chatComponent } from './chatComponent.js'
import { settingsComponent } from './settingsComponent.js';
import { callsComponent } from './callsComponent.js';
import { communitiesComponent } from './communitiesComponent.js';
import { statusUpdateComponent } from './statusUpdateComponent.js';

/*RENDER CHAT COMPONENT ON PAGE LOAD */
chatComponent();

/* SETTINGS COMPONENT */
settingsComponent()

/*COMMUNITIES COMPONENT */
communitiesComponent()

/* CALLS COMPONENT */
callsComponent()

/* STATUS UPDATE COMPONENT */
statusUpdateComponent()