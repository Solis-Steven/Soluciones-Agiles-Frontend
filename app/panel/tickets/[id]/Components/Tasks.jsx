import { useState } from "react";
import Task from "./Task";
import TaskModal from "./TaskModal";

const Tasks = ({ticketId, tasks}) => {
    const [openModal, setOpenModal] = useState(false);

    return(
        <section className="bg-white rounded-lg shadow-lg p-6
        mt-10">
            <div 
                onClick={() => setOpenModal(true)}
                className="hover:text-black cursor-pointer flex uppercase
                items-center mb-4 text-gray-400 w-24 gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Agregar</span>
            </div>

            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    tasks?.map(task => <Task task={task} key={task._id} setOpenModal={() => setOpenModal(true)} />)
                }
            </article>

            <TaskModal 
                openModal={openModal} 
                setOpenModal={() => setOpenModal(false)}
                ticketId={ticketId} />

        </section>
    );
}

export default Tasks;