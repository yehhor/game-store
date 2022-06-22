import React from 'react';
import './styles/App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./Pages/Home";
import Contacts from "./Pages/Contacts/Contacts";
import {AnimatePresence} from "framer-motion";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <Header/>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/" element={<Navigate to='/home'/>}/>
                </Routes>
            </AnimatePresence>


            <Footer/>
        </div>
    );
}

export default App;
