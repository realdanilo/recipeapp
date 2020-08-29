import { useReducer, useEffect } from 'react'

export default function useReducerLocalStorage(key, initialValue, reducer) {
    const [state, dispatch] = useReducer(reducer, initialValue, () => {
        let value = JSON.parse(window.localStorage.getItem(key)) || initialValue
        return value
    })
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [state])
    return [state, dispatch]
}


