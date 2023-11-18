"use client"

import { useTickets } from "@/hooks/useTickets";
import { useEffect, useState } from "react";

const Task = ({task, setOpenModal}) => {
    const [taskData, setTaskData] = useState(task);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const {
        currentTicket, 
        setCurrentTicket,
        setCurrentTask
    } = useTickets();

    const deleteTask = async(e) => {
        try {
            const response = await fetch(
                `http://localhost:8000/tasks/${task._id}`,
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
    
            setDropdownVisible(!dropdownVisible)
            const updatedTicket = {...currentTicket};
            updatedTicket.tasks = updatedTicket.tasks.filter(taskState => {
                return(taskState._id !== task._id)
            });
            setCurrentTicket(updatedTicket);
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        setTaskData(task);
    }, [task]);

    const handleEditTaskState = async(e) => {
        try {
            const response = await fetch(
                `http://localhost:8000/tasks/${task._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({state: e.target.value}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setTaskData(data);
            if (!response.ok) {
                throw new Error(`Error in the request: ${response.statusText}`);
            }
        } catch (error) {
            console.log(error); 
        }
    }

    return(
        <section className="flex flex-col border-2 hover:shadow-lg
        rounded-lg mb-4 justify-between lg:items-center">

            <header className="flex justify-between w-full bg-teal-100 p-2">
                <h4 className="font-bold text-xl">{taskData.name}</h4>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setDropdownVisible(!dropdownVisible)}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-6 h-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>

                    <div className={`z-10 ${dropdownVisible ? '' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0`}>
                            <div className="">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOpenModal();
                                        setDropdownVisible(!dropdownVisible);
                                        setCurrentTask(task);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                        Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteTask()}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Eliminar
                                </button>
                            </div>
                        </div>
                </div>

            </header>

            <article className="mb-4 sm:mb-0 p-2 w-full">
                <p className="text-sm text-gray-500">{taskData.description}</p>
                <div className="mt-1">
                    <label 
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold text-sm"
                    >
                        Estado
                    </label>
                    <select 
                        value={taskData.state}
                        onChange={e => handleEditTaskState(e)}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md
                        cursor-pointer"
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Finalizada">Finalizada</option>
                    </select>
                </div>
            </article>
        </section>
    );
}

export default Task;