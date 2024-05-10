import Link from "next/link";
import {
  IconLayoutDashboard,
  IconCalendarMonth,
  IconChartHistogram,
  IconLogout,
} from "@tabler/icons-react";
export const Menu = () => {
  return (
    <div className="w-full">
      {/* <ul className="grid grid-cols-2 auto-cols-[200px]   text-zinc-500 bg-red"> */}
      <ul className="flex flex-col gap-4">
        <li className="py-4 px-6">
          <Link href={"/"} className="flex gap-4">
            <IconLayoutDashboard className="col-auto" />
            <p className="">Inicio</p>
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/agenda"} className="flex gap-4">
            <IconCalendarMonth />
            <p className="">Agenda</p>
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/diagnostico"} className="flex gap-4">
            <IconChartHistogram />
            <p className="">Diagnostico</p>
          </Link>
        </li>
        <li className="py-4 px-6">
          <Link href={"/sair"} className="flex gap-4">
            <IconLogout />
            <p className="">Sair</p>
          </Link>
        </li>
      </ul>

      {/* <Link href={"/agenda"} className="flex gap-6 p-4"> */}
      {/* <IconLayoutDashboard className="col-start-1 bg-yellow-300" /> */}
      {/* <p className="col-start-3">Inicio</p> */}
      {/* </Link> */}

      {/* <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/agenda"} className="flex gap-6 p-4">
        <IconLayoutDashboard className="col-start-1" />
        <p className="col-start-3">Inicio</p>
        </Link>
        </li>
        
        <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/agenda"} className="flex gap-6 p-4">
        <IconCalendarMonth />
        Agenda
        </Link>
        </li>
        
        <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={"/"} className="flex gap-6 p-4">
        <IconChartHistogram />
        Diagnostico
        </Link>
        </li>
        
        <li className="hover:bg-slate-100 hover:border-r-4 hover:border-r-sky-600">
        <Link href={""} className="flex gap-6 p-4">
        <IconLogout />
        Sair
        </Link>
      </li> */}
      {/* </ul> */}
    </div>
  );
};
