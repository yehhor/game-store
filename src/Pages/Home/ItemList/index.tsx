import ItemCard from "./ItemCard";
import {useContext, useEffect, useState} from "react";
import {Game} from "../../../types/Game";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";
import {useNavigate} from "react-router-dom";
import {GameService} from "../../../services/GameService";
import Transition from "../../../components/Transition";
import {BASE_URL} from "../../../index";
import {UserContext} from "../../../components/UserContext";


function ItemList() {
    const [gamesData, setGames] = useState<Game[]>([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const {text} = useContext(SearchContext) as SearchContextType
    const {addGameToCart, removeGameFromCart, isInCart, cart} = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        GameService.getGames({page: String(page), search: text})
            .then(games => setGames(games.results))
            .finally(() => setLoading(false))
    }, [page, text])

    const redirectToGame = (id: number) => navigate(`${BASE_URL}/game/${id}`)

    const games = gamesData.map(game => (
        <ItemCard key={game.id}
                  handleClick={() => redirectToGame(game.id)}
                  addGameToCart={addGameToCart}
                  isGameInCart={isInCart}
                  removeGameFromCart={removeGameFromCart}
                  cart={cart}
                  game={game}/>
    ))

    return (
        <>
            <h1>Top Trending</h1>
            <Transition direction='right' className='game-cards-container'>
                {loading ? 'loading' : games}
            </Transition>
        </>

    )
}

export default ItemList;