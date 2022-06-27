import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import {Game} from "../types/Game";
import {Link} from "react-router-dom";

type Props = {
    cartOpen: boolean,
}

export const Cart = React.forwardRef<HTMLDivElement, Props>(({cartOpen}, ref) => {
    const {cart, removeGameFromCart, getTotalPrice} = useContext(UserContext)

    const games = Object.values(cart).map(g => (
        <li key={g.id}>
            <span onClick={(e) => {
                //todo react renders out element faster than click event outside click fires
                e.stopPropagation();
                removeGameFromCart(g)
            }} className='remove-from-cart hover-lighter'>X</span>
            <Link to={`/game/${g.id}`}>{g.name}</Link>
        </li>
    ))

    return (
        <div ref={ref} className={`cart ${cartOpen ? 'open' : ''}`}>
            <div className="games-list">
                <h1>{games.length ? 'Added Games:' : 'No games Added'}</h1>

                <ul className='game-list'>
                    {games}
                </ul>
            </div>
            <div className="bottom-box">
                <span>Total: £{getTotalPrice()}</span>
                <button className='hover-lighter checkout-btn'>Checkout</button>
            </div>
        </div>
    )
})