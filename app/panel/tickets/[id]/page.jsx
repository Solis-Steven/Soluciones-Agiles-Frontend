"use client"

import { DeleteModal } from "@/app/components/DeleteModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTickets } from "@/hooks/useTickets";
import TicketModal from "../Components/TicketModal";
import Tasks from "./Components/Tasks";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../Components/ToPDF";


const Ticket = ({params}) => {
    const [id, setId] = useState(params.id)
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [showPDF, setShowPDF] = useState(false);
    const router = useRouter();
    

    const {
        currentTicket,
        setCurrentTicket,
        ticketsList, 
        setTicketsList,
        addTicketModalState,
        setTicketModalState
    } = useTickets();

    const handleDelete = async() => {
        try {
            const response = await fetch(
                `http://localhost:8000/tickets/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            
            if (!response.ok) {
                throw new Error(`Error in the request: ${response.statusText}`);
            }

            const newTicketList = ticketsList.filter(ticket => ticket._id !== id);
            setTicketsList(newTicketList);
    
            router.push("/panel/tickets");
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        const getTicket = async() => {
            try {
                const response = await fetch(
                    `http://localhost:8000/tickets/${id}`,
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
                setCurrentTicket(data);
                setTasks(data.tasks);
            } catch (error) {
                console.log(error); 
            }
        }
        getTicket();
    }, []);

    useEffect(() => {
        setTasks(currentTicket.tasks);
    }, [currentTicket]);

    return(
        <section className="w-full min-h-screen">
            {
                showPDF 
                    ? (
                        <PDFViewer style={{width: "100%", height: "90vh"}}>
                            <MyDocument currentTicket={currentTicket} tasks={tasks} />
                        </PDFViewer>
                    )
                    : (
                        <>
                            <div className="flex flex-col items-center sm:flex md:flex-row sm:justify-between">
                                <article className="flex gap-2 justify-center items-center">
                                    <Link 
                                        href={"/panel/tickets"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    </Link>

                                    <h1 className="font-bold text-4xl">{currentTicket.problemType}</h1>

                                </article>

                                <article className="flex gap-4">
                                    <div 
                                        onClick={() => setTicketModalState(true)}
                                        className="flex gap-2 justify-center items-center
                                        cursor-pointer hover:text-teal-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>

                                        <button className="uppercase font-bold">editar</button>
                                    </div>

                                    <div 
                                        onClick={() => setDeleteModalState(true)}
                                        className="flex gap-2 justify-center items-center
                                        cursor-pointer hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                        <button className="uppercase font-bold">eliminar</button>
                                    </div>

                                    <div 
                                        onClick={() => setShowPDF(!showPDF)}
                                        className="flex gap-2 justify-center items-center
                                        cursor-pointer hover:text-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-pdf w-6 h-6" viewBox="0 0 16 16">
                                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                                            <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                                        </svg>

                                        <button className="uppercase font-bold">Ver PDF</button>
                                    </div>

                                    <TicketModal openModal={addTicketModalState} setOpenModal={() => setTicketModalState(false)}/>

                                    <DeleteModal
                                        state={deleteModalState}
                                        onClose={() => setDeleteModalState(false)}
                                        handleDelete={() => handleDelete()}
                                        type={"Ticket"}
                                        msg={"A deleted ticket cannot be recovered"}
                                    />
                                </article>
                            </div>

                            <div className="border-b-2 pb-10">
                                <p className="text-gray-600">{currentTicket.description}</p>
                            </div>

                            <Tasks ticketId={id} tasks={tasks}/>
                        </>
                    )
            }
        </section>
    );
}

export default Ticket;