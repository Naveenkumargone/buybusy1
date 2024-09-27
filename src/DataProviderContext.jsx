import React, { createContext, useState } from 'react'

// Create the context
export const DataContext = createContext();

export const DataProviderContext = ({ children }) => {
    const [sharedData, setSharedData] = useState(null);

    return (
        <>
            <DataContext.Provider value={{ sharedData, setSharedData }}>
                {children}
            </DataContext.Provider>
        </>
    )
}