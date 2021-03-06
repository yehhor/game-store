import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {SearchContextProvider} from "./components/SearchContext";
import {UserContextProvider} from "./components/UserContext";
export const BASE_URL = '/game-store'
// export const BASE_URL = ''

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <UserContextProvider>
            <SearchContextProvider>
                <App/>
            </SearchContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
