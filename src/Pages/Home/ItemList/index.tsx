import {useContext, useEffect, useState} from "react";
import './item-list.scss'
import {SearchContext, SearchContextType} from "../../../components/SearchContext";
import Transition from "../../../components/Transition";
import useGamesData from "./useGamesData";
import useColumnBilder from "./useColumnBilder";
import useGenres from "./useGenres";
import FiltersPicker from "./FiltersPicker";
import {AnimatePresence} from "framer-motion";
import ReactPaginate from "react-paginate";
import usePaging from "./usePaging";


function ItemList() {
    const {page, perPage, setPage} = usePaging();
    const {text} = useContext(SearchContext) as SearchContextType
    const {genres, setSelectedGenres, selectedGenres} = useGenres();
    const {gamesData, loading, pagesCount} = useGamesData({text, page, perPage, genres: selectedGenres})
    const columns = useColumnBilder({gamesData})
    const handlePageClick = (pagingEvent: { selected: number }) => {
        setPage({page:++pagingEvent.selected})
    }

    useEffect(() => {
        setPage({page: 1});
    }, [selectedGenres])


    return (
        <div className='container-wrapper'>
            <Transition direction='right'>
                <FiltersPicker filters={genres} onSelected={setSelectedGenres}/>
                <div className='game-cards-container'>
                    <AnimatePresence exitBeforeEnter>
                        {loading ? <span>Loading</span> : columns}
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

