import React, {ReactElement, useEffect, useState} from 'react';
import useWindowWidth from "react-hook-use-window-width";

type Props = {
    itemCount: number,
    itemWidth: number,

}

const UseGrid = ({itemCount, itemWidth}: Props) => {
    const windowWidth = useWindowWidth()
    const [columnsCount, setColumnsCount] = useState(1)

    useEffect(() => {
        const cardWith = 380; //350 + 30 margin
        setColumnsCount(Math.floor(windowWidth / cardWith));
        let currentColumn = 0;
        const columns = new Array(columnsCount)
            .fill(1)
            .map(i => []) as unknown as [ReactElement[]]

    }, [windowWidth, itemCount, itemWidth])
    return columnsCount
};

export default UseGrid;