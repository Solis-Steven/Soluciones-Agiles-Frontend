import { useState, createContext, useEffect } from "react";

// Provides a global state of tickets
const TicketsContext = createContext();

export const TicketsProvider = ({children}) => {
    // State for the events list
    const [ticketsList, setTicketsList] = useState([]);
    const [currentTicketList, setCurrentTicketList] = useState([]);
    const [currentTicket, setCurrentTicket] = useState({});
    const [currentTask, setCurrentTask] = useState({});
    const [addTicketModalState, setTicketModalState] = useState(false);

    const getTickets = async() => {
        try {
            const response = await fetch(
                "http://localhost:8000/tickets",
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
            setTicketsList(data);
            setCurrentTicketList(data);
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        getTickets();
    }, [])

    useEffect(() => {
        setCurrentTicketList(ticketsList)
    }, [ticketsList]);
    
    const createTicket = async(ticket) => {
        try {
            const response = await fetch(
                "http://localhost:8000/tickets",
                {
                    method: "POST",
                    body: JSON.stringify(ticket),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error in the request: ${response.statusText}`);
            }
    
            const data = await response.json();
            setTicketsList((prevTicketList) => [...prevTicketList, data]);
        } catch (error) {
            console.log(error); 
        }
    }

    const editTicket = async(newTicketData, id) => {
        try {
            const response = await fetch(
                `http://localhost:8000/tickets/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({newTicketData, id}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
              );
            
            if (!response.ok) {
                throw new Error(`Error in the request: ${response.statusText}`);
            }
            const data = await response.json();
            setCurrentTicket(data);

            const updatedTicketList = ticketsList.map(ticketState => 
                ticketState._id === data._id ? data : ticketState);
            setTicketsList(updatedTicketList);
    
            setTicketModalState(false);
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <TicketsContext.Provider 
            value={{
                ticketsList, 
                setTicketsList,
                createTicket,
                currentTicket,
                addTicketModalState,
                setTicketModalState,
                setCurrentTicket,
                editTicket,
                currentTask,
                setCurrentTask,
                currentTicketList,
                setCurrentTicketList
            }}>
            {children}
        </TicketsContext.Provider>
    )
}

export default TicketsContext;