"use client"

import { useState } from "react";

const User = ({user}) => {
    const [userId, setUserId] = useState(user._id);
    const [name, setName] = useState(user.name);
    const [role, setRole] = useState(user.role);
    
    const hangleRoleChange = async(e) => {
        try {
            setRole(e.target.value)
            const response = await fetch(
                `http://localhost:8000/users/${user._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({newRole: e.target.value, userId}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
              );
            
            if (!response.ok) {
                throw new Error(`Error in the request: ${response.statusText}`);
            }
        } catch (error) {
            console.log(error); 
        }
    }
    
    return(
        <article className="border-b p-5 flex justify-between items-center flex-col sm:flex-row">
            <h3>{name}</h3>

            <select 
                id="userType"
                value={role}
                onChange={e => hangleRoleChange(e)}
                className="border-2 p-2 mt-2 placeholder-gray-400 rounded-md"
            >
                <option value="Cliente">Cliente</option>
                <option value="IT">IT</option>
                <option value="Administrador">Administrador</option>
                <option value="SuperAdministrador">Super Administrador</option>
            </select>
        </article>
    );
}

export default User;