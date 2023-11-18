"use client"

import { useTickets } from "@/hooks/useTickets";
import PreviewTicket from "./Components/PreviewTicket";
import TicketModal from "./Components/TicketModal";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Tickets = () => {
    const {
        ticketsList,
        addTicketModalState, 
        setTicketModalState,
        setCurrentTicket,
        currentTicketList, 
        setCurrentTicketList
    } = useTickets();

    const {currentUser} = useAuth();

    const handleFilter = (e) => {
        if(e.target.value === "") {
            setCurrentTicketList(ticketsList)
        } else {
            const filteredTickets = ticketsList.filter(ticket => ticket.problemType === e.target.value);
            setCurrentTicketList(filteredTickets);
        }
    }

    useEffect(() => {
        setCurrentTicket({});
    }, []);

    if(!currentUser) {
        return(
            <p>Cargando...</p>
        )
    }

    return(
        <section className="w-full">
            <h1 className="text-center text-2xl uppercase font-bold">Tickets</h1>
        

            <button
                type="button"
                onClick={() => setTicketModalState(true)}
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold
                bg-teal-400 text-white text-center mt-5 flex gap-2 items-center justify-center
                hover:bg-teal-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Crear Ticket
            </button>
            <div className="bg-white shadow mt-10 rounded-lg pt-5">
                <div className="ml-5 mb-5 flex justify-center md:justify-start">
                    <select 
                        id="proble-type"
                        onChange={handleFilter}
                        className="border-2 p-2 mt-2 placeholder-gray-400 rounded-md w-full md:w-auto mr-5"
                    >
                        <option value="">--Filtrar Tickets--</option>
                        <option value="Problema de Software">Problema de Software</option>
                        <option value="Problema de Hardware">Problema de Hardware</option>
                        <option value="Problema de Red">Problema de Red</option>
                        <option value="Problema de Dispositivo">Problema de Dispositivo</option>
                    </select>
                </div>
                <TicketModal openModal={addTicketModalState} setOpenModal={() => setTicketModalState(false)}/>
                {
                    currentTicketList?.length
                        ? currentTicketList.map(ticket => (
                            <PreviewTicket 
                                key={ticket._id}
                                ticket={ticket}
                            />
                        ))
                        : (<p className="text-center text-gray-600 uppercase p-5">No hay tickets a&uacute;n</p>)          
                }
            </div>
        </section>
    );
}

export default Tickets;