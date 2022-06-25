import {createContext, PropsWithChildren, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../index";

export interface SearchContextType {
    text: string,
    updateSearchText: ((text: string) => void)
}

const SearchContext = createContext<SearchContextType | null>(null);

function SearchContextProvider(props: PropsWithChildren) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    function updateSearchText(text: string) {
        navigate(`${BASE_URL}/home`);
        setText(text);
    }

    const contextValue = {
        text,
        updateSearchText
    }

    return (
        <SearchContext.Provider value={contextValue}>
            {props.children}
        </SearchContext.Provider>
    )
}

export {SearchContextProvider, SearchContext}

//todo types of context?? is it correctly declared?