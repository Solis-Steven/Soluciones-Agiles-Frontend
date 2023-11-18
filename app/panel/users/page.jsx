"use client"

import { useEffect, useState } from "react";
import User from "./components/User";

const page = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async() => {
            try {
                const response = await fetch(
                    "http://localhost:8000/users",
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                
                if (!response.ok) {
                    throw new Error(`Error in the request: ${response.statusText}`);
                }
        
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.log(error); 
            }
        }
        getUsers();
    }, []);

    return(
        <section className="w-full">
            <h1 className="text-center text-2xl uppercase font-bold">Usuarios</h1>
            
            
            <div className="bg-white shadow mt-10 rounded-lg">
                {
                    users?.map((user, i) => <User key={i} user={user} />)
                }
            </div>
        </section>
    );
}

export default page;