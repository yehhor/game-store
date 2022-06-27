import {Link} from "react-router-dom";
import React, {FormEvent, useContext, useState} from "react";
import {SearchContext, SearchContextType} from "./SearchContext";
import {RiSearchLine} from "react-icons/ri";
import {BASE_URL} from "../index";
import {Cart} from "./Cart";
import {useClickOutside} from "./useClickOutside";

function Header() {
    const {updateSearchText} = useContext(SearchContext) as SearchContextType;
    const [cartOpen, setCartOpen] = useState(false)
    const [text, setText] = useState('')
    const ref = React.createRef<HTMLDivElement>()
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
                <span onClick={e => {
                    e.stopPropagation();
                    setCartOpen(true)
                }} className='hover-lighter'>cart icon</span>
            </header>
        </>

    )
}


export default Header;