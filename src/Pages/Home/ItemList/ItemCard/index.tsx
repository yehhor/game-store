import {Game} from "../../../../types/Game";
import './item-card.scss'
import PlatformsBadge from "../../../../components/PlatformsBadge";

interface Props {
    game: Game,
    handleClick: () => void
}


function ItemCard({game, handleClick}: Props) {
    return (
        <div onClick={handleClick} className="game-card-container">
            <div className="image-container">
                <img src={game.background_image} alt="bgimg.pn"/>
            </div>
            <div className="description">
                <div className='title-line'>
                    <button className='add-to-cart'>Add to cart +</button>
                    <span>{game.price || '£2.99'}</span>
                </div>
                <div className="hover-show">
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