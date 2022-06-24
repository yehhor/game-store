import {MutableRefObject, useEffect} from "react";

export const useClickOutside = (ref: MutableRefObject<any> | null, callback: () => void) => {
    console.log(ref);
    useEffect(() => {
        console.log(ref);
        const listener = (e: MouseEvent) => {
            console.log(ref?.current, e.target);
            if (ref && ref.current && (ref.current.contains(e.target) || ref.current == e.target)) {
                return;
            }
            callback();
        }
        document.addEventListener('click', listener)

        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, callback])
}