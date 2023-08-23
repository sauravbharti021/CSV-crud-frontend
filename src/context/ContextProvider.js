import React, { createContext, useState } from 'react'

export const AddData = createContext()
export const UpdateData = createContext()
export const DeleteData = createContext()

export default function ContextProvider({children}) {
    const [userAdd, setUserAdd] = useState("")
    const [updateUser, setUpdateUser] = useState("")
    const [deleteData, setDeleteData] = useState("")
    const value = {
        userAdd,
        setUserAdd,
        updateUser,
        setUpdateUser,
        deleteData,
        setDeleteData           
    }
    return(
        <>
            <AddData.Provider value={value}>
                <UpdateData.Provider value={value}>
                    <DeleteData.Provider value={value}>

                        {children}
                    </DeleteData.Provider>
                </UpdateData.Provider>
            </ AddData.Provider>
        </>
    ) 
}
