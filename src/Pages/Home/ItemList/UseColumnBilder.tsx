import {ReactElement, useContext, useEffect, useState} from "react";
import ItemCard, {GameCardProps} from "./ItemCard";
import {Game} from "../../../types/Game";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../../index";
import UseGrid from "./useGrid";
import {UserContext} from "../../../components/UserContext";

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
            const gamesToDisplay = gamesData.map(game => (
                <ItemCard key={game.id}
                          handleClick={() => redirectToGame(game.id)}
                          addGameToCart={addGameToCart}
                          isGameInCart={isInCart}
                          removeGameFromCart={removeGameFromCart}
                          cart={cart}
                          game={game}/>
            ))
            const columnsToBePopulated = new Array(columnsCount).fill('').map(() => []) as ReactElement[][]
            let currentColumn = 0;
            gamesToDisplay.forEach(game => {
                if (currentColumn === columnsCount) currentColumn = 0;
                columnsToBePopulated[currentColumn++].push(game);
            })
            setColumns(
                columnsToBePopulated.map((column, index) => (
                    <div key={index} className='Column'>
                        {column}
                    </div>
                )));
        }, [columnsCount, gamesData])

        return columns
    }
;

export default UseColumnBilder;