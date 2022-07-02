import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'leaflet/dist/leaflet.css'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './app/App';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


