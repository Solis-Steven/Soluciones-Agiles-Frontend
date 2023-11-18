import { useContext } from "react";
import TicketsContext from "../context/TicketsProvider";

// Allows you to use TicketsProvier
export const useTickets = () => {
    return(useContext(TicketsContext));
}