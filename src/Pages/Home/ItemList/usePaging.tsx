import {useState} from "react";

const PAGE_SIZE = 5;
const usePaging = () => {
    const [page, setPage] = useState({page: 1})
    const [perPage, setPerPage] = useState(PAGE_SIZE)
    return {page, perPage, setPage, setPerPage}
};

export default usePaging;