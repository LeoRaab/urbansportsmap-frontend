import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import store from './store';
import { Provider } from 'react-redux';

let appRoot = document.getElementById("app-root");

if (!appRoot) {
    appRoot = document.createElement('div');
    appRoot.id = 'app-root';
    document.body.append(appRoot);
}


const root = ReactDOM.createRoot(appRoot);
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


