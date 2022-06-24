import ItemList from "./ItemList";
import Transition from "../../components/Transition";
import {AnimatePresence} from "framer-motion";

function Home() {
    return (
        <>
            <h1>Top 4 trending</h1>
            <ItemList/>
        </>
    )
}

export default Home;