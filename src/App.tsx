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


function App() {
    const [cartOpen, setCartVisibility] = useState(false)
    const location = useLocation();
    const ref = React.createRef<HTMLDivElement>()
    console.log('app rendered');
    //todo is it ok?
    useClickOutside(ref, () => {
        console.log('out');
        if(cartOpen) {
            setCartVisibility(false)
        }
    })

    return (
        <div className="App">
            <Header handleCartClick={() => setCartVisibility(!cartOpen)}/>
            <Cart ref={ref} cartOpen={cartOpen} />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path="/game-store/home" element={<Home/>}/>
                    <Route path="/game-store/contacts" element={<Contacts/>}/>
                    <Route path="/game-store/game/:gameId" element={<GameDetails/>}/>
                    <Route path="/" element={<Navigate to='/game-store'/>}/>
                </Routes>
            </AnimatePresence>


        </div>
    );
}

export default App;
