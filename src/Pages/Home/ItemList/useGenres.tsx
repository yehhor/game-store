import {useEffect, useState} from "react";
import {GameService, Genre} from "../../../services/GameService";

const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    useEffect(() => {
        (async () => {
            const genres = await GameService.getGenres();
            setGenres(genres.results)
        })()

    }, [])
    return {genres, selectedGenres, setSelectedGenres}
};

export default useGenres;