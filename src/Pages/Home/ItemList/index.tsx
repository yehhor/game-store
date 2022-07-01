import {ReactElement, useContext, useEffect, useState} from "react";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";
import Transition from "../../../components/Transition";
import useGamesData from "./useGamesData";
import useColumnBilder from "./useColumnBilder";


function ItemList() {
    const [page, setPage] = useState(1);
    const {text} = useContext(SearchContext) as SearchContextType
    const {gamesData, loading} = useGamesData({text, page})
    const columns = useColumnBilder({gamesData})
    return (
        <>
            <h1>Top Trending</h1>
            <Transition direction='right' className='game-cards-container'>
                {loading ? 'loading' : columns}
            </Transition>
        </>

    )
}

export default ItemList;