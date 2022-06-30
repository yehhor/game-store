import ItemCard from "./ItemCard";
import {ReactElement, useContext, useEffect, useState} from "react";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";
import {useNavigate} from "react-router-dom";
import Transition from "../../../components/Transition";
import UseGamesData from "./UseGamesData";
import UseColumnBilder from "./UseColumnBilder";


function ItemList() {
    const [page, setPage] = useState(1);
    const {text} = useContext(SearchContext) as SearchContextType
    const {gamesData, loading} = UseGamesData({text, page})
    const columns = UseColumnBilder({gamesData})
    console.log(columns);
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