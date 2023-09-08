import { useEffect, useState } from "react";

function useDebouncer(value,delay){

    const [debounceValue,setDebounceValue]=useState(value)
    
    useEffect(()=>{
        const Id=setTimeout(()=>{
        setDebounceValue(value)
        },delay)

        return ()=>{
            clearTimeout(Id)
        }
    },[value,delay])

    return debounceValue
}

export default useDebouncer