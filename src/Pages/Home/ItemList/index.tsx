import {ReactElement, useContext, useEffect, useState} from "react";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";
import Transition from "../../../components/Transition";
import useGamesData from "./useGamesData";
import useColumnBilder from "./useColumnBilder";
import useGenres from "./useGenres";
import FiltersPicker from "./FiltersPicker";


function ItemList() {
    const [page, setPage] = useState(1);
    const {text} = useContext(SearchContext) as SearchContextType
    const {genres, setSelectedGenres, selectedGenres} = useGenres();
    const {gamesData, loading} = useGamesData({text, page, genres: selectedGenres})
    const columns = useColumnBilder({gamesData})
    return (
        <>
            <Transition direction='right'>
                <FiltersPicker filters={genres} onSelected={setSelectedGenres} />
                <div className='game-cards-container'>
                    {loading ? 'loading' : columns}
                </div>
            </Transition>
        </>

    )
}

export default ItemList;