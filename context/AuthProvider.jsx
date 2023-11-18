"use client"

import { useUser } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";

// Provides a global state of tickets
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const {user} = useUser();
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const login = async() => {
            const userData = {
                name: user.fullName,
                email: user.primaryEmailAddress.emailAddress
            }
            try {
                const response = await fetch(
                    "http://localhost:8000/users",
                    {
                        method: "POST",
                        body: JSON.stringify(userData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
    
                if (!response.ok) {
                    throw new Error(`Error in the request: ${response.statusText}`);
                }
        
                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.log(error); 
            }
        }
    
        if(user) {
            login()
        }
    }, [user])

    return (
        <AuthContext.Provider 
            value={{
                currentUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;