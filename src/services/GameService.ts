import {apiProvider} from "../utilities/HttpProvider";
import {Game} from "../types/Game";

const GAMES_URL = 'games'
const PAGE_SIZE = String(15);

interface ListResponse<T> {
    next: string;
    previous: string;
    results: T[]
}

export class GameService {

    static getGames(params: Record<string, string>) {
        return apiProvider.get<ListResponse<Game>>(GAMES_URL, {
            page_size: PAGE_SIZE,
            ...params,
            search_precise: String(false)
        })
    }

    static getGame(id: number | string) {
        return apiProvider.get<Game>(`${GAMES_URL}/${id}`)
    }

    static getGameScreenshots(id: number | string) {
        return apiProvider.get<ListResponse<{image: string}>>(`${GAMES_URL}/${id}/screenshots`, {
            page: '1',
            page_size: '10'
        })
            .then(screenshots => screenshots.results.map(i => i.image))
    }
}