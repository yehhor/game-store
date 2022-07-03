import {ReactElement, useContext, useEffect, useMemo, useState} from "react";
import ItemCard from "./ItemCard";
import {Game} from "../../../types/Game";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../../index";
import UseGrid from "./useGrid";
import {UserContext} from "../../../components/UserContext";
import Transition from "../../../components/Transition";

const ITEM_WIDTH = 380; // 350 + 30 margin

type Prop = {
    gamesData: Game[]
}

const UseColumnBilder = ({gamesData}: Prop) => {
        const navigate = useNavigate();
        const redirectToGame = (id: number) => navigate(`${BASE_URL}/game/${id}`)
        const [columns, setColumns] = useState<ReactElement[]>([])
        const columnsCount = UseGrid({itemCount: gamesData.length, itemWidth: ITEM_WIDTH})
        const {addGameToCart, removeGameFromCart, isInCart, cart} = useContext(UserContext);

        useEffect(() => {
            const gamesToDisplay = gamesData.map(game => {
                const isGameInCart = isInCart(game)
                return  <ItemCard key={game.id}
                                  handleClick={() => redirectToGame(game.id)}
                                  addGameToCart={addGameToCart}
                                  isInCart={isGameInCart}
                                  removeGameFromCart={removeGameFromCart}
                                  cart={cart}
                                  game={game}/>
            })
            const columnsToBePopulated = new Array(columnsCount).fill('').map(() => []) as ReactElement[][]
            let currentColumn = 0;
            gamesToDisplay.forEach(game => {
                if (currentColumn === columnsCount) currentColumn = 0;
                columnsToBePopulated[currentColumn++].push(game);
            })
            setColumns(
                columnsToBePopulated.map((column, index) => (
                    <Transition key={index} className='Column' direction='right'>
                        {column}
                    </Transition>
                )));
        }, [columnsCount, gamesData, cart])

        return columns
    }
;

export default UseColumnBilder;