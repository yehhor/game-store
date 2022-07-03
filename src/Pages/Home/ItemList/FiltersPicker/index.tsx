import {useEffect, useState} from "react";
import './filters-picker.scss'

type Filter = {
    name: string,
    id: number
}

type Props = {
    filters: Filter[],
    onSelected(selected: string[]): void
}

const FiltersPicker = (props: Props) => {
    const [selected, setSelected] = useState<{ [key: number]: boolean }>({})
    const onFilterClick = (f: Filter) => {
        setSelected(prevSelected => ({
            ...prevSelected,
            [f.id]: !prevSelected[f.id]
        }))
    }

    useEffect(() => {
        if (Object.keys(selected).length){
            console.log(selected);
            props.onSelected(
                Object.entries(selected)
                    .filter(([k, v]) => v)
                    .map(([k]) => k)
            )
        }
    }, [selected])

    const filters = props.filters.map(f => (
        <span className={selected[f.id] ? 'selected' : ''} key={f.id} onClick={() => onFilterClick(f)}>{f.name}</span>
    ))
    return (
        <div className='filters-picker'>
            {filters}
        </div>
    )

};

export default FiltersPicker;