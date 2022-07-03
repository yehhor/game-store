const API_KEY = '1fada9086d774d689da69b006a95c49b'
const API_URL = 'https://api.rawg.io/api/'
const FIELD_NAME = 'cachedRequests';

const cachedRequests: Record<string, unknown> =
    JSON.parse(localStorage.getItem(FIELD_NAME) || '{}');

function get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const searchParams = new URLSearchParams(params);
    const endpointAndParams = `${endpoint}?${searchParams}`;
    if (cachedRequests[endpointAndParams]) {
//        return Promise.resolve(cachedRequests[endpointAndParams] as T)
    }

    return fetch(`${API_URL}${endpointAndParams}&key=${API_KEY}`)
        .then(r => r.json())
        .then(r => {
            cachedRequests[endpointAndParams] = r;
            setToStorage(FIELD_NAME, cachedRequests)
            return r;
        })
        .catch(e => {
            console.log('error happened')
            return e;
        })
};

function setToStorage(fieldName: string, dataToBeStored: { [key: string]: any }) {
    try {
        localStorage.setItem(fieldName, JSON.stringify(dataToBeStored));
    } catch (ignored) {

    }
}


export const apiProvider = {
    get,
};
