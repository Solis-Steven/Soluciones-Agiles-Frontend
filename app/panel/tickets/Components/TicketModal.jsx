
"use client"

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTickets } from "@/hooks/useTickets";
import { compileNewTicketTemplate, sendMail } from "@/lib/mail";


const TicketModal = ({openModal, setOpenModal}) => {
    const [ticketId, setTicketId] = useState("");
    const [problemType, setProblemType] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const {
        createTicket, 
        editTicket,
        currentTicket
    } = useTickets();

    useEffect(() => {
        if(currentTicket._id) {
            const { _id, problemType, description, deadline } = currentTicket;
            setTicketId(_id);
            setProblemType(problemType);
            setDescription(description);
            setDeadline(deadline?.split("T")[0]);

            return;
        }

        setTicketId("");
        setProblemType("");
        setDescription("");
        setDeadline("");
    }, [currentTicket]);

    const handleSendEmail = async() => {
        try {
            const response = await fetch(
                "http://localhost:8000/users/emails",
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
            const users = data.users;
            for (const user of users) {
                const { email, name } = user;

                const emailData = {
                    to: email,
                    name: "Soluciones Agiles",
                    subject: "Nuevo Ticket Creado",
                    body: await compileNewTicketTemplate(problemType, name, description, deadline)
                }
            
                await sendMail(emailData);
            }
        } catch (error) {
            console.log(error); 
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([problemType, description, deadline].includes("")) {
            return;
        }

        if(ticketId) {
            await editTicket({problemType, description, deadline}, ticketId)
        } else {
            await createTicket({problemType, description, deadline});
            handleSendEmail();
        }
        setTicketId("");
        setProblemType("");
        setDescription("");
        setDeadline("");
        setOpenModal();
    }

    return(
        <Transition.Root show={ openModal } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ setOpenModal }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ setOpenModal }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {ticketId ? "Edit Ticket" : "Create Ticket"}
                                    </Dialog.Title>

                                    <form 
                                        onSubmit={handleSubmit}
                                        className="my-10"
                                    >
                                        
                                        <div className="mb-5">
                                            <label 
                                                htmlFor="name"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Tipo de problema
                                            </label>
                                            <select 
                                                id="proble-type"
                                                onChange={e => setProblemType(e.target.value)}
                                                value={problemType}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            >
                                                <option value="">--Selecciona un Valor--</option>
                                                <option value="Problema de Software">Problema de Software</option>
                                                <option value="Problema de Hardware">Problema de Hardware</option>
                                                <option value="Problema de Red">Problema de Red</option>
                                                <option value="Problema de Dispositivo">Problema de Dispositivo</option>
                                            </select>
                                        </div>

                                        <div className="mb-5">
                                            <label 
                                                htmlFor="description"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Descripci&oacute;n del problema
                                            </label>
                                            <textarea 
                                                id="description"
                                                placeholder="Enter the ticket description"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label 
                                                htmlFor="date-event"
                                                className="text-gray-700 uppercase font-bold text-sm"
                                            >
                                                Fecha l&iacute;mete
                                            </label>
                                            <input 
                                                id="date-event"
                                                type="date"
                                                value={deadline}
                                                onChange={e => setDeadline(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            className="bg-teal-600 hover:bg-teal-700 w-full 
                                            p-3 text-white uppercase font-bold cursor-pointer
                                            transition-colors rounded text-sm"
                                        >
                                            {ticketId ? "Guardar Cambios" : "Crear Ticket"}
                                        </button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default TicketModal;