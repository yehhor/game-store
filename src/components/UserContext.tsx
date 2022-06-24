import {createContext, PropsWithChildren, useState} from "react";
import {Game} from "../types/Game";

export interface User {
    name: string
}

export type Cart = Game[]

export interface UserContextType {
    user: User | null,
    cart: Cart,
    addGameToCart: (game: Game) => void,
    removeGameFromCart: (game: Game) => void,
    setUser: (user: User) => void,
    isInCart: (game: Game) => boolean,
    getTotalPrice: () => number
}

// todo is it ok to fake Type in Context?
const UserContext = createContext<UserContextType>({} as UserContextType);

function UserContextProvider(props: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [cart, setCart] = useState<Game[]>([]);

    const addGameToCart = (game: Game) => {
        if(isInCart(game))
            return;
        setCart(prevCart => [...prevCart, game])
    }

    const removeGameFromCart = (game: Game) => {
        setCart(prevCart => prevCart.filter(g => g.id !== game.id))
    }

    const isInCart = (game: Game) => !!cart.find(g => g.id === game.id)

    const getTotalPrice = () => cart.reduce((p, c) => p + (c.price || 2.99) ,0)

    const contextValue = {
        user,
        cart,
        setUser,
        addGameToCart,
        removeGameFromCart,
        isInCart,
        getTotalPrice
    }

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}

//todo types of context?? is it correctly declared?