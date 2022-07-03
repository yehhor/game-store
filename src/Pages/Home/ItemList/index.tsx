import {useContext} from "react";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";
import Transition from "../../../components/Transition";
import useGamesData from "./useGamesData";
import useColumnBilder from "./useColumnBilder";
import useGenres from "./useGenres";
import FiltersPicker from "./FiltersPicker";
import {AnimatePresence} from "framer-motion";
import ReactPaginate from "react-paginate";


function ItemList() {
    const genres = useGenres();
    const {gamesData, loading, pagesCount, page, setPage, setGenre}
        = useGamesData()
    const columns = useColumnBilder({gamesData})
    const handlePageClick = (pagingEvent: { selected: number }) => {
        setPage({page:++pagingEvent.selected})
    }

    return (
        <div className='container-wrapper'>
            <Transition direction='right'>
                <FiltersPicker filters={genres} onSelected={setGenre}/>
                <div className='game-cards-container'>
                    <AnimatePresence exitBeforeEnter>
                        {loading ? <span>Loading</span> : columns}
                        {!loading && gamesData.length === 0 && <span key={'no games'}>No games found</span>}
                    </AnimatePresence>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    forcePage={page.page - 1}
                    activeClassName="active"
                    pageRangeDisplayed={3}
                    pageCount={pagesCount}
                    previousLabel="< previous"
                />

            </Transition>
        </div>

    )
}

export default ItemList;

