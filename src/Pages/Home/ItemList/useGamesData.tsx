import {useEffect, useState} from 'react';
import {Game} from "../../../types/Game";
import {GameService} from "../../../services/GameService";

type Props = {
    text: string,
    page: number,
    genres: string[]
}

const UseGamesData = ({text, page, genres}: Props) => {
    const [gamesData, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true);
        GameService.getGames(
            {
                page: String(page),
                search: text,
                genres: genres.join(','),
            }
        )
            .then(games => setGames(games.results))
            .finally(() => setLoading(false))
    }, [page, text, genres])

    return {
        gamesData,
        loading
    }
};

export default UseGamesData;