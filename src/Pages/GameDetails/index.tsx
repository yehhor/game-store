import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {GameService} from "../../services/GameService";
import {Game} from "../../types/Game";
import {Swiper, SwiperSlide} from "swiper/react";
import './GameDetails.scss'
import PlatformsBadge from "../../components/PlatformsBadge";
import {SwiperOptions, Navigation, Autoplay} from "swiper";
import Transition from "../../components/Transition";
import {UserContext} from "../../components/UserContext";

type Props = {}

const GameDetails = (props: Props) => {
    const {gameId} = useParams()
    const [game, setGame] = useState<Game | null>(null)
    const [screenshots, setScreens] = useState<string[]>([])
    const [additionalInfoOpened, setOpened] = useState(false)
    const [loading, setLoading] = useState(true);
    const userContext = useContext(UserContext);

    const isInCart = game && userContext?.isInCart(game);

    useEffect(() => {
        setLoading(true);
        GameService.getGame(String(gameId))
            .then(setGame)
            .then(() => GameService.getGameScreenshots(String(gameId)))
            .then(setScreens)
            .then(() => setLoading(false))
    }, [])

    const sliderOptions: SwiperOptions = {
        slidesPerView: 1,
        loop: true,
        modules: [Navigation, Autoplay],
        navigation: true,
        autoplay: {
            disableOnInteraction: false
        },
    }

    const slides = screenshots.map((i, index) => (
        <SwiperSlide key={index}>
            <div className="slide-image" style={{backgroundImage: `url(${i})`}}>
            </div>
        </SwiperSlide>
    ));

    return (
        <Transition direction='left'>
            {loading && 'loading'}
            {!loading && <div className='game-details-container'>
                <div className="title">
                    <Link to={'../'} className='back'>Back to the store</Link>
                    <span className='game-title'>{game?.name}</span>
                </div>
                {
                    game &&
                    <div className='details-box'>
                        <Swiper
                            className='slider-container'
                            {...sliderOptions}
                        >
                            {slides}
                        </Swiper>
                        <div className="description">
                            <div className="description-box">
                                <div className="description-text">
                                    <p className='title'>About</p>
                                    {game.description_raw}
                                </div>
                                <div className={`${additionalInfoOpened ? 'opened' : ''} additional-info`}>
                                    <div className="additional-info-text">
                                        <p>Released: {game.released}</p>
                                        <p>Platforms: <PlatformsBadge
                                            platforms={game.platforms.map(i => i.platform.slug)}/>
                                        </p>
                                        <p>Genres: {game.genres.map(g => g.name)}</p>
                                        <p>Developers: {game.developers.map(d => d.name)}</p>
                                        <p>Publishers: {game.publishers.map(p => p.name)}</p>
                                    </div>
                                    <div className="more">
                                        <button onClick={() => setOpened(!additionalInfoOpened)}
                                                className="switch hover-lighter">
                                            {additionalInfoOpened ? 'Hide' : 'More'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-box">
                                <div className="price">£ 4.99</div>
                                {
                                    isInCart &&
                                    <div onClick={() => userContext?.removeGameFromCart(game)} className="add-to-cart hover-lighter">
                                        Remove from cart
                                    </div>

                                }

                                { !isInCart &&
                                    <div onClick={() => userContext?.addGameToCart(game)} className="add-to-cart hover-lighter">
                                        Add to cart
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>}

        </Transition>

    )
}

export default GameDetails