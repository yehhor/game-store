import {useEffect, useState} from 'react';
import {Game} from "../../../types/Game";
import {GameService} from "../../../services/GameService";

type Props = {
    text: string,
    page: {page: number},
    perPage: number,
    genres: string[]
}

const UseGamesData = ({text, page, perPage, genres}: Props) => {
    const [gamesData, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [pagesCount, setPagesCount] = useState(0)
    useEffect(() => {
        setLoading(true);
        GameService.getGames(
            {
                page: String(page.page),
                search: text,
                genres: genres.join(','),
                page_size: String(perPage)
            }
        )
            .then(games => {
                debugger
                setPagesCount(Math.floor(games.count / perPage))
                return games
            })
            .then(games => setGames(games.results))
            .finally(() => setLoading(false))
    }, [page, text])

    return {
        gamesData,
        loading,
        pagesCount
    }
};

export default UseGamesData;