import React, {useEffect, useState} from 'react';
import useWindowWidth from "react-hook-use-window-width";

type Props = {
    itemCount: number,
    itemWidth: number,

}

const UseGrid = ({itemCount, itemWidth}: Props) => {
    const windowWidth = useWindowWidth()
    const [columnsCount, setColumnsCount] = useState(1)

    useEffect(() => {
        const cardWith = 400; //350 + 30 margin
        setColumnsCount(Math.floor(windowWidth / cardWith));
    }, [windowWidth, itemCount, itemWidth])
    return columnsCount
};

export default UseGrid;