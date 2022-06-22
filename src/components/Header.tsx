import {Link} from "react-router-dom";
import {FormEvent, useContext, useState} from "react";
import {SearchContext, SearchContextType} from "./SearchContext";
import {RiSearchLine} from "react-icons/ri";

function Header() {
    const {updateSearchText} = useContext(SearchContext) as SearchContextType;
    const [text, setText] = useState('')
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateSearchText(text);
    }

    return (
        <header>
            <div>
                <Link to='/'>Gaming store</Link>
                <Link to='/contacts'>Contact</Link>
            </div>
            <form className='search' onSubmit={handleSubmit}>
                <input type="text" onChange={e => setText(e.target.value)}/>
                <button type='submit'>
                    <RiSearchLine />
                </button>
            </form>
            <span>cart icon</span>
        </header>
    )
}


export default Header;