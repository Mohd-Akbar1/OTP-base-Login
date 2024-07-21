import { createContext, useState } from "react";


export const DataContext=createContext(null);

export const DataFunction=({children})=>{
    const [userotp,setUserOtp]=useState('')
    
    

    return(
        <DataContext.Provider value={{userotp,setUserOtp}}>
            {children}
        </DataContext.Provider>

    )
}