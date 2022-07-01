import {useEffect, useState} from 'react';
import {Game} from "../../../types/Game";
import {GameService} from "../../../services/GameService";

type Props = {
    text: string,
    page: number,
}

const UseGamesData = ({text, page}: Props) => {
    const [gamesData, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        GameService.getGames({page: String(page), search: text})
            .then(games => setGames(games.results))
            .finally(() => setLoading(false))
    }, [page, text])

    return {
        gamesData,
        loading
    }
};

export default UseGamesData;