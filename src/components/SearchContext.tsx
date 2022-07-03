import {createContext, PropsWithChildren, useState} from "react";

export interface SearchContextType {
    text: string,
    updateSearchText: (text: string) => void
}

const SearchContext = createContext<SearchContextType | null>(null);

function SearchContextProvider(props: PropsWithChildren) {
    const [text, setText] = useState('');
    function updateSearchText(text: string) {
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