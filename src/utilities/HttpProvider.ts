const API_KEY = '1fada9086d774d689da69b006a95c49b'
const API_URL = 'https://api.rawg.io/api/'

const cachedRequests: Record<string, unknown> =
    JSON.parse(localStorage.getItem('cachedRequests') || '{}');

function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const searchParams = new URLSearchParams(params);
    const endpointAndParams = `${endpoint}?${searchParams}`;
    if (cachedRequests[endpointAndParams])
        return Promise.resolve(cachedRequests[endpointAndParams] as T)

    return fetch(`${API_URL}${endpointAndParams}&key=${API_KEY}`)
        .then(r => r.json())
        .then(r => {
            cachedRequests[endpointAndParams] = r;
            localStorage.setItem('cachedRequests', JSON.stringify(cachedRequests));
            return r;
        })
};

export const apiProvider = {
    get,
};
