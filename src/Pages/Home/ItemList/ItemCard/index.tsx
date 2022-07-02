import {Game} from "../../../../types/Game";
import './item-card.scss'
import PlatformsBadge from "../../../../components/PlatformsBadge";
import {useEffect, useMemo, useRef, useState} from "react";
import {Cart} from "../../../../components/UserContext";

export interface GameCardProps {
    game: Game,
    handleClick: () => void,
    isGameInCart: (game: Game) => boolean,
    removeGameFromCart: (game: Game) => void,
    addGameToCart: (game: Game) => void,
    cart: Cart
}

function ItemCard({game, handleClick, removeGameFromCart, addGameToCart, isGameInCart, cart}: GameCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState('auto')
    const isInCart = useMemo(() => {
        console.log('cart changed ', cart);
        return isGameInCart(game)
    }, [cart])

    useEffect(() => {
        const {current} = ref;
        const height = `${current?.clientHeight}px`;
        current?.classList.add('height-set')
        setHeight(height);
    }, [])

    return (
        <div onClick={handleClick} className="game-card-container">
            <div className="image-container">
                <img src={game.background_image} alt="bgimg.pn"/>
            </div>
            <div className="description"
            >
                <div className='title-line' onClick={e => e.stopPropagation()}>
                    {
                        !isInCart &&
                        <button className='add-to-cart'
                                onClick={() => addGameToCart(game)}
                        >
                            Add to cart +
                        </button>
                    }
                    {
                        isInCart &&
                        <button className='add-to-cart'
                                onClick={() => removeGameFromCart(game)}
                        >
                            Remove from cart
                        </button>
                    }
                    <span>{game.price || '£2.99'}</span>
                </div>
                <div className="hover-show"
                     style={{height: height || 'auto'}}
                     ref={ref}
                >
                    <div className='game-title'>{game.name}</div>
                    <div className="platforms">
                        <PlatformsBadge platforms={game.platforms.map(p => p.platform.slug)}/>
                    </div>
                    <div className="release-date">
                        Released: {game.released}
                    </div>
                    <div className="genres">
                        Genres: {game.genres.reduce((prev, cur) => (prev + ' ' + cur.name), ' ')}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ItemCard