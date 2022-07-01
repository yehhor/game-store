import {apiProvider} from "../utilities/HttpProvider";
import {Game} from "../types/Game";

const USERS_URL = 'USERS'
const TOKENS_URL = 'TOKENS'
const CURRENT_SESSION = 'SESSION'
const SALT = 'SALT__';
const users: { [key: string]: User } = JSON.parse(
    localStorage.getItem(USERS_URL) || '{}'
)
const tokens: { [key: string]: string } = JSON.parse(
    localStorage.getItem(TOKENS_URL) || '{}'
)
export type User = {
    id: string,
    name: string,
    favoriteGames: number[],
    password?: string
}

export type Token = {
    token: string,
    userId: string,
}

export type UserToken = {
    user: User,
    token: Token
}

export class UsersService {
    static async login(login: string, password: string): Promise<UserToken | null> {
        const user = await UsersService.getUserByNameAndPassword(login, password)
        if (user) {
            const token = await UsersService.generateTokenForUser(user);
            const userToken = {
                user: {
                    ...user,
                    password: undefined
                },
                token: {
                    token,
                    userId: user.id
                }
            }
            UsersService.createUserSession(userToken)
            return userToken
        }
        return null;
    }

    static removeCurrentSession(): void {
        localStorage.removeItem(CURRENT_SESSION);
    }

    static register(login: string, password: string): Promise<User> {
        return UsersService.createNewUser(login, password)
    }

    static isUserNameAvailable(name: string): Promise<boolean> {
        return new Promise(resolve => resolve(
                !Object.values(users).find(u => u.name.toLowerCase() === name.toLowerCase())
            )
        )
    }

    static getCurrentSession(): UserToken | null {
        return JSON.parse(localStorage.getItem(CURRENT_SESSION) || 'null')
    }

    private static createNewUser(name: string, password: string): Promise<User> {
        const user = assembleUser(name, password)
        users[user.id] = user;
        updateUsersInLocalStorage();
        return new Promise(resolve => resolve(user))
    }

    private static getUserByNameAndPassword(name: string, password: string): Promise<User | undefined> {
        const encodedPw = codePassword(password);
        return new Promise(resolve => {
            resolve(
                Object.values(users).find(u => (u.name === name) && (u.password === encodedPw))
            )
        })
    }

    private static generateTokenForUser(user: User): Promise<string> {
        const token = generateToken();
        tokens[user.id] = token;
        updateTokensInLocalStorage();
        return Promise.resolve(token);
    }

    private static createUserSession(userToken: UserToken): void {
        localStorage.setItem(CURRENT_SESSION, JSON.stringify(userToken))
    }

}

function generateToken() {
    return btoa(`${SALT}${new Date()}`)
}

function codePassword(password: string): string {
    return btoa(SALT + password)
}

function decodePassword(hash: string): string {
    return atob(hash).split(SALT)[1]
}

function updateTokensInLocalStorage() {
    localStorage.setItem(TOKENS_URL, JSON.stringify(tokens))
}

function updateUsersInLocalStorage() {
    localStorage.setItem(USERS_URL, JSON.stringify(users))
}

function assembleUser(name: string, password: string): User {
    return {
        id: new Date().toString(),
        name,
        password: codePassword(password),
        favoriteGames: []
    }
}