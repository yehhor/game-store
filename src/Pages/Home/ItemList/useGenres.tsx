import {useEffect, useState} from "react";
import {GameService, Genre} from "../../../services/GameService";

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    useEffect(() => {
        (async () => {
            const genres = await GameService.getGenres();
            setGenres(genres.results)
        })()

    }, [])
    return genres
};

export default useGenres;