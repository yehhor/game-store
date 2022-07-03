import {createContext, PropsWithChildren, useEffect, useMemo, useState} from "react";
import {Game} from "../types/Game";
import {User, UsersService, UserToken} from "../services/UserService";

export type Cart = {
    [key: string]: Game,
}

export interface UserContextType {
    user: User | null,
    cart: Cart,
    token: string,
    setUserToken: (userToken: UserToken) => void,
    logout: () => void,
    setToken: (token: string) => void,
    addGameToCart: (game: Game) => void,
    removeGameFromCart: (game: Game) => void,
    setUser: (user: User) => void,
    isInCart: (game: Game) => boolean,
    getTotalPrice: () => number,
}

// todo is it ok to fake Type in Context?
const UserContext = createContext<UserContextType>({} as UserContextType);

function UserContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<Cart>({});
    const [token, setToken] = useState('')
    useMemo(() => {
        const userToken = UsersService.getCurrentSession();
        if (userToken) setUserToken(userToken)
        return true;
    }, [])

    useEffect(() => {
        if (user)
            UsersService.getCartByUser(user).then(cart => {
                setCart(cart);
            })
    }, [user])

    useEffect(() => {
        if (user)
            UsersService.updateCart(user, cart).then()
    }, [cart])

    const addGameToCart = (game: Game) => setCart(prevCart => ({
        ...prevCart,
        [game.id]: game
    }))

    const logout = () => {
        setUser(null)
        setToken('')
        setCart({})
        UsersService.removeCurrentSession();
    }

    const removeGameFromCart = (gameToRemove: Game) => {
        const newCart = Object.entries(cart)
            .filter(([, game]) => game.id !== gameToRemove.id)
            .reduce((cartObj: Cart, [gameId, gameObj]) => {
                cartObj[gameId] = gameObj
                return cartObj
            }, {})
        setCart(newCart)
    }

    const isInCart = (game: Game) => !!cart[game.id]

    const getTotalPrice = () => Object.values(cart).reduce((p, c) => p + 2.99, 0)

    function setUserToken({user, token}: UserToken) {
        setUser(user);
        setToken(token.token)
    }

    const contextValue = {
        user,
        cart,
        token,
        setUserToken,
        setToken,
        setUser,
        addGameToCart,
        removeGameFromCart,
        isInCart,
        getTotalPrice,
        logout
    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}

//todo types of context?? is it correctly declared?