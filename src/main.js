import './app.css';
import App from './App.svelte';

const APP_ID = 'maildo-app';

/** @type {App} */
let app;

function init() {
    let targetEl = document.getElementById(APP_ID);

    if(!targetEl) {
        targetEl = document.createElement('slot');
        targetEl.id = APP_ID;

        document.body.appendChild(targetEl);
    } else if(targetEl.childElementCount > 0) {
        console.warn('App target already exists');
        return;
    }

    app = new App({
        target: targetEl
    });
}

init();

export default app
