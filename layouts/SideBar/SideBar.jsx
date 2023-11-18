"use client";
import { useState } from "react";

import CloseOpenButton from "./CloseOpenButton";
import NavItem from "./NavItem";

import items from "./items.json";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const {currentUser} = useAuth();

  return (
    <aside
      className={`${
        open ? "min-w-fit md:w-1/3 xl:w-1/5" : "w-20"
      } bg-[#0e0e0e] min-h-screen duration-150 overflow-hidden text-gray-100 px-3`}
    >
      <CloseOpenButton onClick={() => setOpen(!open)} open={open} />
      <div className="flex flex-col justify-center ">
        {
          currentUser && (
            items?.filter(icon => icon.role.includes(currentUser.role))
            .map((item, i) => <NavItem key={i} item={item} open={open} />)
          )
        }
        <button 
          onClick={() => signOut(() => router.push("/"))}
          className="mt-5 flex  font-medium p-2 hover:bg-teal-600 rounded-xl duration-200"
        >
          <Image
            className={`flex w-7 h-7 min-h-max mr-2 invert duration-300 ${
              !open && "translate-x-1 sm:translate-x-1.5"
            }`}
            src={"/logout.svg"}
            width={28}
            height={28}
            alt={"cerrar-sesion-icon.svg"}
          />
          <span
            className={`whitespace-pre duration-300 ${
              !open && "opacity-0 translate-x-16 overflow-hidden"
            }`}
          >
            Cerrar Sesi&oacute;n
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
