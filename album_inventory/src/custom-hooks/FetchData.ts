import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';


export const useGetData = () => {
    const [albumData, setData] = useState<any>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    // Introducing the useEffect Hook to add our data to react State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {albumData, getData:handleDataFetch}
}
