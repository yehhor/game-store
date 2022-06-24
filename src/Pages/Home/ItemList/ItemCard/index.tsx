import {Game} from "../../../../types/Game";
import './item-card.scss'
import PlatformsBadge from "../../../../components/PlatformsBadge";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../components/UserContext";

interface Props {
    game: Game,
    handleClick: () => void
}

function ItemCard({game, handleClick}: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState('auto')
    const userContext = useContext(UserContext);
    const isGameInCart = userContext?.isInCart(game);

    useEffect(() => {
        const {current} = ref;
        const height = `${current?.clientHeight}px`;
        setHeight(height);
        current && (current.style.height = '0');
    }, [])
    const hover = () => {
        const {current} = ref;
        current && (current.style.height = height)
    }

    const disableHover = () => {
        const {current} = ref;
        current && (current.style.height = '0')
    }
    return (
        <div onClick={handleClick} className="game-card-container">
            <div className="image-container">
                <img src={game.background_image} alt="bgimg.pn"/>
            </div>
            <div className="description"
                 onMouseEnter={hover}
                 onMouseLeave={disableHover}
            >
                <div className='title-line' onClick={e => e.stopPropagation()}>
                    {
                        !isGameInCart &&
                        <button className='add-to-cart'
                                onClick={() => userContext?.addGameToCart(game)}
                        >
                            Add to cart +
                        </button>
                    }
                    {
                        isGameInCart &&
                        <button className='add-to-cart'
                                onClick={() => userContext?.removeGameFromCart(game)}
                        >
                            Remove from cart
                        </button>
                    }
                    <span>{game.price || '£2.99'}</span>
                </div>
                <div className="hover-show"
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