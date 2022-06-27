import {createContext, PropsWithChildren, useState} from "react";
import {Game} from "../types/Game";

export interface User {
    name: string
}

export type Cart = {
    [key: string]: Game,
}

export interface UserContextType {
    user: User | null,
    cart: Cart,
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

    const addGameToCart = (game: Game) => setCart(prevCart => ({
        ...prevCart,
        [game.id]: game
    }))


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

    const contextValue = {
        user,
        cart,
        setUser,
        addGameToCart,
        removeGameFromCart,
        isInCart,
        getTotalPrice,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}

//todo types of context?? is it correctly declared?