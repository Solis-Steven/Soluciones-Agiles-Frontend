import Image from "next/image";
import Link from "next/link";

const NavItem = ({item, open}) => {
  return (
    <Link
      href={item.href}
      className={`mt-5 flex  font-medium p-2 hover:bg-teal-600 rounded-xl duration-200`}
    >
      <Image
        className={`flex w-7 h-7 min-h-max mr-2 invert duration-300 ${
          !open && "translate-x-1 sm:translate-x-1.5"
        }`}
        src={item.svg}
        width={28}
        height={28}
        alt={`${item.name}-icon.svg`}
      />
      <span
        className={`whitespace-pre duration-300 ${
          !open && "opacity-0 translate-x-16 overflow-hidden"
        }`}
      >
        {item.name}
      </span>
    </Link>
  );
};

export default NavItem;
