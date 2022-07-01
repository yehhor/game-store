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
import {Registration} from "./Pages/Registration";
import Login from "./Pages/Login";
import RequireAuth from "./components/RequireAuth";


function App() {
    const location = useLocation();
    //todo is it ok?


    return (
        <div className="App">
            <Header/>
            <AnimatePresence exitBeforeEnter>
                <Routes key={location.pathname}>
                    <Route path={`${BASE_URL}/reg`} element={<Registration/>}/>
                    <Route path={`${BASE_URL}/login`} element={<Login/>}/>
                    <Route path={`${BASE_URL}/home`} element={
                        <RequireAuth>
                            <Home/>
                        </RequireAuth>
                    }/>
                    <Route path={`${BASE_URL}/contacts`} element={<Contacts/>}/>
                    <Route path={`${BASE_URL}/game/:gameId`} element={
                        <RequireAuth>
                            <GameDetails/>
                        </RequireAuth>
                    }/>
                    <Route path={BASE_URL} element={<Navigate to={`${BASE_URL}/home`}/>}/>

                </Routes>
            </AnimatePresence>


        </div>
    );
}

export default App;
