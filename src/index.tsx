import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import store from './store';
import { Provider } from 'react-redux';

let appRootNode = document.getElementById("app-root");

if (!appRootNode) {
    appRootNode = document.createElement('div');
    appRootNode.id = 'app-root';
    document.body.append(appRootNode);
}


const root = ReactDOM.createRoot(appRootNode);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

defineCustomElements(window);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


