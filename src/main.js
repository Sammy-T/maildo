import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';

const APP_ID = 'maildo-app';

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

    app = mount(App, {
        target: targetEl
    });
}

init();

export default app
