"use client";
import { React, useState, createContext } from "react";

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
    const [ username, setUsername ] = useState("");
    return (
        <UsernameContext.Provider value={[ username, setUsername]}>
            { children }
        </UsernameContext.Provider>
    )
}

export default UsernameContext;
