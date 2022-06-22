import ItemList from "./ItemList";
import Transition from "../../components/Transition";
import {AnimatePresence} from "framer-motion";

function Home() {
    return (
        <Transition className="Home" direction="left" >
            <h1>Top 4 trending</h1>
            <ItemList/>
        </Transition>
    )
}

export default Home;