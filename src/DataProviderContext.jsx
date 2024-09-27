import React, { createContext, useState } from 'react'

// Create the context
export const DataContext = createContext();

export const DataProviderContext = ({ children }) => {
    const [sharedData, setSharedData] = useState(null);
    const [purchase, setPurchase] = useState(false);

    return (
        <>
            <DataContext.Provider value={{ sharedData, setSharedData, purchase, setPurchase }}>
                {children}
            </DataContext.Provider>
        </>
    )
}