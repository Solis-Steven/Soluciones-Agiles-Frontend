import { useContext } from "react";
import UserContext from "../context/AuthProvider";

// Allows you to use TicketsProvier
export const useAuth = () => {
    return(useContext(UserContext));
}