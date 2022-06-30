import React, {MutableRefObject, useRef, useState} from 'react';
import './styles/App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./Pages/Home";
import Contacts from "./Pages/Contacts/Contacts";
import {AnimatePresence} from "framer-motion";
import GameDetails from "./Pages/GameDetails";
import 'swiper/css'
import {Cart} from "./components/Cart";
import {useClickOutside} from "./components/useClickOutside";
import {BASE_URL} from "./index";
import {Login} from "./Pages/Login";


function App() {
    const location = useLocation();
    //todo is it ok?


    return (
        <div className="App">
            <Header/>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path={`${BASE_URL}/home`} element={<Home/>}/>
                    <Route path={`${BASE_URL}/login`} element={<Login/>}/>
                    <Route path={`${BASE_URL}/contacts`} element={<Contacts/>}/>
                    <Route path={`${BASE_URL}/game/:gameId`} element={<GameDetails/>}/>
                    <Route path={BASE_URL} element={<Navigate to={`${BASE_URL}/home`} />}/>
                </Routes>
            </AnimatePresence>


        </div>
    );
}

export default App;
