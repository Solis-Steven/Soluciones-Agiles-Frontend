"use client"

import { TicketsProvider } from "@/context/TicketsProvider";
import { AuthProvider } from "@/context/AuthProvider";
import Sidebar from "@/layouts/SideBar/SideBar";

const layout = ({children}) => {

    return(
        <AuthProvider>
            <TicketsProvider>
                <div className="flex p-3">
                    <Sidebar />

                    <main className="flex w-full px-10">{children}</main>
                </div>
            </TicketsProvider>
        </AuthProvider>
    );
}

export default layout;