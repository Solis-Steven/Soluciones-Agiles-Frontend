"use client"

import { formatDate } from "@/app/helpers/formatDate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calculatePercentage } from "../helpers/calculatePercentage";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@clerk/nextjs";

const PreviewTicket = ({ticket}) => {
    const [barWidth, setBarWidth] = useState(calculatePercentage(ticket.tasks));
    const {currentUser} = useAuth();

    return(
        <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">

            <div className="flex flex-col mb-3">
                <h2 className="font-bold text-lg">Tipo de problema: {ticket.problemType}</h2>
                <p className="text-sm text-gray-500">Fehca l&iacute;ite: {formatDate(ticket.deadline)}</p>

                <div className="bg-gray-100 mt-1">
                    <div className="rounded-full bg-green-500 text-xs leading-none h-2 text-center
                    text-white" style={{width: `${barWidth}%`}}>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-3 items-center">
                {/* <p className={`${ticket.status ? "bg-green-500" : "bg-red-500"}
                p-2 rounded-lg text-white`}>
                    {ticket.status ? "Completo" : "Incompleto"}
                </p> */}

                {
                    currentUser.role !== "Cliente" && (
                        <Link
                            href={`/panel/tickets/${ticket._id}`}
                            className="text-gray-500 hover:text-black"
                        >
                            Ver Detalles
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default PreviewTicket;