import {apiProvider} from "../utilities/HttpProvider";
import {Game} from "../types/Game";

const GAMES_URL = 'games'
const GENRES_URL = 'genres'
const PAGE_SIZE = String(15);

interface ListResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[],
    error?: any
}

export class GameService {

    static getGames(params: Record<string, string>) {
        const nonEmptyParams = Object.entries(params)
            .filter(([, v]) => v)
            .reduce((acc, [k, v]) => ({...acc, [k]: v}), {})
        return apiProvider.get<ListResponse<Game>>(GAMES_URL, {
            page_size: PAGE_SIZE,
            ...nonEmptyParams,
            search_precise: String(false)

        })
            .catch(catchError)
    }

    static getGenres() {
        return apiProvider.get<ListResponse<Genre>>(GENRES_URL, {
            ordering: 'games_count',
            page_size: '10',
        })
    }

    static getGame(id: number | string) {
        return apiProvider.get<Game>(`${GAMES_URL}/${id}`)
    }

    static getGameScreenshots(id: number | string) {
        return apiProvider.get<ListResponse<{ image: string }>>(`${GAMES_URL}/${id}/screenshots`, {
            page: '1',
            page_size: '10'
        })
            .then(screenshots => screenshots.results.map(i => i.image))
    }
}

function catchError(e: any) {
    return {
        count: 0,
        next: '',
        previous: '',
        results: [],
        error: e
    }
}

export type Genre = {
    id: number,
    name: string,
    slug: string,
    image_background: string,
    games_count: number
}