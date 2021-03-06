import {Link} from "react-router-dom";
import React, {FormEvent, useContext, useMemo, useState} from "react";
import {SearchContext, SearchContextType} from "./SearchContext";
import {RiSearchLine} from "react-icons/ri";
import {BASE_URL} from "../index";
import {Cart} from "./Cart";
import {useClickOutside} from "./useClickOutside";
import {UserContext} from "./UserContext";

function Header() {
    const {updateSearchText} = useContext(SearchContext) as SearchContextType;
    const {cart, user, logout} = useContext(UserContext);
    const [cartOpen, setCartOpen] = useState(false)
    const [text, setText] = useState('')
    const ref = React.createRef<HTMLDivElement>()
    const cartItems = useMemo(() => Object.keys(cart).length, [cart])
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateSearchText(text);
    }


    useClickOutside(ref, () => setCartOpen(false))

    return (
        <>
            <Cart ref={ref} cartOpen={cartOpen}/>
            <header>
                <div>
                    <Link to={`${BASE_URL}`}>Gaming store</Link>
                    <Link to={`${BASE_URL}/contacts`}>Contact</Link>
                </div>
                <form className='search' onSubmit={handleSubmit}>
                    <input type="text" onChange={e => setText(e.target.value)}/>
                    <button type='submit'>
                        <RiSearchLine/>
                    </button>
                </form>
                {user ?
                    <span onClick={logout}>Logout</span>
                    :
                    <Link to={`${BASE_URL}/login`}>Login</Link>
                }
                {
                    !user && <Link to={`${BASE_URL}/reg`}>Reg</Link>
                }
                <div onClick={e => {
                    e.stopPropagation();
                    setCartOpen(true)
                }}
                     className="cart-link">
                    <span className='hover-lighter'>Cart</span>
                    <span className='cart-items'> ({cartItems})</span>
                </div>
            </header>
        </>

    )
}


export default Header;