import ItemCard from "./ItemCard";
import {apiProvider} from "../../../utilities/HttpProvider";
import {useContext, useEffect, useState} from "react";
import {Game} from "../../../types/Game";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";

const GAMES_URL = 'games'

const loadGames = (params?: Record<string, string>) => {
    return apiProvider.get<Game>(GAMES_URL, {
        ...params,
        search_precise: String(false)
    })
}

function ItemList() {
    const [gamesData, setGames] = useState<Game[]>([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const {text} = useContext(SearchContext) as SearchContextType
    useEffect(() => {
        setLoading(true);
        loadGames({page: String(page), page_size: '15', search: text})
            .then(games => {
                setGames(games.results);
                setLoading(false);
            })
    }, [page, text])

    const games = gamesData.map(game => (
        <ItemCard key={game.id} game={game}/>
    ))

    return (
        <div className='game-cards-container'>
            {loading ? 'loading' : games}
        </div>
    )
}

export default ItemList;