import {useContext, useEffect, useRef, useState} from 'react';
import {Game} from "../../../types/Game";
import {GameService} from "../../../services/GameService";
import usePaging from "./usePaging";
import {SearchContext, SearchContextType} from "../../../components/SearchContext";

const UseGamesData = () => {
    const {text} = useContext(SearchContext) as SearchContextType
    const [gamesData, setGames] = useState<Game[]>([])
    const {page, setPage, perPage, setPerPage} = usePaging()
    const [loading, setLoading] = useState(true)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [pagesCount, setPagesCount] = useState(0)
    const prevText = usePrevious(text);
    useEffect(() => {
        setLoading(true);
        //trash
        if (prevText !== text) {
            return setPage({page: 1})
        }
        GameService.getGames(
            {
                page: String(page.page),
                search: text,
                genres: selectedGenres.join(','),
                page_size: String(perPage)
            }
        )
            .then(games => {
                setPagesCount(Math.floor(games.count / perPage))
                return games
            })
            .then(games => setGames(games.results))
            .finally(() => setLoading(false))
    }, [page, text])

    const selectedGenresChanged = (genres: string[]) => {
        console.log('genres changed');
        setSelectedGenres(genres);
        setPage({page: 1})
    }

    return {
        gamesData,
        loading,
        pagesCount,
        setPage,
        page,
        setPerPage,
        perPage,
        setGenre: selectedGenresChanged
    }
};

export default UseGamesData;

function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
